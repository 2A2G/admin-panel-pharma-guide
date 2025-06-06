"use client";

import { Card } from "@/components/ui/card";
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
import DeleteModal from "@/components/ui/deleteModal";

interface ItemToDelete {
  idModelIA: number;
  nameModelIA: string;
}
export default function ManagementIAPage() {
  const [managementIA, setManagementIA] = useState<ManagementIa[]>([]);
  const [loading, setLoading] = useState(true);
  const [addNewManagementIA, setAddNewManagementIA] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | null>(null);

  const managementIAService_ = new managementIAService();

  const fetchManagementIA = async () => {
    try {
      const dataManagemetIA = await managementIAService_.getManagementIA();
      setManagementIA(dataManagemetIA.data);
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

  const handelActivarModelIA = async (modelIA: ManagementIa) => {
    const isDeleted =
      typeof modelIA.isDeleted === "string"
        ? modelIA.isDeleted === "true"
        : Boolean(modelIA.isDeleted);

    if (isDeleted) {
      setModalMessage(
        "Este modelo de IA está eliminado y no puede ser activado."
      );
      setModalOpen(true);
      return;
    }
  };

  const handelConfirmDelete = async (
    idModelIA: number,
    nameModelIA: string
  ) => {
    if (!(idModelIA && nameModelIA) || isNaN(idModelIA)) {
      setModalMessage("ID de modelo de IA inválido");
      setIsDeleteModalOpen(false);
      return;
    }
    setItemToDelete({ idModelIA, nameModelIA });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    if (itemToDelete?.idModelIA !== undefined) {
      handelDeleteModelIA(itemToDelete.idModelIA);
      setIsDeleteModalOpen(false);
    }
  };

  const handelDeleteModelIA = async (idModelIA: number) => {
    try {
      setLoading(true);
      await managementIAService_.deleteManagementIA(idModelIA);
      setModalMessage("Modelo de IA eliminado exitosamente");
      setModalOpen(true);
      await fetchManagementIA();
    } catch (error: any) {
      setModalMessage("Error inesperado al eliminar el rol");
      setModalOpen(true);
      console.log("Hubo un error al eliminar el modelo de IA: ", error);
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
          <h2 className="text-lg font-semibold">Modelos IA</h2>
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
                managementIA
                  .slice()
                  .sort((a, b) => {
                    if (a.status !== b.status) {
                      return a.status ? -1 : 1;
                    }
                    if (a.isDeleted !== b.isDeleted) {
                      return a.isDeleted ? 1 : -1;
                    }
                    return 0;
                  })
                  .map((ia) => (
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
                            onClick={() => {
                              handelActivarModelIA(ia);
                            }}
                            title={ia.status ? "Desactivar" : "Activar"}
                            className={`text-${
                              ia.status ? "green-400" : "gray-500"
                            } hover:text-${
                              ia.status ? "green-600" : "gray-700"
                            }`}
                            aria-label={ia.status ? "Desactivar" : "Activar"}
                          >
                            <span className="sr-only">
                              {ia.status ? "Desactivar" : "Activar"}
                            </span>
                            {ia.status ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.5 12h11m-5.5 7V5"
                                />
                              </svg>
                            )}
                          </Button>
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
                            onClick={async () => {
                              {
                                await handelConfirmDelete(ia.id, ia.name);
                              }
                            }}
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
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirmation}
        itemTitle={itemToDelete?.nameModelIA || ""}
      />
    </div>
  );
}
