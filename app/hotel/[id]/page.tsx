import { db } from "@/lib/db";
import { hotels } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function HotelPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const hotel = await db
    .select()
    .from(hotels)
    .where(eq(hotels.id, Number(id)))
    .get();

  if (!hotel) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Hotel not found</h2>
        <Link href="/">Back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>{hotel.name}</h1>
      <p style={{ fontSize: "20px" }}>€{hotel.price} / night</p>

      <br />

      <Link href={`/hotel/${hotel.id}/book`}>
        Book this hotel
      </Link>
    </div>
  );
}