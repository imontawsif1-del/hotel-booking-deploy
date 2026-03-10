import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { sendBookingEmail } from "@/lib/email/send-booking-email"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const roomId = String(body.roomId)

    if (!body.checkIn || !body.checkOut) {
      return NextResponse.json(
        { error: "Please select check-in and check-out dates" },
        { status: 400 }
      )
    }

    const checkIn = new Date(body.checkIn)
    const checkOut = new Date(body.checkOut)

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return NextResponse.json(
        { error: "Invalid dates selected" },
        { status: 400 }
      )
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        { error: "Checkout must be after check-in" },
        { status: 400 }
      )
    }

    const name = body.name
    const email = body.email
    const phone = body.phone

    // FIND ROOM
    const room = await prisma.room.findUnique({
      where: { id: roomId }
    })

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      )
    }

    // PREVENT DOUBLE BOOKING
    const existingBooking = await prisma.booking.findFirst({
      where: {
        roomId: roomId,
        AND: [
          { checkIn: { lt: checkOut } },
          { checkOut: { gt: checkIn } }
        ]
      }
    })

    if (existingBooking) {
      return NextResponse.json(
        { error: "Room already booked for these dates" },
        { status: 400 }
      )
    }

    // CREATE STRIPE CHECKOUT
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
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,

      metadata: {
        roomId,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        name,
        email,
        phone
      }
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Stripe error" },
      { status: 500 }
    )
  }
}
