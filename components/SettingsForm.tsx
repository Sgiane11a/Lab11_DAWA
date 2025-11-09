"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SettingsForm({
  initial,
  onSave,
}: {
  initial?: { appName?: string; pageSize?: number; enableNotifications?: boolean; themePrimary?: string }
  onSave: (s: any) => void
}) {
  const [form, setForm] = useState({
    appName: initial?.appName ?? "Dashboard de Proyectos",
    pageSize: initial?.pageSize ?? 3,
    enableNotifications: initial?.enableNotifications ?? true,
    themePrimary: initial?.themePrimary ?? "#2563eb",
  })

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label>Nombre de la App</Label>
        <Input value={form.appName} onChange={(e) => setForm({ ...form, appName: e.target.value })} />
      </div>

      <div className="grid gap-2">
        <Label>Tamaño de página (proyectos)</Label>
        <Input type="number" value={String(form.pageSize)} onChange={(e) => setForm({ ...form, pageSize: Number(e.target.value) || 1 })} />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox checked={form.enableNotifications} onCheckedChange={(v) => setForm({ ...form, enableNotifications: !!v })} />
        <Label>Habilitar notificaciones</Label>
      </div>

      <div className="grid gap-2">
        <Label>Color primario (hex)</Label>
        <Input value={form.themePrimary} onChange={(e) => setForm({ ...form, themePrimary: e.target.value })} />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onSave(form)}>Guardar</Button>
      </div>
    </div>
  )
}
