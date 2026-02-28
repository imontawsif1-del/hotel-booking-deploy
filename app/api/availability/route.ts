import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

function dateToYMD(date: Date) {
  return date.toISOString().split("T")[0]
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomId = Number(searchParams.get("roomId"))

  const today = new Date()
  const prices: Record<string, number> = {}

  for (let i = 0; i < 60; i++) {
    const d = new Date()
    d.setDate(today.getDate() + i)

    prices[dateToYMD(d)] = 80 + Math.floor(Math.random() * 120)
  }

  const bookings = await prisma.booking.findMany({
    where: { roomId },
  })

  return NextResponse.json({
    prices,
    unavailable: bookings.map(b => b.checkIn),
  })
}
