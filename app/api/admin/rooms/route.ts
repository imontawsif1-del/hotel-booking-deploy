import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  const room = await prisma.room.create({
    data: {
      name: body.name,
      price: body.price,
      hotelId: body.hotelId
    }
  })

  return NextResponse.json(room)
}