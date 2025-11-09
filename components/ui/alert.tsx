"use client"

import * as React from "react"

export function Alert({ title, description, variant = "default" }: { title: string; description?: string; variant?: "default" | "destructive" | "warning" }) {
  const base = "p-3 rounded-md border flex flex-col gap-1"
  const variants: Record<string, string> = {
    default: "bg-primary/10 border-primary",
    destructive: "bg-destructive/10 border-destructive",
    warning: "bg-yellow-50 border-yellow-300",
  }

  return (
    <div className={`${base} ${variants[variant] ?? variants.default}`} role="alert">
      <div className="font-medium">{title}</div>
      {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
    </div>
  )
}

export default Alert
