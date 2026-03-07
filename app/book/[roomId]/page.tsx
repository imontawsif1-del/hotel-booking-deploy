"use client"

import { useState, useEffect } from "react"

export default function BookingPage({
  params,
}: {
  params: Promise<{ roomId: string }>
}) {

  const [roomId, setRoomId] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")

  useEffect(() => {
    params.then((p) => setRoomId(p.roomId))
  }, [params])

  async function bookRoom() {

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        checkIn,
        checkOut,
      }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert("Stripe session failed")
      console.log(data)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Book Room</h1>

      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />

      <br /><br />

      <button onClick={bookRoom}>
        Continue to Payment
      </button>
    </div>
  )
}

