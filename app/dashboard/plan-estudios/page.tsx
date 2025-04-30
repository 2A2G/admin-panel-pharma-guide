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
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import { useEffect } from "react";
import { StudyPlanService } from "@/app/backend/studyPlan/apiStudyPlan";
import { useState } from "react";
import LoadingCircles from "@/components/ui/loading";

export default function PlanEstudiosPage() {
  interface StudyPlan {
    id: number;
    subjet_name: string;
    daily_hour: string;
    total_days: string;
    user: { full_name: string };
    createdAt: string;
    isDeleted: boolean;
  }

  const [studyPlan, setStudyPlan] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchStudyPlans = async () => {
      const studyPlanService = new StudyPlanService();
      try {
        const plans = await studyPlanService.getStudyPlan();
        setStudyPlan(plans);
      } catch (error) {
        // console.error("Error al obtener el plan de estudios:", error);
        setStudyPlan([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudyPlans();
  }, []);

  const totalStudyPlans = studyPlan.length;
  const totalPages = Math.ceil(totalStudyPlans / usersPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastStudyPlan = currentPage * usersPerPage;
  const indexOfFirstStudyPlan = indexOfLastStudyPlan - usersPerPage;
  const currentStudyPlans = studyPlan.slice(
    indexOfFirstStudyPlan,
    indexOfLastStudyPlan
  );

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
        <h1 className="text-3xl font-bold tracking-tight">Plan de Estudios</h1>
        <p className="text-muted-foreground">
          Aquí puedes gestionar el plan de estudios de la aplicación
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
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead className="min-w-[150px]">Tema de Estudio</TableHead>
                <TableHead className="min-w-[150px]">Usuario</TableHead>
                <TableHead className="min-w-[150px]">Total de días</TableHead>
                <TableHead className="min-w-[150px]">Horas por día</TableHead>
                <TableHead className="min-w-[150px]">
                  Fecha de registro
                </TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStudyPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.id}</TableCell>
                  <TableCell>{plan.subjet_name}</TableCell>
                  <TableCell>{plan.user.full_name}</TableCell>
                  <TableCell>{plan.total_days}</TableCell>
                  <TableCell>{plan.daily_hour}</TableCell>
                  <TableCell>
                    {new Date(plan.createdAt).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={plan.isDeleted ? "secondary" : "success"}>
                      {plan.isDeleted ? "Inactivo" : "Activo"}
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
            Mostrando <strong>{currentStudyPlans.length}</strong> de{" "}
            <strong>{totalStudyPlans}</strong> usuarios
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                size="sm"
                className="h-8 w-8"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Página siguiente</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
