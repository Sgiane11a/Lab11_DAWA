"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Alert } from "@/components/ui/alert"

export type Task = {
  id: number | string
  description: string
  projectId?: number | null
  status: string
  priority: string
  userId?: string | number | null
  dateline?: string
}

export default function TaskForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Task>
  onSave: (t: Task) => void
  onCancel?: () => void
}) {
  const [form, setForm] = useState<Task>({
    id: initial?.id ?? Date.now(),
    description: initial?.description ?? "",
    projectId: initial?.projectId ?? null,
    status: initial?.status ?? "Pendiente",
    priority: initial?.priority ?? "Media",
    userId: initial?.userId ?? null,
    dateline: initial?.dateline ?? "",
  })

  const [error, setError] = useState<string | null>(null)

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!form.description.trim()) return setError("La descripción es obligatoria")
    setError(null)
    onSave(form)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error ? <Alert title="Error" description={error} variant="destructive" /> : null}

      <div className="grid gap-2">
        <Label htmlFor="description">Descripción</Label>
        <Input id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="projectId">Proyecto (ID)</Label>
        <Input id="projectId" value={form.projectId ?? ""} onChange={(e) => setForm({ ...form, projectId: e.target.value ? Number(e.target.value) : null })} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Estado</Label>
        <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="En progreso">En progreso</SelectItem>
            <SelectItem value="Completado">Completado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="priority">Prioridad</Label>
        <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Baja">Baja</SelectItem>
            <SelectItem value="Media">Media</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Urgente">Urgente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="userId">Asignado a (userId)</Label>
        <Input id="userId" value={form.userId ?? ""} onChange={(e) => setForm({ ...form, userId: e.target.value ?? null })} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="dateline">Fecha límite</Label>
        <Calendar value={form.dateline} onChange={(v) => setForm({ ...form, dateline: v })} />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => onCancel?.()}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  )
}
