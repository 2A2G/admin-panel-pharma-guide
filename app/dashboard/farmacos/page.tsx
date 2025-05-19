"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DrugService } from "@/app/backend/drugs/apiDrug";
import LoadingCircles from "@/components/ui/loading";

interface Drug {
  id: number;
  name_generic: string;
  brand_name: string;
  mechanism_of_action: string;
  therapeutic_class: string;
  tags: string;
  isDeleted: Boolean;
  createdAt: Date;
  user: {
    full_name: string;
  };
}

export default function FarmacosPage() {
  const [drug, setDrug] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDrug = async () => {
    const drugs = new DrugService();
    try {
      const response = await drugs.getDrugs();
      if (
        !response ||
        (Array.isArray(response) && response.length === 0) ||
        (response.data &&
          Array.isArray(response.data) &&
          response.data.length === 0)
      ) {
        setDrug([]);
        console.log("No hay registros de medicamentos.");
      } else if (Array.isArray(response)) {
        setDrug(response);
      } else if (response.data && Array.isArray(response.data)) {
        setDrug(response.data);
      } else {
        console.error("Formato de respuesta no esperado:", response);
      }
    } catch (error) {
      console.error("Error al obtener roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrug();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingCircles />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Farmacos</h1>
        <p className="text-muted-foreground">
          Gestiona los farmacos disponibles en la aplicación.
        </p>
      </div>

      <Card>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Nombre</TableHead>
                <TableHead className="min-w-[150px]">
                  Principio Activo
                </TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Laboratorio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Creado por</TableHead>
                <TableHead>Fecha de Creación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drug.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >
                    No hay medicamentos registrados.
                  </TableCell>
                </TableRow>
              ) : (
                drug.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="min-w-[150px]">
                      {item.name_generic}
                    </TableCell>
                    <TableCell>{item.brand_name}</TableCell>
                    <TableCell>{item.mechanism_of_action}</TableCell>
                    <TableCell>{item.therapeutic_class}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.isDeleted ? "destructive" : "success"}
                      >
                        {item.isDeleted ? "Eliminado" : "Activo"}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.user?.full_name ?? "-"}</TableCell>
                    <TableCell>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "-"}
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Mostrando <strong>{drug.length}</strong> de{" "}
            <strong>{drug.length}</strong> medicamentos
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
  );
}
