import { prisma } from "@/lib/prisma"

export default async function HotelPage({ params }: any) {

  const { id } = params

  const hotel = await prisma.hotel.findUnique({
    where: { id },
    include: {
      rooms: true
    }
  })

  if (!hotel) {
    return <div>Hotel not found</div>
  }

  return (
    <div style={{ padding: 40 }}>

      <h1>{hotel.name}</h1>
      <p>{hotel.location}</p>

      <h2>Available Rooms</h2>

      {hotel.rooms.map((room:any) => (

        <div key={room.id} style={{ marginBottom: 20 }}>

          <h3>{room.name}</h3>

          <p>${room.price} / night</p>

          <a
            href={`/book/${room.id}`}
            style={{
              background: "black",
              color: "white",
              padding: "8px 16px",
              textDecoration: "none",
              borderRadius: 6
            }}
          >
            Book Room
          </a>

        </div>

      ))}

    </div>
  )
}
