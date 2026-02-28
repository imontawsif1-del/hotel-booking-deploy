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

function isWeekend(date: Date) {
  const day = date.getDay()
  return day === 5 || day === 6
}

const WEEKEND_MULTIPLIER = 1.2
const DEPOSIT_PERCENTAGE = 20

export async function POST(req: Request) {
  const { roomId, checkIn, checkOut } = await req.json()

  const room = await prisma.room.findUnique({
    where: { id: Number(roomId) },
  })

  if (!room)
    return NextResponse.json({ error: "Room not found" }, { status: 404 })

  let cursor = new Date(checkIn)
  const end = new Date(checkOut)

  const breakdown = []
  let total = 0

  while (cursor < end) {
    const ymd = dateToYMD(cursor)

    let price = room.price
    if (isWeekend(cursor)) price *= WEEKEND_MULTIPLIER

    price = Math.round(price)

    breakdown.push({ date: ymd, price })

    total += price
    cursor.setDate(cursor.getDate() + 1)
  }

  const deposit = Math.round(total * (DEPOSIT_PERCENTAGE / 100))

  return NextResponse.json({
    breakdown,
    totalPrice: total,
    depositDueNow: deposit,
  })
}

