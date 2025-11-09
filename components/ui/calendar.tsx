"use client"

import * as React from "react"

export function Calendar({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="border input bg-background text-foreground p-2 rounded-md"
    />
  )
}

export default Calendar
