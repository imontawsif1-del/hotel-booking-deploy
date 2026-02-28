"use client";

import { useEffect, useState } from "react";

type Props = {
  roomId: number;
  checkIn: string;
  checkOut: string;
};

export default function Availability({ roomId, checkIn, checkOut }: Props) {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!checkIn || !checkOut) return;

    async function checkAvailability() {
      setLoading(true);
      setError("");
      setAvailable(null);

      try {
        const res = await fetch(
          `/api/availability?roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}`
        );

        if (!res.ok) {
          throw new Error("Failed to check availability");
        }

        const data = await res.json();
        setAvailable(data.available);
      } catch (err) {
        setError("Error checking availability");
      } finally {
        setLoading(false);
      }
    }

    checkAvailability();
  }, [roomId, checkIn, checkOut]);

  if (!checkIn || !checkOut) return null;

  if (loading) {
    return <p>Checking availability...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (available === false) {
    return <p style={{ color: "red" }}>Room is not available ❌</p>;
  }

  if (available === true) {
    return <p style={{ color: "green" }}>Room is available ✅</p>;
  }

  return null;
}
