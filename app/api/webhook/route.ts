import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { sendBookingEmail } from "@/lib/email/sendBookingEmail"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)

    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    )
  }

  // PAYMENT SUCCESS
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const roomId = session.metadata?.roomId
      const checkIn = session.metadata?.checkIn
      const checkOut = session.metadata?.checkOut
      const name = session.metadata?.name
      const email = session.metadata?.email
      const phone = session.metadata?.phone

      if (!roomId || !checkIn || !checkOut) {
        console.error("Missing metadata from Stripe session")

        return NextResponse.json({
          error: "Invalid metadata",
        })
      }

      const booking = await prisma.booking.create({
        data: {
          roomId,
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          name: name || "Guest",
          email: email || "",
          phone: phone || "",
        },
      })

      console.log("Booking saved successfully", booking)

      // SEND EMAIL CONFIRMATION
      if (email) {
        await sendBookingEmail({
          email,
          name: name || "Guest",
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
        })
      }
    } catch (error) {
      console.error("Booking creation failed:", error)
    }
  }

  return NextResponse.json({ received: true })
}
