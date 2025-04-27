import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download, Edit, Plus, Search, Trash2, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UsuariosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
        <p className="text-muted-foreground">Gestiona los usuarios registrados en la aplicación.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar usuarios..." className="pl-8 w-full sm:w-[300px]" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los roles</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="user">Usuario</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Importar</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Añadir Usuario</span>
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead className="min-w-[150px]">Nombre</TableHead>
                <TableHead className="min-w-[150px]">Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Fecha de registro</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: 1,
                  nombre: "Juan Pérez",
                  email: "juan.perez@example.com",
                  rol: "Administrador",
                  fechaRegistro: "10/01/2023",
                  estado: "Activo",
                },
                {
                  id: 2,
                  nombre: "María López",
                  email: "maria.lopez@example.com",
                  rol: "Editor",
                  fechaRegistro: "15/02/2023",
                  estado: "Activo",
                },
                {
                  id: 3,
                  nombre: "Carlos Rodríguez",
                  email: "carlos.rodriguez@example.com",
                  rol: "Usuario",
                  fechaRegistro: "22/03/2023",
                  estado: "Activo",
                },
                {
                  id: 4,
                  nombre: "Ana Martínez",
                  email: "ana.martinez@example.com",
                  rol: "Usuario",
                  fechaRegistro: "05/04/2023",
                  estado: "Inactivo",
                },
                {
                  id: 5,
                  nombre: "Pedro Sánchez",
                  email: "pedro.sanchez@example.com",
                  rol: "Editor",
                  fechaRegistro: "18/05/2023",
                  estado: "Activo",
                },
                {
                  id: 6,
                  nombre: "Laura Gómez",
                  email: "laura.gomez@example.com",
                  rol: "Usuario",
                  fechaRegistro: "30/06/2023",
                  estado: "Activo",
                },
                {
                  id: 7,
                  nombre: "Miguel Torres",
                  email: "miguel.torres@example.com",
                  rol: "Usuario",
                  fechaRegistro: "12/07/2023",
                  estado: "Inactivo",
                },
              ].map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.id}</TableCell>
                  <TableCell className="min-w-[150px]">{usuario.nombre}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.rol}</TableCell>
                  <TableCell>{usuario.fechaRegistro}</TableCell>
                  <TableCell>
                    <Badge variant={usuario.estado === "Activo" ? "success" : "secondary"}>{usuario.estado}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Mostrando <strong>7</strong> de <strong>35</strong> usuarios
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              3
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Página siguiente</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
