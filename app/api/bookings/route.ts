import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.roomId || !body.userId || !body.checkIn || !body.checkOut) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (new Date(body.checkIn) >= new Date(body.checkOut)) {
      return NextResponse.json(
        { error: "Invalid date range" },
        { status: 400 }
      )
    }

    const booking = await prisma.booking.create({
      data: {
        roomId: body.roomId,
        userId: body.userId,
        checkIn: new Date(body.checkIn),
        checkOut: new Date(body.checkOut),
      },
    })

    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}