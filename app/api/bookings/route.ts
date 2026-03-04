import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  const booking = await prisma.booking.create({
    data: {
      userId: body.userId,
      roomId: body.roomId,
      checkIn: new Date(body.checkIn),
      checkOut: new Date(body.checkOut)
    }
  })

  return NextResponse.json(booking)
}