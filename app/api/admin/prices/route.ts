import { NextResponse } from "next/server"

let PRICE_STORE: Record<string, number> = {}

export async function GET() {
  return NextResponse.json(PRICE_STORE)
}

export async function POST(req: Request) {
  const body = await req.json()
  PRICE_STORE[body.date] = body.price
  return NextResponse.json({ ok: true })
}
