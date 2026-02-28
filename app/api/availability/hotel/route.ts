import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const roomId = Number(searchParams.get("roomId"))
    const checkIn = searchParams.get("checkIn")
    const checkOut = searchParams.get("checkOut")

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      )
    }

    /*
      IMPORTANT:

      checkIn / checkOut are STRINGS in your Prisma schema.
      DO NOT convert to Date objects.
      ISO strings compare correctly.
    */

    const conflicts = await prisma.booking.findMany({
      where: {
        roomId: Number(roomId),

        NOT: {
          AND: [
            { checkIn: { gte: checkOut } },
            { checkOut: { lte: checkIn } },
          ],
        },
      },
    })

    const available = conflicts.length === 0

    return NextResponse.json({
      available,
      conflicts,
    })
  } catch (error) {
    console.error("Availability error:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

