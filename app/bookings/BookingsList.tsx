"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: number;
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
};

export default function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/bookings", { cache: "no-store" });
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  }

  async function remove(id: number) {
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    setBookings(b => b.filter(x => x.id !== id));
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <ul>
      {bookings.map(b => (
        <li key={b.id}>
          {b.name} ({b.email})
          <button onClick={() => remove(b.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
