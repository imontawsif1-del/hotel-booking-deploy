import { db } from "@/lib/db";
import { bookings } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function CancelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const booking = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, Number(id)))
    .get();

  if (!booking) {
    return <div>Booking not found</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Cancel Booking</h1>
      <p>Booking ID: {booking.id}</p>
      <p>Name: {booking.name}</p>
      <p>Hotel ID: {booking.hotelId}</p>
    </div>
  );
}