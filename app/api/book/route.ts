import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req:Request){

const data = await req.json()

const booking = await prisma.booking.create({
 data:{
  roomId:data.roomId,
  name:data.name,
  email:data.email,
  checkIn:new Date(data.checkIn),
  checkOut:new Date(data.checkOut)
 }
})

return NextResponse.json(booking)

}
