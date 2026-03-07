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

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    params.then((p) => setRoomId(p.roomId))
  }, [params])

  async function handlePayment() {
    console.log("Booking room:", roomId)

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        checkIn,
        checkOut,
        name,
        email,
        phone,
      }),
    })

    const data = await res.json()

    console.log("Stripe response:", data)

    if (data.url) {
      window.location.href = data.url
    } else {
      alert("Payment session failed")
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Book Room</h1>

      <h3>Customer Information</h3>

      <input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <h3>Booking Dates</h3>

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

      <button onClick={handlePayment}>
        Continue to Payment
      </button>
    </div>
  )
}
