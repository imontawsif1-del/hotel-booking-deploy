import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

function enumerateDates(start: Date, end: Date) {
  const dates = []
  const cursor = new Date(start)

  while (cursor < end) {
    dates.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return dates
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomId = Number(searchParams.get("roomId"))

  if (!roomId)
    return NextResponse.json({ dates: [] })

  const bookings = await prisma.booking.findMany({
    where: { roomId },
  })

  const blocked: Date[] = []

  bookings.forEach(b => {
    const start = new Date(b.checkIn)
    const end = new Date(b.checkOut)

    blocked.push(...enumerateDates(start, end))
  })

  return NextResponse.json({
    dates: blocked,
  })
}

