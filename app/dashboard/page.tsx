"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProjectForm } from "@/components/ProjectForm"
import { TasksTable } from "@/components/TaskTable"
import TeamMemberForm, { TeamMember } from "@/components/TeamMemberForm"

export default function DashboardPage() {
  const initialProjects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Plataforma de comercio electrónico con Next.js",
      status: "En progreso",
      progress: 65,
      team: 5,
      members: ["María García", "Juan Pérez", "Ana López", "Carlos Ruiz", "Laura Martínez"],
    },
    {
      id: 2,
      title: "Mobile App",
      description: "Aplicación móvil con React Native",
      status: "En revisión",
      progress: 90,
      team: 3,
      members: ["Ana López", "Juan Pérez", "Laura Martínez"],
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description: "Panel de análisis con visualizaciones",
      status: "Planificado",
      progress: 20,
      team: 4,
      members: ["María García", "Carlos Ruiz", "Laura Martínez", "Juan Pérez"],
    },
    {
      id: 4,
      title: "API Gateway",
      description: "Microservicios con Node.js",
      status: "En progreso",
      progress: 45,
      team: 6,
      members: ["Carlos Ruiz", "Juan Pérez", "María García", "Ana López", "Laura Martínez", "Pedro Gómez"],
    },
  ]

  const [projects, setProjects] = useState(initialProjects)
  const [page, setPage] = useState(1)
  const [settings, setSettings] = useState({ appName: "Dashboard de Proyectos", pageSize: 3, enableNotifications: true, themePrimary: "#2563eb" })
  const pageSize = settings.pageSize
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize))
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const initialMembers: TeamMember[] = [
    { userId: 101, role: "developer", name: "María García", email: "maria@example.com", position: "Frontend", birthdate: "1990-05-12", phone: "555-1234", projectId: 1, isActive: true },
    { userId: 102, role: "manager", name: "Laura Martínez", email: "laura@example.com", position: "PM", birthdate: "1986-11-02", phone: "555-5678", projectId: 1, isActive: true },
  ]

  const [members, setMembers] = useState<TeamMember[]>(initialMembers)
  const [memberDialogOpen, setMemberDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const initialTasks = [
    { id: 1, description: "Implementar autenticación", projectId: 1, status: "En progreso", priority: "Alta", userId: 101, dateline: "2025-11-15" },
    { id: 2, description: "Diseñar pantalla de perfil", projectId: 2, status: "Pendiente", priority: "Media", userId: 102, dateline: "2025-11-20" },
    { id: 3, description: "Configurar CI/CD", projectId: 4, status: "Completado", priority: "Alta", userId: 103, dateline: "2025-11-10" },
    { id: 4, description: "Optimizar queries SQL", projectId: 1, status: "En progreso", priority: "Urgente", userId: 104, dateline: "2025-11-12" },
    { id: 5, description: "Documentar API endpoints", projectId: 4, status: "Pendiente", priority: "Baja", userId: 105, dateline: "2025-11-25" },
  ]

  const [tasksState, setTasksState] = useState(initialTasks)
  const [tasksPage, setTasksPage] = useState(1)
  const tasksPageSize = 5

  const handleTaskCreate = (t: any) => {
    setTasksState((prev) => [{ ...t, id: Date.now() }, ...prev])
    setTasksPage(1)
  }

  const handleTaskUpdate = (t: any) => {
    setTasksState((prev) => prev.map((x) => (x.id === t.id ? t : x)))
  }

  const handleTaskDelete = (id: string | number) => {
    setTasksState((prev) => prev.filter((x) => x.id !== id))
  }

  useEffect(() => {
    // Ensure page is within bounds when projects change
    if (page > totalPages) setPage(totalPages)
  }, [projects, totalPages, page])

  const handleCreate = (p: any) => {
    setProjects((prev) => [{ ...p, id: Date.now() }, ...prev])
    setPage(1)
  }

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((x) => x.id !== id))
  }

  const openDetails = (project: any) => {
    setSelectedProject(project)
    setDetailsOpen(true)
  }

  const handleMemberCreate = (m: TeamMember) => {
    setMembers((prev) => [{ ...m, userId: Date.now() }, ...prev])
    setMemberDialogOpen(false)
  }

  const handleMemberUpdate = (m: TeamMember) => {
    setMembers((prev) => prev.map((x) => (x.userId === m.userId ? m : x)))
    setEditingMember(null)
    setMemberDialogOpen(false)
  }

  const handleMemberDelete = (userId: string | number) => {
    setMembers((prev) => prev.filter((x) => x.userId !== userId))
  }

  const updateSettings = (s: any) => {
    setSettings((prev) => ({ ...prev, ...s }))
    // Apply theme color if provided
    if (s.themePrimary) {
      document.documentElement.style.setProperty('--primary', s.themePrimary)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Dashboard de Proyectos
          </h1>
          <p className="text-slate-600">
            Gestiona tus proyectos y tareas con shadcn/ui
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
          </TabsList>

          {/* Tab: Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Stat Cards */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Proyectos
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects.length}</div>
                  <p className="text-xs text-muted-foreground">{projects.length > 0 ? `+${Math.max(0, Math.floor(projects.length * 0.1))} desde el mes pasado` : "Sin proyectos"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tareas Completadas
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasksState.filter(t => t.status === "Completado").length}</div>
                  <p className="text-xs text-muted-foreground">{tasksState.length > 0 ? `${Math.round((tasksState.filter(t => t.status === "Completado").length / tasksState.length) * 100)}% completadas` : "0%"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Horas Trabajadas
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasksState.reduce((acc, t) => {
                    const w = t.priority === "Urgente" ? 8 : t.priority === "Alta" ? 6 : t.priority === "Media" ? 4 : 2
                    return acc + w
                  }, 0)}h</div>
                  <p className="text-xs text-muted-foreground">Total estimado (h) de tareas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Miembros Activos
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{members.filter(m => m.isActive).length}</div>
                  <p className="text-xs text-muted-foreground">{members.length} miembros totales</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Últimas actualizaciones de tus proyectos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "María García", action: "completó la tarea", task: "Diseño de UI", time: "Hace 5 min" },
                    { user: "Juan Pérez", action: "comentó en", task: "API Backend", time: "Hace 1 hora" },
                    { user: "Ana López", action: "creó un nuevo", task: "Proyecto Mobile", time: "Hace 2 horas" },
                    { user: "Carlos Ruiz", action: "actualizó", task: "Documentación", time: "Hace 3 horas" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action} <span className="font-medium">{activity.task}</span>
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Projects */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Proyectos</h2>
              <ProjectForm onCreate={handleCreate} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize).map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          project.status === "Completado"
                            ? "default"
                            : project.status === "En revisión"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          {project.team} miembros
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => openDetails(project)}>
                            Ver detalles
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-center">
                <div className="flex gap-2 items-center">
                  <Button size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
                    Anterior
                  </Button>
                  <div className="text-sm text-muted-foreground">Página {page} de {totalPages}</div>
                  <Button size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>

            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Detalles del Proyecto</DialogTitle>
                  <DialogDescription>
                    Información completa del proyecto
                  </DialogDescription>
                </DialogHeader>
                {selectedProject ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{selectedProject.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
                    </div>
                    <div className="text-sm">
                      <strong>Estado:</strong> {selectedProject.status}
                    </div>
                    <div className="text-sm">
                      <strong>Progreso:</strong> {selectedProject.progress}%
                    </div>
                    <div className="text-sm">
                      <strong>Miembros:</strong>
                      <ul className="list-disc pl-5">
                        {(selectedProject.members || []).map((m: string, i: number) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-end">
                      <DialogClose asChild>
                        <Button>Cancelar</Button>
                      </DialogClose>
                    </div>
                  </div>
                ) : null}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Tab: Team */}
          <TabsContent value="team" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Miembros del Equipo</h2>
              <div>
                <Dialog open={memberDialogOpen} onOpenChange={setMemberDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Nuevo Miembro</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nuevo Miembro</DialogTitle>
                      <DialogDescription>Agrega un nuevo miembro al equipo</DialogDescription>
                    </DialogHeader>
                    <TeamMemberForm onSave={handleMemberCreate} onCancel={() => setMemberDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="space-y-4">
              {members.map((member) => (
                <div key={member.userId} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{member.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.position ?? member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={member.isActive ? "default" : "secondary"}>{member.isActive ? "Activo" : "Inactivo"}</Badge>
                    <Button size="sm" variant="ghost" onClick={() => { setEditingMember(member); setMemberDialogOpen(true) }}>
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleMemberDelete(member.userId)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}

              {/* Edit dialog */}
              <Dialog open={memberDialogOpen && !!editingMember} onOpenChange={(open) => { if (!open) { setEditingMember(null); setMemberDialogOpen(false) } }}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Miembro</DialogTitle>
                    <DialogDescription>Actualiza la información del miembro</DialogDescription>
                  </DialogHeader>
                  {editingMember ? (
                    <TeamMemberForm initial={editingMember} onSave={handleMemberUpdate} onCancel={() => { setEditingMember(null); setMemberDialogOpen(false) }} />
                  ) : null}
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          {/* Tab: Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>
                  Administra las preferencias de tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configuración en desarrollo...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Tareas</CardTitle>
                <CardDescription>
                  Administra todas las tareas de tus proyectos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TasksTable
                  tasks={tasksState}
                  onCreate={handleTaskCreate}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                  page={tasksPage}
                  setPage={setTasksPage}
                  pageSize={tasksPageSize}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}
