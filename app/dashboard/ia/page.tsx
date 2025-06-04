"use client";

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
import { useEffect } from "react";
import {
  ManagementIa,
  managementIAService,
} from "@/app/backend/management-ia/management-ia";
import { useState } from "react";
import LoadingCircles from "@/components/ui/loading";
import NotificationModal from "@/components/ui/notificationModal";
import { Button } from "@/components/ui/button";
import EditModal from "@/components/ui/editModal";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ManagementIAPage() {
  const [managementIA, setManagementIA] = useState<ManagementIa[]>([]);
  const [loading, setLoading] = useState(true);
  const [addNewManagementIA, setAddNewManagementIA] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const fetchManagementIA = async () => {
    const managementIA = new managementIAService();
    try {
      const dataManagemetIA = await managementIA.getManagementIA();
      setManagementIA(dataManagemetIA.data);
      console.log(dataManagemetIA);
    } catch (error) {
      setManagementIA([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagementIA();
  }, []);

  const handelCreateModelIA = async (formData: ManagementIa) => {
    try {
      setLoading(true);
      const managementIAService_ = new managementIAService();
      await managementIAService_.createManagementIa(formData);
      setModalMessage("Modelo de IA creado exitosamente");
      setModalOpen(true);
      await fetchManagementIA();
    } catch (error: any) {
      console.error("Error al crear modelo de IA:", error);
      setModalMessage(error.message || "Error al crear modelo de IA");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold tracking-tight">
          Gestión de Modelos de IA
        </h1>
        <p className="text-muted-foreground">
          Aquí puedes gestionar los modelos de IA que has creado, editarlos o
          eliminarlos según sea necesario.
        </p>
      </div>

      <Card>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Roles</h2>
          <Button onClick={() => setAddNewManagementIA(true)}>
            Agregar Modelo de IA
          </Button>

          {addNewManagementIA && (
            <EditModal
              title="Agregar Modelo de IA"
              description="Ingresa los datos del nuevo modelo de IA."
              fields={[
                {
                  name: "name",
                  label: "Nombre del modelo de IA",
                  type: "text",
                },
                {
                  name: "provider",
                  label: "Nombre del Proveedor",
                  type: "text",
                },
                {
                  name: "model",
                  label: "Nombre del Modelo de IA",
                  type: "text",
                },
                {
                  name: "version",
                  label: "Versión del Modelo de IA",
                  type: "text",
                },
                {
                  name: "api_key",
                  label: "Clave del Modelo de IA",
                  type: "password",
                  showToggle: true,
                },
                {
                  name: "url_api",
                  label: "Url de acceso al modelo de IA",
                  type: "text",
                },
                {
                  name: "prompt_description",
                  label: "Digite el contexto que tendrá el modelo de IA",
                  type: "text",
                },
              ]}
              data={{ name: "" }}
              isOpen={addNewManagementIA}
              setIsOpen={setAddNewManagementIA}
              onSubmit={(formData: Record<string, any>) =>
                handelCreateModelIA(formData as ManagementIa)
              }
            />
          )}
        </div>
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
                <TableHead>Estado del Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {managementIA.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >
                    No hay Modelos de IA registrados
                  </TableCell>
                </TableRow>
              ) : (
                managementIA.map((ia) => (
                  <TableRow key={ia.id}>
                    <TableCell>{ia.name}</TableCell>
                    <TableCell>{ia.provider}</TableCell>
                    <TableCell>{ia.model}</TableCell>
                    <TableCell>{ia.version}</TableCell>
                    <TableCell>
                      {" "}
                      {new Date(ia.createdAt).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge
                        variant={
                          ia.isDeleted
                            ? "destructive"
                            : ia.status
                            ? "success"
                            : "secondary"
                        }
                        className="block text-center"
                      >
                        {ia.isDeleted
                          ? "Eliminado"
                          : ia.status
                          ? "En uso"
                          : "Sin uso"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {ia.isDeleted ? (
                        <span className="text-red-500 font-semibold">
                          Eliminado
                        </span>
                      ) : (
                        <span className="text-blue-600 font-semibold">
                          Listo para usar
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={() => }
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Eliminar"
                          // onClick={async () => {
                          //   {
                          //     await handelConfirmDelete(rol.id, "Rol");
                          //   }
                          // }}
                        >
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
      </Card>
      <NotificationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        title="Notificación"
        variant="info"
      />
    </div>
  );
}
