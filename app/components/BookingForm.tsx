"use client";

import { useState } from "react";
import { differenceInDays } from "date-fns";

export default function BookingForm({ hotel }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const nights =
    checkIn && checkOut
      ? differenceInDays(new Date(checkOut), new Date(checkIn))
      : 0;

  const totalPrice = nights > 0 ? nights * hotel.price : 0;

  async function handleSubmit(e) {
    e.preventDefault();

    if (nights <= 0) {
      alert("Invalid dates");
      return;
    }

    const res = await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify({
        hotelId: hotel.id,
        name,
        email,
        checkIn,
        checkOut,
        totalPrice,
      }),
    });

    const booking = await res.json();

    if (booking.error) {
      alert(booking.error);
      return;
    }

    const stripeRes = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        totalPrice,
        bookingId: booking.id,
      }),
    });

    const stripeData = await stripeRes.json();
    window.location.href = stripeData.url;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" onChange={(e) => setCheckIn(e.target.value)} required />
      <input type="date" onChange={(e) => setCheckOut(e.target.value)} required />
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />

      {nights > 0 && (
        <div>
          <p>{nights} nights</p>
          <p>Total: €{totalPrice}</p>
        </div>
      )}

      <button type="submit">Confirm & Pay</button>
    </form>
  );
}