import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { hotelId, name, email, checkin, checkout, totalPrice } = body;

    // Validate required fields
    if (!hotelId || !name || !email || !checkin || !checkout || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prevent invalid dates
    if (new Date(checkout) <= new Date(checkin)) {
      return NextResponse.json(
        { error: "Checkout must be after checkin" },
        { status: 400 }
      );
    }

    // Check availability (prevent double booking)
    const existingBookings = await db
      .select()
      .from(bookings)
      .where(eq(bookings.hotelId, hotelId));

    const isOverlapping = existingBookings.some((booking) => {
      const existingCheckIn = new Date(booking.checkIn);
      const existingCheckOut = new Date(booking.checkOut);

      return (
        new Date(checkin) < existingCheckOut &&
        new Date(checkout) > existingCheckIn
      );
    });

    if (isOverlapping) {
      return NextResponse.json(
        { error: "Selected dates are already booked" },
        { status: 400 }
      );
    }

    // Insert booking (MATCHES YOUR SCHEMA EXACTLY)
    await db.insert(bookings).values({
      hotelId,
      name,
      email,
      checkIn: checkin,      // matches schema
      checkOut: checkout,    // matches schema
      totalPrice,            // matches schema
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}