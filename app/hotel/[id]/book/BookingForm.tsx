"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  hotelId: number;
  price: number;
};

export default function BookingForm({ hotelId, price }: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nights, setNights] = useState(0);
  const [error, setError] = useState("");

  // 🔥 Nights calculation
  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      const diff =
        (end.getTime() - start.getTime()) /
        (1000 * 60 * 60 * 24);

      if (diff > 0) {
        setNights(diff);
        setError("");
      } else {
        setNights(0);
        setError("Checkout must be after check-in");
      }
    }
  }, [checkIn, checkOut]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (nights <= 0) {
      setError("Invalid dates selected");
      return;
    }

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelId,
        name,
        email,
        checkIn,
        checkOut,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push(`/confirmation/${data.booking.id}`);
  }

  const totalPrice = nights * price;

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
    >
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        required
      />

      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        required
      />

      {nights > 0 && (
        <div>
          <p>Nights: {nights}</p>
          <p>Total: €{totalPrice}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Confirm Booking</button>
    </form>
  );
}