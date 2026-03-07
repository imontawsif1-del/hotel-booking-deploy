"use client"

import { useState } from "react"

export default function BookingPage({ params }) {
  const roomId = params.roomId

  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")

  async function bookRoom() {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({
        roomId,
        checkIn,
        checkOut
      })
    })

    const data = await res.json()

    window.location.href = data.url
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Book Room</h1>

      <input
        type="date"
        onChange={(e) => setCheckIn(e.target.value)}
      />

      <br />

      <input
        type="date"
        onChange={(e) => setCheckOut(e.target.value)}
      />

      <br />

      <button onClick={bookRoom}>
        Continue to Payment
      </button>
    </div>
  )
}
