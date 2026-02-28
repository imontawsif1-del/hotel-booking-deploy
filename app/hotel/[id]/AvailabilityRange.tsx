"use client";

import { useEffect, useState } from "react";

type Booking = {
  checkIn: string;
  checkOut: string;
};

function overlaps(
  start: Date,
  end: Date,
  bookings: Booking[]
) {
  return bookings.some(b => {
    const bStart = new Date(b.checkIn);
    const bEnd = new Date(b.checkOut);
    return start < bEnd && end > bStart;
  });
}

export default function AvailabilityRange({
  roomId,
  onChange,
}: {
  roomId: number;
  onChange: (range: { checkIn: string; checkOut: string }) => void;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    fetch(`/api/availability?roomId=${roomId}`)
      .then(res => res.json())
      .then(setBookings);
  }, [roomId]);

  function validate(ci: string, co: string) {
    if (!ci || !co) return;

    const start = new Date(ci);
    const end = new Date(co);

    if (start >= end) {
      alert("Check-out must be after check-in");
      return;
    }

    if (overlaps(start, end, bookings)) {
      alert("Selected range is unavailable");
      return;
    }

    onChange({ checkIn: ci, checkOut: co });
  }

  return (
    <div style={{ marginTop: 20 }}>
      <div>
        <label>
          Check-in:
          <input
            type="date"
            value={checkIn}
            onChange={e => {
              setCheckIn(e.target.value);
              validate(e.target.value, checkOut);
            }}
          />
        </label>
      </div>

      <div>
        <label>
          Check-out:
          <input
            type="date"
            value={checkOut}
            onChange={e => {
              setCheckOut(e.target.value);
              validate(checkIn, e.target.value);
            }}
          />
        </label>
      </div>
    </div>
  );
}

