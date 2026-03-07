import { prisma } from "@/lib/prisma"

export default async function AdminBookings() {

  const bookings = await prisma.booking.findMany({
    include: { room: true },
    orderBy: { checkIn: "desc" }
  })

  return (
    <div style={{ padding: 40 }}>
      <h1>Bookings</h1>

      {bookings.map((b) => (
        <div key={b.id} style={{ marginBottom: 20 }}>
          <h3>{b.room.name}</h3>
          <p>
            {b.checkIn.toDateString()} → {b.checkOut.toDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}
