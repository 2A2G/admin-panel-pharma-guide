import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download, Edit, Plus, Search, Trash2, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MedicamentosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Medicamentos</h1>
        <p className="text-muted-foreground">Gestiona los medicamentos disponibles en la aplicación.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar medicamentos..." className="pl-8 w-full sm:w-[300px]" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="analgesicos">Analgésicos</SelectItem>
              <SelectItem value="antibioticos">Antibióticos</SelectItem>
              <SelectItem value="antialergicos">Antialérgicos</SelectItem>
              <SelectItem value="antiinflamatorios">Antiinflamatorios</SelectItem>
              <SelectItem value="antiacidos">Antiácidos</SelectItem>
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
            <span>Añadir Medicamento</span>
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
                <TableHead className="min-w-[150px]">Principio Activo</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Laboratorio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: 1,
                  nombre: "Paracetamol 500mg",
                  principioActivo: "Paracetamol",
                  categoria: "Analgésicos",
                  laboratorio: "Bayer",
                  estado: "Activo",
                },
                {
                  id: 2,
                  nombre: "Ibuprofeno 400mg",
                  principioActivo: "Ibuprofeno",
                  categoria: "Antiinflamatorios",
                  laboratorio: "Pfizer",
                  estado: "Activo",
                },
                {
                  id: 3,
                  nombre: "Amoxicilina 500mg",
                  principioActivo: "Amoxicilina",
                  categoria: "Antibióticos",
                  laboratorio: "GSK",
                  estado: "Activo",
                },
                {
                  id: 4,
                  nombre: "Loratadina 10mg",
                  principioActivo: "Loratadina",
                  categoria: "Antialérgicos",
                  laboratorio: "Sanofi",
                  estado: "Inactivo",
                },
                {
                  id: 5,
                  nombre: "Omeprazol 20mg",
                  principioActivo: "Omeprazol",
                  categoria: "Antiácidos",
                  laboratorio: "AstraZeneca",
                  estado: "Activo",
                },
                {
                  id: 6,
                  nombre: "Aspirina 100mg",
                  principioActivo: "Ácido acetilsalicílico",
                  categoria: "Analgésicos",
                  laboratorio: "Bayer",
                  estado: "Activo",
                },
                {
                  id: 7,
                  nombre: "Cetirizina 10mg",
                  principioActivo: "Cetirizina",
                  categoria: "Antialérgicos",
                  laboratorio: "Novartis",
                  estado: "Activo",
                },
              ].map((medicamento) => (
                <TableRow key={medicamento.id}>
                  <TableCell className="font-medium">{medicamento.id}</TableCell>
                  <TableCell className="min-w-[150px]">{medicamento.nombre}</TableCell>
                  <TableCell>{medicamento.principioActivo}</TableCell>
                  <TableCell>{medicamento.categoria}</TableCell>
                  <TableCell>{medicamento.laboratorio}</TableCell>
                  <TableCell>
                    <Badge variant={medicamento.estado === "Activo" ? "success" : "secondary"}>
                      {medicamento.estado}
                    </Badge>
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
            Mostrando <strong>7</strong> de <strong>42</strong> medicamentos
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
