import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function RoomsPage() {
  const rooms = await prisma.room.findMany({
    include: {
      hotel: true,
    },
  })

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        Available Rooms
      </h1>

      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            borderBottom: "1px solid #ddd",
            paddingBottom: "20px",
            marginBottom: "20px",
          }}
        >
          <h2>{room.name}</h2>

          <p>
            <strong>Hotel:</strong> {room.hotel.name}
          </p>

          <p>
            <strong>Location:</strong> {room.hotel.location}
          </p>

          <p>
            <strong>Price:</strong> ${room.price} / night
          </p>

          <Link
            href={`/book/${room.id}`}
            style={{
              display: "inline-block",
              padding: "10px 18px",
              background: "black",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              marginTop: "10px",
            }}
          >
            Book Room
          </Link>
        </div>
      ))}
    </main>
  )
}
