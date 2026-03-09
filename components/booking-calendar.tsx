"use client"

import { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export default function BookingCalendar({
  bookedDates,
  onSelect,
}: {
  bookedDates: Date[]
  onSelect: (date: Date | undefined) => void
}) {
  const [selected, setSelected] = useState<Date>()

  const handleSelect = (date: Date | undefined) => {
    setSelected(date)
    onSelect(date)
  }

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      disabled={bookedDates}
    />
  )
}
