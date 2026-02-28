import fs from "fs";
import path from "path";

export default function BookingSuccessPage() {
  const filePath = path.join(process.cwd(), "app/data/bookings.json");
  const bookings = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const lastBooking = bookings[bookings.length - 1];

  if (!lastBooking) {
    return <h1>No booking found</h1>;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>✅ Booking Confirmed</h1>

      <p><strong>Name:</strong> {lastBooking.name}</p>
      <p><strong>Email:</strong> {lastBooking.email}</p>
      <p><strong>Check-in:</strong> {lastBooking.checkIn}</p>
      <p><strong>Check-out:</strong> {lastBooking.checkOut}</p>

      <p>Thank you for your booking.</p>
    </main>
  );
}
