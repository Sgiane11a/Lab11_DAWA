"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Spinner from "@/components/ui/spinner"
import TaskForm, { Task } from "@/components/TaskForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"

const statusVariant = (status: string) => {
  switch (status) {
    case "Completado":
      return "default"
    case "En progreso":
      return "secondary"
    case "Pendiente":
      return "outline"
    default:
      return "outline"
  }
}

const priorityVariant = (priority: string) => {
  switch (priority) {
    case "Urgente":
      return "destructive"
    case "Alta":
      return "default"
    case "Media":
      return "secondary"
    case "Baja":
      return "outline"
    default:
      return "outline"
  }
}

export function TasksTable({
  tasks,
  onCreate,
  onUpdate,
  onDelete,
  page,
  setPage,
  pageSize = 5,
}: {
  tasks: Task[]
  onCreate: (t: Task) => void
  onUpdate: (t: Task) => void
  onDelete: (id: number | string) => void
  page: number
  setPage: (p: number) => void
  pageSize?: number
}) {
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Task | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const totalPages = Math.max(1, Math.ceil(tasks.length / pageSize))
  const start = (page - 1) * pageSize
  const pageItems = tasks.slice(start, start + pageSize)

  return (
    <div className="rounded-md border">
      {loading ? (
        <div className="p-6 flex items-center justify-center">
          <Spinner size={3} />
        </div>
      ) : (
        <>
          <div className="p-2 flex items-center justify-between">
            <div />
            <div className="flex items-center gap-2">
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">Nueva Tarea</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nueva Tarea</DialogTitle>
                    <DialogDescription>Crea una nueva tarea</DialogDescription>
                  </DialogHeader>
                  <TaskForm onSave={(t) => { onCreate(t); setCreateOpen(false) }} onCancel={() => setCreateOpen(false)} />
                </DialogContent>
              </Dialog>
              <Button size="sm" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 600) }}>
                Refrescar
              </Button>
            </div>
          </div>
          <Table>
            <TableCaption>Lista de todas las tareas del proyecto</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Proyecto ID</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Asignado (userId)</TableHead>
                <TableHead>Fecha límite</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{task.description}</TableCell>
                  <TableCell>{task.projectId ?? '-'}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(task.status)}>{task.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge>
                  </TableCell>
                  <TableCell>{task.userId ?? '-'}</TableCell>
                  <TableCell>{task.dateline ?? '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setEditing(task)}>
                        Editar
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onDelete(task.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 flex items-center justify-center gap-2">
            <Button size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Anterior</Button>
            <div className="text-sm text-muted-foreground">Página {page} de {totalPages}</div>
            <Button size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Siguiente</Button>
          </div>

          {/* Edit dialog */}
          <Dialog open={!!editing} onOpenChange={(open) => { if (!open) setEditing(null) }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Tarea</DialogTitle>
                <DialogDescription>Actualiza la tarea</DialogDescription>
              </DialogHeader>
              {editing ? <TaskForm initial={editing} onSave={(t) => { onUpdate(t); setEditing(null) }} onCancel={() => setEditing(null)} /> : null}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}
