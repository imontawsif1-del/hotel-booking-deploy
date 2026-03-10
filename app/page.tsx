import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function Home({
  searchParams,
}: {
  searchParams?: { search?: string }
}) {
  const search = searchParams?.search || ""

  const rooms = await prisma.room.findMany({
  include: {
    hotel: true
  },
  where: search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            hotel: {
              name: {
                contains: search,
                mode: "insensitive"
              }
            }
          },
          {
            hotel: {
              location: {
                contains: search,
                mode: "insensitive"
              }
            }
          }
        ]
      }
    : {}
})

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Hotel Booking
      </h1>

      {/* Search */}
      <form action="/" method="GET" style={{ marginTop: "20px" }}>
        <input
          name="search"
          placeholder="Search hotel or location..."
          defaultValue={search}
          style={{
            padding: "10px",
            width: "70%",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
          }}
        >
          Search
        </button>
      </form>

      {/* Room List */}
      <div style={{ marginTop: "40px" }}>
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

            <p>${room.price} / night</p>

            <p>{room.hotelName}</p>

            <p>{room.location}</p>

            <Link href={`/book/${room.id}`}>
              <button
                style={{
                  padding: "8px 16px",
                  marginTop: "10px",
                }}
              >
                Book
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
