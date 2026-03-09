import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingEmail({
  name,
  email,
  checkIn,
  checkOut,
}: {
  name: string
  email: string
  checkIn: Date
  checkOut: Date
}) {
  await resend.emails.send({
    from: "Hotel Booking <onboarding@resend.dev>",
    to: email,
    subject: "Your Booking Confirmation",
    html: `
      <h2>Booking Confirmed</h2>
      <p>Hi ${name},</p>
      <p>Your booking has been confirmed.</p>
      <p><strong>Check-in:</strong> ${checkIn}</p>
      <p><strong>Check-out:</strong> ${checkOut}</p>
      <p>We look forward to your stay!</p>
    `,
  })
}
