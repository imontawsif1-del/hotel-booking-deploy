import { db } from "@/lib/db";
import { bookings } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function ConfirmationPage({ params }) {
  const booking = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, Number(params.id)))
    .get();

  if (!booking) return <div>Booking not found</div>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h1>Booking Confirmed 🎉</h1>

      <div style={{ border: "1px solid #ddd", padding: 20 }}>
        <h2>Booking Summary</h2>
        <p>Name: {booking.name}</p>
        <p>Email: {booking.email}</p>
        <p>Check-in: {booking.checkIn}</p>
        <p>Check-out: {booking.checkOut}</p>
        <p>Total Paid: €{booking.totalPrice}</p>
      </div>

      <form action={`/api/cancel/${booking.id}`} method="POST">
        <button style={{ marginTop: 20, background: "red", color: "white" }}>
          Cancel Booking
        </button>
      </form>
    </div>
  );
}