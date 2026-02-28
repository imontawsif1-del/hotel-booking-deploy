import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { totalPrice, bookingId } = body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Hotel Booking",
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `http://localhost:3000/confirmation/${bookingId}`,
    cancel_url: `http://localhost:3000`,
  });

  return NextResponse.json({ url: session.url });
}