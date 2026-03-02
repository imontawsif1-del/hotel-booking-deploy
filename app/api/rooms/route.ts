import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const rooms = await prisma.room.findMany()
  return NextResponse.json(rooms)
}

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.name || !body.price) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 })
  }

  const room = await prisma.room.create({
    data: {
      name: body.name,
      price: body.price,
    },
  })

  return NextResponse.json(room)
}