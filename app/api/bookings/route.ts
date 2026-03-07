import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET bookings (for calendar / admin)
export async function GET() {
  const bookings = await prisma.booking.findMany({
    select: {
      id: true,
      roomId: true,
      checkIn: true,
      checkOut: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true
    },
    orderBy: {
      checkIn: "asc"
    }
  })

  return NextResponse.json(bookings)
}
