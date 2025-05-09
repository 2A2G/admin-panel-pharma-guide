import { AccessTokenService } from "@/app/api/accesToken";
import axios from "axios";

export interface Rol {
  idRole: number;
  idStatus: number;
}

const urlBas = process.env.NEXT_PUBLIC_API_URL || "https://api.ejemplo.com";
const urlBase = `${urlBas}/api/pharma-guide/setting/role`;

export class roleService {
  async createRole(nombreRol: string) {
    try {
      const token = await AccessTokenService.getToken();
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await axios.post(
        `${urlBase}`,
        { name: nombreRol },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al crear el rol.");
    }
  }

  async getRoles() {
    try {
      const token = await AccessTokenService.getToken();
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await axios.get(`${urlBase}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const roles = response.data.role;
        if (!roles) {
          throw new Error("Rol no encontrado");
        }
        return roles;
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al obtener el rol.");
    }
  }

  async updateRole(role: Rol) {
    try {
      const token = await AccessTokenService.getToken();
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }
      const response = await axios.put(`${urlBase}/${role.idRole}`, role, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al actualizar el rol.");
    }
  }

  async deleteRole(id: number) {
    try {
      const token = await AccessTokenService.getToken();
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await axios.delete(`${urlBase}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al eliminar el rol.");
    }
  }
}
