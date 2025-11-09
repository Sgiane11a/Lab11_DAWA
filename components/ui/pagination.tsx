"use client"

import * as React from "react"

export function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (p: number) => void }) {
  const prev = () => onPage(Math.max(1, page - 1))
  const next = () => onPage(Math.min(totalPages, page + 1))

  return (
    <div className="flex items-center justify-between gap-2">
      <button className="btn" onClick={prev} disabled={page === 1}>
        Anterior
      </button>
      <div className="text-sm text-muted-foreground">Página {page} de {totalPages}</div>
      <button className="btn" onClick={next} disabled={page === totalPages}>
        Siguiente
      </button>
    </div>
  )
}

export default Pagination
