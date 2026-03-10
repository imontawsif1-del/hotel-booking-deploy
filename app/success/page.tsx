"use client"

import { useEffect } from "react"

export default function SuccessPage() {

  useEffect(() => {
    fetch("/api/send-confirmation", {
      method: "POST"
    })
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Payment Successful 🎉</h1>
      <p>Your room booking has been confirmed.</p>
    </div>
  )
}
