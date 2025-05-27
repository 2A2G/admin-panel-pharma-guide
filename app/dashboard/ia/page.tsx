"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Edit, Search, Trash2 } from "lucide-react";

import { useEffect } from "react";
import { StudyPlanService } from "@/app/backend/studyPlan/apiStudyPlan";
import { useState } from "react";
import LoadingCircles from "@/components/ui/loading";
import EditModal from "@/components/ui/editModal";

export default function ManagementIAPage() {
  const [loading, setLoading] = useState(true);

  //   if (loading) {
  //     return (
  //       <div className="flex justify-center items-center h-[60vh]">
  //         <LoadingCircles />
  //       </div>
  //     );
  //   }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestión de Modelos de IA
        </h1>
        <p className="text-muted-foreground">
          Aquí puedes gestionar los modelos de IA que has creado, editarlos o
          eliminarlos según sea necesario.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar usuarios..."
              className="pl-8 w-full sm:w-[300px]"
            />
          </div>
        </div>
      </div>

      <Card>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Nombre</TableHead>
                <TableHead className="min-w-[150px]">Empresa</TableHead>
                <TableHead className="min-w-[150px]">Tipo de modelo</TableHead>
                <TableHead className="min-w-[100px]">Versión</TableHead>
                <TableHead className="min-w-[150px]">
                  Fecha de registro
                </TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody></TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
