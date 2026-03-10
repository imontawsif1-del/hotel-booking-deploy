"use client"

import { useState } from "react"

export default function Calendar() {
  const [checkin, setCheckin] = useState("")
  const [checkout, setCheckout] = useState("")

  return (
    <div style={{marginTop:20}}>
      <label>Check-in</label>
      <input
        type="date"
        value={checkin}
        onChange={(e)=>setCheckin(e.target.value)}
      />

      <label>Check-out</label>
      <input
        type="date"
        value={checkout}
        onChange={(e)=>setCheckout(e.target.value)}
      />
    </div>
  )
}
