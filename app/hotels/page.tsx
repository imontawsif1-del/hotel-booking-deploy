import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function HotelsPage() {
  const rooms = await prisma.room.findMany({
    orderBy: { id: "asc" },
  });

  if (!rooms.length) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>No Rooms Found</h1>
        <p>Add rooms using Prisma Studio</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Available Rooms</h1>

      <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/hotel/${room.id}`}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "black",
            }}
          >
            <div><strong>{room.name}</strong></div>
            <div>Room ID: {room.id}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

