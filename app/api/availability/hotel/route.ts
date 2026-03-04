import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const roomId = Number(searchParams.get("roomId"));
    const checkInParam = searchParams.get("checkIn");
    const checkOutParam = searchParams.get("checkOut");

    if (!roomId || !checkInParam || !checkOutParam) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Convert to Date because Prisma uses DateTime
    const checkIn = new Date(checkInParam);
    const checkOut = new Date(checkOutParam);

    const conflicts = await prisma.booking.findMany({
      where: {
        roomId: String(roomId),
        AND: [
          {
            checkIn: {
              lt: checkOut,
            },
          },
          {
            checkOut: {
              gt: checkIn,
            },
          },
        ],
      },
    });

    const available = conflicts.length === 0;

    return NextResponse.json({
      available,
      conflicts,
    });
  } catch (error) {
    console.error("Availability error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
