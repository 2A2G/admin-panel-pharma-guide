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
import NotificationModal from "@/components/ui/notificationModal";
import { statusService } from "@/app/backend/status/apiStatus";
import DeleteModal from "@/components/ui/deleteModal";

const editFields = [
  {
    name: "name",
    label: "Nombre del rol",
    type: "text" as "text",
  },
  {
    name: "isDeleted",
    label: "Estado",
    type: "select" as "select",
    options: [
      { value: "false", label: "Activo" },
      { value: "true", label: "Eliminado" },
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

interface Status {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

interface updateRole {
  idRole: number;
  idStatus: number;
}
interface updateStatus {
  idRole: number;
  name: string;
  isDeleted: boolean;
}

interface CreateRole {
  name: string;
}
interface CreateStatus {
  name: string;
}
interface ItemToDelete {
  id: number;
  title: string;
  caso: string;
}

export default function RoleTable() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [statusToEdit, setStatusToEdit] = useState<Status | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | null>(null);

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

  const feachStatus = async () => {
    const status = new statusService();
    setLoading(true);
    try {
      const response = await status.getStatus();

      if (Array.isArray(response)) {
        setStatus(response);
      } else if (response.data && Array.isArray(response.data)) {
        setStatus(response.data);
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
    fetchRoles();
    feachStatus();
  }, []);

  const handleDelete = (itemId: number, itemName: string, itemCaso: string) => {
    setItemToDelete({ id: itemId, title: itemName, caso: itemCaso });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async (id: number, caso: string) => {
    if (caso === "role") {
      await handelDeleteRole(id);
    } else {
      await handelDeleteStatus(id);
    }
  };

  const handelCreateRole = async ({ name }: CreateRole) => {
    const newRol = new roleService();
    setLoading(true);
    try {
      const response = await newRol.createRole(name);
      if (response) {
        setModalMessage("Rol creado correctamente");
        setModalOpen(true);
        await fetchRoles();
        setIsAddModalOpen(false);
      } else {
        setModalMessage("Error al crear el rol");
        setModalOpen(true);
        console.error("Error al crear el rol:", response);
      }
    } catch (error) {
      setModalMessage("Error inesperado al crear el rol");
      setModalOpen(true);
      console.error("Error al crear el rol:", error);
    } finally {
      setLoading(false);
    }
  };

  const handelUpdateRole = async ({ idRole, idStatus }: updateRole) => {
    const oldRol = new roleService();
    setLoading(true);
    try {
      const response = await oldRol.updateRole({ idRole, idStatus });
      if (response) {
        setModalMessage("Rol actualizado correctamente");
        setModalOpen(true);
        await fetchRoles();
        setRoleToEdit(null);
      } else {
        setModalMessage("Error al actualizar el rol");
        setModalOpen(true);
        console.error("Error al actualizar el rol:", response);
      }
    } catch (error) {
      setModalMessage("Error inesperado al actualizar el rol");
      setModalOpen(true);
      console.error("Error al actualizar el rol:", error);
    } finally {
      setLoading(false);
    }
  };

  const handelDeleteRole = async (id: number) => {
    const role = new roleService();
    setLoading(true);
    try {
      const response = await role.deleteRole(id);
      if (response) {
        setModalMessage("Rol eliminado correctamente");
        setModalOpen(true);
        await fetchRoles();
      } else {
        setModalMessage("Error al eliminar el rol");
        setModalOpen(true);
        console.error("Error al eliminar el rol:", response);
      }
    } catch (error) {
      setModalMessage("Error inesperado al eliminar el rol");
      setModalOpen(true);
      console.error("Error al eliminar el rol:", error);
    } finally {
      setLoading(false);
    }
  };

  const handelCreateStatus = async ({ name }: CreateStatus) => {
    const newStatu = new statusService();
    setLoading(true);
    try {
      const response = await newStatu.createStatus(name);
      if (response) {
        setModalMessage("Estado creado correctamente");
        setModalOpen(true);
        await feachStatus();
        setIsAddModalOpen(false);
      } else {
        setModalMessage("Error al crear el estado");
        setModalOpen(true);
        console.error("Error al crear el estado:", response);
      }
    } catch (error) {
      setModalMessage("Error inesperado al crear el estado");
      setModalOpen(true);
      console.error("Error al crear el estado:", error);
    } finally {
      setLoading(false);
    }
  };

  const handelDeleteStatus = async (id: number) => {
    const status = new statusService();
    setLoading(true);
    try {
      const response = await status.deleteStaus(id);
      if (response) {
        setModalMessage("Estado eliminado correctamente");
        setModalOpen(true);
        setLoading(false);
        await feachStatus();
      } else {
        setModalMessage("Error al eliinar el estado");
        setModalOpen(true);
        console.error("Error al eliminar el estado:", response);
      }
    } catch (error) {
      setModalMessage("Errro inesperado al eliminar el estado");
      setModalOpen(true);
      console.log("Error al eliminar el rol:", error);
    } finally {
      setLoading(false);
    }
  };

  const handelUpdateStatus = async (updateData: updateStatus) => {
    const oldStatus = new statusService();
    setLoading(true);
    try {
      const response = await oldStatus.updateStaus(updateData);
      if (response) {
        setModalMessage("Estado actualizado correctamente");
        setModalOpen(true);
        await feachStatus();
        setStatusToEdit(null);
      } else {
        setModalMessage("Error al actualizar el estado");
        setModalOpen(true);
        console.error("Error al actualizar el estado:", response);
      }
    } catch (error) {
      setModalMessage("Error inesperado al actualizar el estado");
      setModalOpen(true);
      console.error("Error al actualizar el estado:", error);
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
    <>
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
        </div>
        <div className="flex flex-wrap gap-6">
          <Card className="flex-1 min-w-[350px]">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Roles</h2>
              <Button onClick={() => setIsAddModalOpen(true)}>
                Agregar Rol
              </Button>

              {isAddModalOpen && (
                <EditModal
                  title="Agregar Rol"
                  description="Ingresa el nombre del nuevo rol."
                  fields={[
                    { name: "name", label: "Nombre del Rol", type: "text" },
                  ]}
                  data={{ name: "" }}
                  isOpen={isAddModalOpen}
                  setIsOpen={setIsAddModalOpen}
                  onSubmit={(formData: Record<string, any>) =>
                    handelCreateRole(formData as CreateRole)
                  }
                />
              )}
            </div>
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
                  {roles
                    .sort((a, b) => {
                      if (
                        a.status.name === "deleted" &&
                        b.status.name !== "deleted"
                      )
                        return 1;
                      if (
                        a.status.name !== "deleted" &&
                        b.status.name === "deleted"
                      )
                        return -1;
                      return 0;
                    })
                    .map((rol) => (
                      <TableRow key={rol.id}>
                        <TableCell className="font-medium">{rol.id}</TableCell>
                        <TableCell>{rol.name}</TableCell>
                        <TableCell>
                          {new Date(rol.createdAt).toLocaleDateString("es-ES")}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              rol.status.name === "deleted"
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                          >
                            {rol.status.name === "deleted"
                              ? "Eliminado"
                              : "Activo"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setRoleToEdit(rol)}
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
                                  await handleDelete(rol.id, rol.name, "role");
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>

                {roleToEdit && (
                  <EditModal
                    title="Editar Rol"
                    description="Modifica los datos del rol."
                    fields={editFields}
                    data={{
                      ...roleToEdit,
                      isDeleted:
                        roleToEdit.status.name === "deleted" ? "true" : "false",
                    }}
                    isOpen={!!roleToEdit}
                    setIsOpen={(isOpen) => {
                      if (!isOpen) setRoleToEdit(null);
                    }}
                    onSubmit={(updatedData) => {
                      const idStatus = updatedData.isDeleted === "true" ? 2 : 1;
                      handelUpdateRole({
                        idRole: roleToEdit.id,
                        idStatus,
                      });
                      setRoleToEdit(null);
                    }}
                  />
                )}
              </Table>
            </div>
          </Card>

          {/* Tabla de Estados */}
          <Card className="flex-1 min-w-[350px]">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Estados</h2>
              <Button onClick={() => setIsAddModalOpen(true)}>
                Agregar Estado
              </Button>

              {isAddModalOpen && (
                <EditModal
                  title="Agregar Estado"
                  description="Ingresa el nombre del nuevo estado."
                  fields={[
                    { name: "name", label: "Nombre del estado", type: "text" },
                  ]}
                  data={{ name: "" }}
                  isOpen={isAddModalOpen}
                  setIsOpen={setIsAddModalOpen}
                  onSubmit={(formData: Record<string, any>) =>
                    handelCreateStatus(formData as CreateStatus)
                  }
                />
              )}
            </div>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead className="min-w-[150px]">
                      Nombre del Estado
                    </TableHead>
                    <TableHead>Fecha de registro </TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {status
                    .sort((a, b) => {
                      if (a.isDeleted && !b.isDeleted) return 1;
                      if (!a.isDeleted && b.isDeleted) return -1;
                      return 0;
                    })
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          {new Date(item.createdAt).toLocaleDateString("es-ES")}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              item.isDeleted ? "bg-red-500" : "bg-green-500"
                            }`}
                          >
                            {item.isDeleted ? "Eliminado" : "Activo"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setStatusToEdit(item)}
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
                                  await handleDelete(
                                    item.id,
                                    item.name,
                                    "estado"
                                  );
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                  {statusToEdit && (
                    <EditModal
                      title="Editar Estado"
                      description="Modifica los datos del estado."
                      fields={editFields}
                      data={{
                        ...statusToEdit,
                        isDeleted: statusToEdit.isDeleted ? "true" : "false",
                      }}
                      isOpen={!!statusToEdit}
                      setIsOpen={(isOpen) => {
                        if (!isOpen) setStatusToEdit(null);
                      }}
                      onSubmit={(updatedData) => {
                        const isDeleted = updatedData.isDeleted === "true";
                        handelUpdateStatus({
                          idRole: statusToEdit.id,
                          isDeleted: isDeleted,
                          name: updatedData.name,
                        });
                        setRoleToEdit(null);
                      }}
                    />
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
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
        onConfirm={() =>
          itemToDelete?.id !== undefined &&
          confirmDelete(itemToDelete.id, itemToDelete?.caso)
        }
        itemTitle={itemToDelete?.title || ""}
      />
    </>
  );
}
