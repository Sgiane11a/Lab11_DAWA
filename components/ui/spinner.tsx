"use client"

import React from "react"

export function Spinner({ size = 6 }: { size?: number }) {
  const s = `${size}rem`
  return (
    <div style={{ width: s, height: s }} className="flex items-center justify-center">
      <div className="animate-spin rounded-full border-4 border-t-transparent" style={{ width: s, height: s, borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="sr-only">Cargando...</div>
      </div>
    </div>
  )
}

export default Spinner
