import prisma from "@/lib/prisma"
import Link from "next/link"

export default async function RoomsPage() {
  const rooms = await prisma.room.findMany()

  return (
    <div style={{ padding: 40 }}>
      <h1>Available Rooms</h1>

      {rooms.map((room) => (
        <div key={room.id} style={{ marginBottom: 20 }}>
          <h3>{room.name}</h3>
          <p>Price: €{room.price}</p>

          <Link href={`/book/${room.id}`}>
            <button>Book Room</button>
          </Link>
        </div>
      ))}
    </div>
  )
}
