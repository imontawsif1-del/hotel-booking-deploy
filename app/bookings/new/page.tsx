"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBookingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelId: Number(form.get("hotelId")),
        name: form.get("name"),
        email: form.get("email"),
        checkIn: form.get("checkIn"),
        checkOut: form.get("checkOut"),
      }),
    });

    router.push("/bookings");
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>New Booking</h1>

      <form onSubmit={submit}>
        <input name="hotelId" placeholder="Hotel ID" required />
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" required />
        <input name="checkIn" type="date" required />
        <input name="checkOut" type="date" required />
        <button disabled={loading}>Create</button>
      </form>
    </main>
  );
}
