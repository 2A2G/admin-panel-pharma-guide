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
  isDeleted: Boolean;
}

interface updateRole {
  rol: Role;
}

interface CreateRole {
  name: string;
}

interface ItemToDelete {
  id: number;
  title: string;
  caso: string;
}

export default function RoleTable() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | null>(null);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isAddStatusModalOpen, setIsAddStatusModalOpen] = useState(false);

  const fetchRoles = async () => {
    const role = new roleService();
    setLoading(true);
    try {
      const response = await role.getRoles();

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

  useEffect(() => {
    fetchRoles();
  }, []);

  const handelCreateRole = async ({ name }: CreateRole) => {
    const newRol = new roleService();
    setLoading(true);
    try {
      const response = await newRol.createRole(name);
      if (response) {
        setModalMessage("Rol creado correctamente");
        setModalOpen(true);
        await fetchRoles();
        setIsAddRoleModalOpen(false);
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

  const handelUpdateRole = async ({ rol }: updateRole) => {
    const oldRol = new roleService();
    setLoading(true);
    try {
      const response = await oldRol.updateRole(rol);
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

  const handelConfirmDelete = (id: number, title: string) => {
    setItemToDelete({ id, title, caso: "rol" });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    if (itemToDelete?.id !== undefined) {
      handelDeleteRole(itemToDelete.id);
      setIsDeleteModalOpen(false);
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
            Gestión de Roles
          </h1>
          <p className="text-muted-foreground">
            Aquí puedes gestionar los roles de los usuarios en el sistema.
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
              <Button onClick={() => setIsAddRoleModalOpen(true)}>
                Agregar Rol
              </Button>

              {isAddRoleModalOpen && (
                <EditModal
                  title="Agregar Rol"
                  description="Ingresa el nombre del nuevo rol."
                  fields={[
                    { name: "name", label: "Nombre del Rol", type: "text" },
                  ]}
                  data={{ name: "" }}
                  isOpen={isAddRoleModalOpen}
                  setIsOpen={setIsAddRoleModalOpen}
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
                    .sort((a, b) => Number(a.isDeleted) - Number(b.isDeleted))
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
                              rol.isDeleted === true
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                          >
                            {rol.isDeleted === true ? "Eliminado" : "Activo"}
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
                                  await handelConfirmDelete(rol.id, "Rol");
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
                        roleToEdit.isDeleted === true ? "true" : "false",
                    }}
                    isOpen={!!roleToEdit}
                    setIsOpen={(isOpen) => {
                      if (!isOpen) setRoleToEdit(null);
                    }}
                    onSubmit={(updatedData) => {
                      const updatedRole = {
                        ...roleToEdit,
                        ...updatedData,
                        isDeleted: updatedData.isDeleted === "true",
                      };
                      handelUpdateRole({ rol: updatedRole });
                      setRoleToEdit(null);
                    }}
                  />
                )}
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
        onConfirm={handleDeleteConfirmation}
        itemTitle={itemToDelete?.title || ""}
      />
    </>
  );
}
