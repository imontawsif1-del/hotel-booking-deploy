"use client"

import Calendar from "react-calendar"
import { useEffect, useState } from "react"

export default function BookingCalendar() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetch("/api/bookings")
      .then(res => res.json())
      .then(data => setBookings(data))
  }, [])

  return (
    <div>
      <h2>Unavailable Dates</h2>
      <Calendar />
    </div>
  )
}
