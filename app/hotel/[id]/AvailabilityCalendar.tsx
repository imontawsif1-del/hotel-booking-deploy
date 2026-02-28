"use client"

import React from "react"

type PriceMap = Record<string, number>

type Props = {
  prices: PriceMap
  basePrice: number
  occupancy: number
}

export default function AvailabilityCalendar({
  prices,
  basePrice,
  occupancy,
}: Props) {
  const today = new Date()

  function formatDate(date: Date) {
    return date.toISOString().split("T")[0]
  }

  function generateDays() {
    const days: Date[] = []

    for (let i = 0; i < 30; i++) {
      const d = new Date()
      d.setDate(today.getDate() + i)
      days.push(d)
    }

    return days
  }

  const days = generateDays()

  function resolvePrice(date: Date) {
    const key = formatDate(date)
    return prices[key] ?? basePrice
  }

  function resolveHeatColor(price: number) {
    if (price <= basePrice * 0.9) return "bg-green-100"
    if (price <= basePrice * 1.1) return "bg-yellow-100"
    return "bg-red-100"
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {days.map((day) => {
        const price = resolvePrice(day)

        return (
          <div
            key={formatDate(day)}
            className={`p-3 rounded-xl border text-sm ${resolveHeatColor(
              price
            )}`}
          >
            <div>{formatDate(day)}</div>
            <div className="font-semibold">${price}</div>
          </div>
        )
      })}
    </div>
  )
}

