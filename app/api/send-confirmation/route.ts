import { NextResponse } from "next/server"
import { sendBookingEmail } from "@/lib/email/send-booking-email"

export async function POST() {

  await sendBookingEmail({
    name: "Guest",
    email: "test@email.com",
    checkIn: new Date(),
    checkOut: new Date()
  })

  return NextResponse.json({ success: true })
}
