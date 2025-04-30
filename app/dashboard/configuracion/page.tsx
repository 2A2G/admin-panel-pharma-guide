"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { roleService } from "@/app/backend/roles/apiRole";
import { useEffect, useState } from "react";
import LoadingCircles from "@/components/ui/loading";
export default function ConfiguracionPage() {
  interface Role {
    id: number;
    name: string;
  }

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      const role = new roleService();
      setLoading(true);
      try {
        const response = await role.getRole();
        setRoles(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching roles:", error);
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
      </div>
    </div>
  );
}
