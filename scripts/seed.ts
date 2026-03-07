import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  await prisma.hotel.create({
    data: {
      id: "hotel1",
      name: "My Hotel",
      location: "Berlin"
    }
  })

  await prisma.room.createMany({
    data: [
      {
        id: "room1",
        name: "Deluxe Room",
        price: 120,
        hotelId: "hotel1"
      },
      {
        id: "room2",
        name: "Suite",
        price: 220,
        hotelId: "hotel1"
      }
    ]
  })

  console.log("Hotel and rooms created")
}

main()
