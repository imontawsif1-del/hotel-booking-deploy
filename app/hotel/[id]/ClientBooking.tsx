"use client"

import { useState } from "react"
import CalendarGrid from "./CalendarGrid"

export default function ClientBooking() {
  const [selectedStart, setSelectedStart] = useState("")
  const [selectedEnd, setSelectedEnd] = useState("")

  // Dummy data – replace later with real availability
  const days = [
    "2026-02-18",
    "2026-02-19",
    "2026-02-20",
    "2026-02-21",
    "2026-02-22",
  ]

  return (
    <div className="space-y-6">
      <CalendarGrid
        days={days}
        selectedStart={selectedStart}
        selectedEnd={selectedEnd}
        onSelectStart={setSelectedStart}
        onSelectEnd={setSelectedEnd}
      />

      <div>
        <p>Start: {selectedStart || "None"}</p>
        <p>End: {selectedEnd || "None"}</p>
      </div>
    </div>
  )
}
