"use client"

import { useEffect, useState } from "react"
import { DayPicker, DateRange } from "react-day-picker"
import "react-day-picker/dist/style.css"

/* ================= Helpers ================= */

function normalize(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function dateToYMD(date: Date | undefined) {
  if (!date) return ""
  const d = new Date(date)
  if (isNaN(d.getTime())) return ""
  return normalize(d).toISOString().split("T")[0]
}

function isWeekend(date: Date) {
  const day = date.getDay()
  return day === 5 || day === 6
}

/* ================= Gradient Heat ================= */

function heatStyle(price?: number) {
  if (!price) return {}

  const min = 80
  const max = 220
  const ratio = Math.min(1, Math.max(0, (price - min) / (max - min)))

  const r = Math.round(255 * ratio)
  const g = Math.round(200 * (1 - ratio))

  return {
    background: `rgba(${r}, ${g}, 0, 0.25)`
  }
}

/* ================= SAFE Ripple ================= */

function createRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const button = e.currentTarget
  const rect = button.getBoundingClientRect()

  const circle = document.createElement("span")
  const diameter = Math.max(rect.width, rect.height)

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${e.clientX - rect.left - diameter / 2}px`
  circle.style.top = `${e.clientY - rect.top - diameter / 2}px`
  circle.className = "ripple"

  const existing = button.querySelector(".ripple")
  if (existing) existing.remove()

  button.appendChild(circle)
}

/* ================= Component ================= */

export default function ClientBooking({ roomId }: { roomId: number }) {
  const [range, setRange] = useState<DateRange | undefined>()
  const [prices, setPrices] = useState<Record<string, number>>({})
  const [disabledDays, setDisabledDays] = useState<Date[]>([])
  const [totalPrice, setTotalPrice] = useState<number | null>(null)

  /* ✅ Load availability */

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/availability?roomId=${roomId}`)
        const data = await res.json()

        setPrices(data.prices || {})
        setDisabledDays((data.unavailable || []).map((d: string) => new Date(d)))
      } catch (err) {
        console.error("Availability load failed", err)
      }
    }

    load()
  }, [roomId])

  /* ✅ Recalculate total */

  useEffect(() => {
    if (!range?.from || !range?.to) {
      setTotalPrice(null)
      return
    }

    let cursor = new Date(range.from)
    let total = 0

    while (cursor < range.to) {
      const ymd = dateToYMD(cursor)

      let price = prices[ymd] ?? 100
      if (isWeekend(cursor)) price *= 1.2

      total += price
      cursor.setDate(cursor.getDate() + 1)
    }

    setTotalPrice(Math.round(total))
  }, [range, prices])

  /* ✅ Booking */

  async function createBooking() {
    if (!range?.from || !range?.to) return alert("Select dates")

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          roomId,
          checkIn: dateToYMD(range.from),
          checkOut: dateToYMD(range.to),
        }),
      })

      const data = await res.json()
      if (!res.ok) return alert(data.error)

      alert("Booking created ✔")
    } catch (err) {
      console.error(err)
      alert("Booking failed")
    }
  }

  function payDeposit() {
    alert("💳 Stripe Mock Payment Successful")
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Select Dates</h2>

      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        disabled={disabledDays}
        showOutsideDays
        fixedWeeks

        components={{
          Day: (props: any) => {
            const date: Date = props.date

            if (!date || isNaN(date.getTime())) return null

            const ymd = dateToYMD(date)
            const price = prices[ymd]

            return (
              <button
                {...props.buttonProps}
                style={heatStyle(price)}
                className="calendar-day"
                onClick={(e) => {
                  createRipple(e)
                  props.buttonProps?.onClick?.(e)
                }}
              >
                <span>{date.getDate()}</span>

                {price && (
                  <span className="tooltip">
                    ${price}
                  </span>
                )}
              </button>
            )
          },
        }}
      />

      {totalPrice && (
        <div style={{ marginTop: 20 }}>
          <h3>Total: ${totalPrice}</h3>

          <button onClick={createBooking}>
            Book Now
          </button>

          <button onClick={payDeposit} style={{ marginLeft: 10 }}>
            Pay Deposit
          </button>
        </div>
      )}
    </div>
  )
}
