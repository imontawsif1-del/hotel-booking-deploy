"use client"

import { useEffect, useState } from "react"

export default function RoomsPage() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then(setRooms)
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Available Rooms</h1>

      {rooms.map((room: any) => (
        <div key={room.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{room.name}</h3>
          <p>Hotel: {room.hotel.name}</p>
          <p>Price: ${room.price}</p>
        </div>
      ))}
    </div>
  )
}