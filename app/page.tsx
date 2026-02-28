import { db } from "@/lib/db";
import { hotels } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ minPrice?: string }>;
}) {
  // ✅ Await searchParams (Next.js 15 requirement)
  const params = await searchParams;

  const minPrice = Number(params?.minPrice || 0);

  const berlinHotels = await db
    .select()
    .from(hotels)
    .where(eq(hotels.city, "Berlin"));

  const filtered = berlinHotels.filter(
    (hotel) => hotel.price >= minPrice
  );

  return (
    <div>
      <h1>Berlin Hotels</h1>

      <form>
        <input
          name="minPrice"
          placeholder="Min price"
          type="number"
        />
        <button type="submit">Filter</button>
      </form>

      {filtered.map((hotel) => (
        <div key={hotel.id}>
          <h2>{hotel.name}</h2>
          <p>€{hotel.price} / night</p>
          <a href={`/hotel/${hotel.id}`}>View</a>
        </div>
      ))}
    </div>
  );
}