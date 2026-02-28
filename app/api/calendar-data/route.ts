import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

function normalize(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function dateToYMD(date: Date) {
  return normalize(date).toISOString().split("T")[0]
}

function enumerateDates(start: Date, end: Date) {
  const dates = []
  const cursor = new Date(start)

  while (cursor < end) {
    dates.push(dateToYMD(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return dates
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomId = Number(searchParams.get("roomId"))

  if (!roomId)
    return NextResponse.json({ prices: {}, unavailable: [] })

  const room = await prisma.room.findUnique({
    where: { id: roomId },
  })

  const prices: Record<string, number> = {}
  
  const bookings = await prisma.booking.findMany({
    where: { roomId },
  })

  const unavailable: string[] = []

  bookings.forEach(b => {
    unavailable.push(...enumerateDates(new Date(b.checkIn), new Date(b.checkOut)))
  })

  return NextResponse.json({
    prices,
    unavailable,
    basePrice: room?.price ?? 0,
  })
}

