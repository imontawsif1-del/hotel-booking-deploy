import fs from "fs";
import path from "path";

type Booking = {
  id: number;
  hotelId: number;
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  createdAt: string;
};

export default function AdminBookingsPage() {
  const filePath = path.join(process.cwd(), "app/data/bookings.json");
  const bookings: Booking[] = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  if (bookings.length === 0) {
    return <h1>No bookings yet</h1>;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>📋 All Bookings</h1>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hotel ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.hotelId}</td>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.checkIn}</td>
              <td>{b.checkOut}</td>
              <td>{new Date(b.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
