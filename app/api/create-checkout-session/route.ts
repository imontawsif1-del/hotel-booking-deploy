import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  const { roomId, checkIn, checkOut } = await req.json()

  const room = await prisma.room.findUnique({
    where: { id: String(roomId) }
  })

  if (!room) {
    return NextResponse.json({ error: "Room not found" })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: room.name
          },
          unit_amount: room.price * 100
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/rooms`
  })

  await prisma.booking.create({
    data: {
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      room: {
        connect: { id: String(roomId) }
      },
      user: {
        connect: { id: "guest-user" }
      }
    }
  })

  return NextResponse.json({ url: session.url })
}
