import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { roomId, checkin, checkout } = await req.json()

  const existing = await prisma.booking.findFirst({
    where: {
      roomId: roomId,
      OR: [
        {
          checkIn: {
            lte: new Date(checkout)
          }
        },
        {
          checkOut: {
            gte: new Date(checkin)
          }
        }
      ]
    }
  })

  return NextResponse.json({
    available: !existing
  })
}
