import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function RoomsPage() {

  const rooms = await prisma.room.findMany()

  return (
    <div style={{ padding: 40 }}>
      <h1>Available Rooms</h1>

      {rooms.map((room) => (
        <div key={room.id} style={{ marginBottom: 20 }}>

          <h3>{room.name}</h3>

          <p>${room.price} / night</p>

          <Link
            href={`/book/${room.id}`}
            style={{
              display: "inline-block",
              padding: "8px 16px",
              background: "black",
              color: "white",
              textDecoration: "none",
              borderRadius: 6
            }}
          >
            Book Room
          </Link>

        </div>
      ))}

    </div>
  )
}
