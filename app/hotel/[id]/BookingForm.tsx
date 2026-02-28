"use client";

import { useState } from "react";

export default function BookingForm({ roomId }: { roomId: number }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleBooking() {
    if (!startDate || !endDate) {
      setMessage("Please select dates");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          startDate,
          endDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Booking failed");
      } else {
        setMessage("✅ Booking successful");
      }
    } catch (err) {
      setMessage("Server error");
    }

    setLoading(false);
  }

  return (
    <div style={{ marginTop: "30px", border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
      <h3>Book This Room</h3>

      <div style={{ display: "grid", gap: "10px", marginTop: "10px" }}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={handleBooking} disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>

        {message && <div>{message}</div>}
      </div>
    </div>
  );
}
