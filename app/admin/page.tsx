"use client"

import { useState } from "react"

export default function AdminPage() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [hotelId, setHotelId] = useState("")

  async function addRoom() {
    await fetch("/api/admin/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        hotelId
      })
    })

    alert("Room created")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Add Room</h1>

      <input
        placeholder="Room name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />

      <input
        placeholder="Hotel ID"
        onChange={(e) => setHotelId(e.target.value)}
      />
      <br />

      <button onClick={addRoom}>Create Room</button>
    </div>
  )
}
