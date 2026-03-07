import { prisma } from "@/lib/prisma"

export default async function AdminPage() {

  const bookings = await prisma.booking.findMany({
    include: { room: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div style={{ padding: 40 }}>
      <h1>Bookings</h1>

      {bookings.map((b) => (
        <div key={b.id} style={{ marginBottom: 20 }}>
          <b>{b.room.name}</b><br/>
          {new Date(b.checkIn).toDateString()} →
          {new Date(b.checkOut).toDateString()}<br/>
          {b.email}
        </div>
      ))}
    </div>
  )
}
