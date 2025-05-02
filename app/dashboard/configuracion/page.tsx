"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Search, Trash2 } from "lucide-react";
import LoadingCircles from "@/components/ui/loading";
import { roleService } from "@/app/backend/roles/apiRole";
import { Input } from "@/components/ui/input";
import EditModal from "@/components/ui/editModal";

const editFields = [
  {
    name: "name",
    label: "Nombre del rol",
    type: "text",
  },
  {
    name: "isDeleted",
    label: "Estado",
    type: "select",
    options: [
      { value: "false", label: "Activo" },
      { value: "true", label: "Inactivo" },
    ],
  },
];

interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: {
    id: number;
    name: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export default function RoleTable() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      const role = new roleService();
      setLoading(true);
      try {
        const response = await role.getRole();

        if (Array.isArray(response)) {
          setRoles(response);
        } else if (response.data && Array.isArray(response.data)) {
          setRoles(response.data);
        } else {
          console.error("Formato de respuesta no esperado:", response);
        }
      } catch (error) {
        console.error("Error al obtener roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingCircles />
      </div>
    );
  }
  function setCurrentRol(arg0: null) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestión de Roles y Estados
        </h1>
        <p className="text-muted-foreground">
          Aquí puedes gestionar los roles y estados de los usuarios en el
          sistema.
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
        <Button variant="default">Agregar Rol</Button> {/* New button added */}
      </div>
      <div className="flex flex-wrap gap-6">
        {/* Tabla de Roles */}
        <Card className="flex-1 min-w-[350px]">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="min-w-[150px]">
                    Nombre del Rol
                  </TableHead>
                  <TableHead className="min-w-[150px]">
                    Fecha de registro
                  </TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((rol) => (
                  <TableRow key={rol.id}>
                    <TableCell className="font-medium">{rol.id}</TableCell>
                    <TableCell>{rol.name}</TableCell>
                    <TableCell>
                      {new Date(rol.createdAt).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          rol.status.isDeleted ? "bg-gray-500" : "bg-green-500"
                        }`}
                      >
                        {rol.status.isDeleted ? "Inactivo" : "Activo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditModal
                          title="Editar Rol"
                          description="Modifica los datos del rol."
                          fields={editFields}
                          data={{
                            ...rol,
                            isDeleted: rol.status?.isDeleted ? "true" : "false",
                          }}
                          isOpen={isEditModalOpen}
                          setIsOpen={setIsEditModalOpen}
                          onSubmit={(updatedData) => {
                            const cleanedData = {
                              ...updatedData,
                              isDeleted: updatedData.isDeleted === "true",
                            };
                            console.log("Datos actualizados:", cleanedData);
                            setCurrentRol(null);
                          }}
                          triggerButton={
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          }
                        />

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
        </Card>

        {/* Tabla de Estados */}
        <Card className="flex-1 min-w-[350px]">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="min-w-[150px]">
                    Nombre del Estado
                  </TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Activo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {statuses.map((estado) => (
                  <TableRow key={estado.id}>
                    <TableCell className="font-medium">{estado.id}</TableCell>
                    <TableCell>{estado.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          estado.isDeleted ? "bg-gray-500" : "bg-green-500"
                        }`}
                      >
                        {estado.isDeleted ? "Inactivo" : "Activo"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
