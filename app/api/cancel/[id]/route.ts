import { db } from "@/lib/db";
import { bookings } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  await db.delete(bookings).where(eq(bookings.id, Number(params.id)));
  return NextResponse.redirect("http://localhost:3000");
}