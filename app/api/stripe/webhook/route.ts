import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {

  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  if (event.type === "checkout.session.completed") {

    const session = event.data.object as Stripe.Checkout.Session

    const roomId = session.metadata?.roomId
    const checkIn = session.metadata?.checkIn
    const checkOut = session.metadata?.checkOut
    const email = session.customer_details?.email

    await prisma.booking.create({
      data: {
        roomId: roomId!,
        checkIn: new Date(checkIn!),
        checkOut: new Date(checkOut!),
        email: email!,
        paid: true
      }
    })
  }

  return NextResponse.json({ received: true })
}
