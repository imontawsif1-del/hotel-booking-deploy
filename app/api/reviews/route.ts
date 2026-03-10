import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req:Request){

const data = await req.json()

const review = await prisma.review.create({
data:{
hotelId:data.hotelId,
rating:data.rating,
comment:data.comment
}
})

return NextResponse.json(review)

}
