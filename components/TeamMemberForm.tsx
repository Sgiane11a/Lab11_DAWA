"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"

export type TeamMember = {
  userId: string | number
  role: string
  name: string
  email: string
  position?: string
  birthdate?: string
  phone?: string
  projectId?: number | null
  isActive?: boolean
}

export default function TeamMemberForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<TeamMember>
  onSave: (m: TeamMember) => void
  onCancel?: () => void
}) {
  const [form, setForm] = useState<TeamMember>({
    userId: initial?.userId ?? Date.now(),
    role: initial?.role ?? "",
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    position: initial?.position ?? "",
    birthdate: initial?.birthdate ?? "",
    phone: initial?.phone ?? "",
    projectId: initial?.projectId ?? null,
    isActive: initial?.isActive ?? true,
  })

  const [error, setError] = useState<string | null>(null)

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!form.name.trim()) return setError("El nombre es obligatorio")
    if (!form.email.trim()) return setError("El email es obligatorio")
    setError(null)
    onSave(form)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error ? <Alert title="Error" description={error} variant="destructive" /> : null}

      <div className="grid gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="qa">QA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="position">Posición</Label>
        <Input id="position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="birthdate">Fecha de nacimiento</Label>
        <Calendar value={form.birthdate} onChange={(v) => setForm({ ...form, birthdate: v })} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="active" checked={!!form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: !!v })} />
        <Label htmlFor="active">Activo</Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => onCancel?.()}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  )
}
