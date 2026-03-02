import { db } from "@/lib/db";
import Link from "next/link";

export default async function HotelPage({
  params,
}: {
  params: { id: string };
}) {
  const hotel = await db.hotel.findUnique({
    where: {
      id: Number(params.id),
    },
  });

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
      <p style={{ fontSize: "20px" }}>
        €{hotel.price} / night
      </p>

      <br />

      <Link href={`/hotel/${hotel.id}/book`}>
        Book this hotel
      </Link>
    </div>
  );
}