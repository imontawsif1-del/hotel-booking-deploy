"use client"

import { useEffect, useState } from "react"

function dateToYMD(date: Date) {
  return date.toISOString().split("T")[0]
}

export default function AdminCalendar() {
  const [prices, setPrices] = useState<Record<string, number>>({})
  const [selectedDate, setSelectedDate] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    fetch("/api/admin/prices")
      .then(r => r.json())
      .then(data => setPrices(data))
  }, [])

  async function save() {
    await fetch("/api/admin/prices", {
      method: "POST",
      body: JSON.stringify({ date: selectedDate, price: Number(price) })
    })

    alert("Saved ✔")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Price Manager</h1>

      <input
        type="date"
        onChange={e => setSelectedDate(e.target.value)}
      />

      <input
        placeholder="Price"
        onChange={e => setPrice(e.target.value)}
      />

      <button onClick={save}>Save Price</button>
    </div>
  )
}
