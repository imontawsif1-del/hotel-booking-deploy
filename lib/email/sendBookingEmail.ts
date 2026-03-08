import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingEmail({
  email,
  name,
  checkIn,
  checkOut,
}: {
  email: string
  name: string
  checkIn: Date
  checkOut: Date
}) {
  await resend.emails.send({
    from: "Hotel <onboarding@resend.dev>",
    to: email,
    subject: "Booking Confirmation",
    html: `
      <h2>Booking Confirmed</h2>

      <p>Hello ${name},</p>

      <p>Your booking has been successfully confirmed.</p>

      <p>
      Check-in: ${checkIn.toDateString()} <br/>
      Check-out: ${checkOut.toDateString()}
      </p>

      <p>We look forward to welcoming you.</p>
    `,
  })
}
