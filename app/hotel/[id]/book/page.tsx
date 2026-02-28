import { db } from "@/lib/db";
import { hotels } from "@/lib/schema";
import { eq } from "drizzle-orm";
import BookingForm from "./BookingForm";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Await params (Next 15 requirement)
  const { id } = await params;

  const hotel = await db
    .select()
    .from(hotels)
    .where(eq(hotels.id, Number(id)))
    .get();

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Book {hotel.name}</h1>
      <p>€{hotel.price} / night</p>

      <BookingForm
        hotelId={hotel.id}
        price={hotel.price}
      />
    </div>
  );
}