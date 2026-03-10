import axios from "axios"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function importHotels() {

  const query = `
  [out:json];
  area["name"="Berlin"]->.searchArea;
  (
    node["tourism"="hotel"](area.searchArea);
  );
  out body;
  `

  const response = await axios.post(
    "https://overpass-api.de/api/interpreter",
    query,
    { headers: { "Content-Type": "text/plain" } }
  )

  const hotels = response.data.elements

  for (const hotel of hotels) {

    const name = hotel.tags?.name || "Hotel Berlin"

    const createdHotel = await prisma.hotel.create({
      data: {
        name,
        location: "Berlin"
      }
    })

    await prisma.room.create({
      data: {
        name: "Standard Room",
        price: 120,
        hotelId: createdHotel.id
      }
    })
  }

  console.log(`Imported ${hotels.length} hotels`)
}

importHotels()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
