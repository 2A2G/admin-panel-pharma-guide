import { AccessTokenService } from "@/app/api/accesToken";
import axios from "axios";
import { error } from "console";
import { headers } from "next/headers";

export interface Status {
  idStatus: number;
  name: string;
}
interface updateStatus {
  idRole: number;
  name: string;
  isDeleted: boolean;
}

const urlBas = process.env.NEXT_PUBLIC_API_URL || "https://api.ejemplo.com";
const urlBase = `${urlBas}/api/pharma-guide/setting`;

export class statusService {
  private static async getToken() {
    const token = await AccessTokenService.getToken();
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    return token;
  }

  async createStatus(nameStatus: string) {
    try {
      if (!nameStatus) {
        throw new Error("Faltan Parametros");
      }

      const token = await statusService.getToken();

      const response = await axios.post(
        `${urlBase + "/status"}`,
        { name: nameStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al crear el nuevo estado");
    }
  }

  async getStatus() {
    try {
      const token = await statusService.getToken();

      const response = await axios.get(`${urlBase + "/status"}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data.status;
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al obtener los status");
    }
  }

  async updateStaus(updateStatus: updateStatus) {
    try {
      const { idRole, name, isDeleted } = updateStatus;

      if (!idRole) {
        throw new Error("El id del estado no está presente");
      }

      const token = await statusService.getToken();

      const response = await axios.put(
        `${urlBase}/status/${idRole}`,
        {
          name: name,
          isDeleted: isDeleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          "Error en el servidor, no se pudo actualizar el estado"
        );
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al actualizar el estado");
    }
  }

  async deleteStaus(idStatus: number) {
    try {
      if (!idStatus || idStatus === null) {
        throw new Error("El id del estado no esta presente");
      }
      const token = await statusService.getToken();

      const response = await axios.delete(`${urlBase}/status/${idStatus}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Errr en el serrvidor no se pudo eliminar el estado");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al eliminar el estado");
    }
  }
}
