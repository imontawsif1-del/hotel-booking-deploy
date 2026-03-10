import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Home({
  searchParams,
}: {
  searchParams?: { search?: string }
}) {
  const search = searchParams?.search || ""

  const rooms = await prisma.room.findMany({
    include: {
      hotel: true,
    },
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              hotel: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              hotel: {
                location: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {},
  })

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Hotel Booking</h1>

      <form style={{ marginBottom: "40px" }}>
        <input
          name="search"
          placeholder="Search hotel or location..."
          defaultValue={search}
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
          }}
        />

        <button type="submit">Search</button>
      </form>

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
              marginTop: "10px",
              padding: "10px 16px",
              background: "black",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
            }}
          >
            Book Room
          </Link>
        </div>
      ))}
    </main>
  )
}
