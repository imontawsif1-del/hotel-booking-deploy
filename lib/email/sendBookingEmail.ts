import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingEmail(
  email: string,
  name: string,
  checkIn: Date,
  checkOut: Date,
  roomName: string
) {
  await resend.emails.send({
    from: "booking@yourhotel.com",
    to: email,
    subject: "Booking Confirmation",
    html: `
      <h2>Booking Confirmed 🎉</h2>
      <p>Hello ${name},</p>
      <p>Your booking for <b>${roomName}</b> is confirmed.</p>
      <p>Check-in: ${checkIn.toDateString()}</p>
      <p>Check-out: ${checkOut.toDateString()}</p>
    `,
  })
}
