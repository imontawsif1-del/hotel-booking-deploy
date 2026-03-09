"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Room = {
  id: number
  name: string
  price: number
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [user, setUser] = useState<any>(null)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")

  useEffect(() => {
    fetchRooms()

    // Get current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function fetchRooms() {
    const res = await fetch("/api/rooms")
    const data = await res.json()
    setRooms(data)
  }

  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    })
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  async function bookRoom(roomId: number) {

    if (!user) {
      alert("Please login first")
      return
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates")
      return
    }

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        userId: user.id,
        checkIn,
        checkOut,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      alert("Booking successful!")
    } else {
      alert(data.error)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Hotel Booking</h1>

      {!user ? (
        <button onClick={login}>Login with GitHub</button>
      ) : (
        <div>
          <p>Logged in as {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}

      <hr />

      {rooms.map((room) => (
        <div key={room.id} style={{ marginBottom: 20 }}>
          <h3>{room.name}</h3>
          <p>${room.price} / night</p>

          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />

          <button onClick={() => bookRoom(room.id)}>Book</button>
        </div>
      ))}
    </div>
  )
}
