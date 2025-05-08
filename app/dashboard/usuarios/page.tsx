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
  Upload,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { UserService } from "@/app/backend/users/apiUser";
import { useState } from "react";
import LoadingCircles from "@/components/ui/loading";
import EditModal from "@/components/ui/editModal";
import { roleService } from "@/app/backend/roles/apiRole";

export default function UsuariosPage() {
  interface Usuario {
    id: number;
    full_name: string;
    email: string;
    role: { name: string };
    createdAt: string;
    isDeleted: boolean;
  }

  interface creareUser {
    full_name: string;
    email: string;
    roleId: number;
  }
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

  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    const userService = new UserService();
    try {
      const user = await userService.getUser();
      setUsuarios(user.data);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleCreateUser = async ({ usuario }: { usuario: creareUser }) => {
    const newUser = new UserService();
    setLoading(true);

    try {
      const response = await newUser.createUser(
        usuario.full_name,
        usuario.email,
        usuario.roleId
      );
      if (response) {
        setModalMessage("Usuario creado exitosamente");
        setModalOpen(true);
        await fetchUsers();
        setIsAddModalOpen(false);
      } else {
        setModalMessage(
          "Hubo un error al crear el usuario. Inténtelo nuevamente."
        );
        setModalOpen(true);
      }
    } catch (error) {
      setModalMessage("Error del servidor al crear el usuario");
      setModalOpen(true);
      console.error("Error al crear el usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = usuarios.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

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
        <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
        <p className="text-muted-foreground">
          Gestiona los usuarios registrados en la aplicación.
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
          <Button
            onClick={() => setIsAddModalOpen(true)}
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Añadir Usuario</span>
          </Button>

          {isAddModalOpen && (
            <EditModal
              title="Añadir nuevo Usuario"
              description="Ingresa los datos del usuario."
              fields={[
                {
                  name: "full_name",
                  label: "Nombre completo del Usuario",
                  type: "text",
                },
                { name: "email", label: "Correo Electronico", type: "email" },
                {
                  name: "roleId",
                  label: "Rol asignado",
                  type: "select",
                  options: roles.map((role) => ({
                    label: role?.name ?? "",
                    value: role.id.toString(),
                  })),
                },
              ]}
              data={{ name: "" }}
              isOpen={isAddModalOpen}
              setIsOpen={setIsAddModalOpen}
              onSubmit={(formData: Record<string, any>) =>
                handleCreateUser({ usuario: formData as creareUser })
              }
            />
          )}
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
              {currentUsers.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.id}</TableCell>
                  <TableCell className="min-w-[150px]">
                    {usuario.full_name}
                  </TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.role?.name ?? ""}</TableCell>

                  <TableCell>
                    {new Date(usuario.createdAt).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={usuario.isDeleted ? "secondary" : "success"}
                    >
                      {usuario.isDeleted ? "Inactivo" : "Activo"}
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
            Mostrando <strong>{currentUsers.length}</strong> de{" "}
            <strong>{totalUsers}</strong> usuarios
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
