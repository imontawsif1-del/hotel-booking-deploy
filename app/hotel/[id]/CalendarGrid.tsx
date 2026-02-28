"use client"

type Props = {
  days: string[]
  selectedStart: string
  selectedEnd: string
  onSelectStart: (day: string) => void
  onSelectEnd: (day: string) => void
}

export default function CalendarGrid({
  days,
  selectedStart,
  selectedEnd,
  onSelectStart,
  onSelectEnd,
}: Props) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {days.map((day) => {
        const isSelected =
          day === selectedStart || day === selectedEnd

        return (
          <button
            key={day}
            onClick={() => {
              if (!selectedStart) onSelectStart(day)
              else onSelectEnd(day)
            }}
            className={`border p-2 rounded ${
              isSelected ? "bg-black text-white" : ""
            }`}
          >
            {day}
          </button>
        )
      })}
    </div>
  )
}
