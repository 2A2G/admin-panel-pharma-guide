import { AccessTokenService } from "@/app/api/accesToken";
import axios from "axios";
import { error } from "console";

export interface Status {
  idStatus: number;
  name: string;
}

const urlBas = process.env.NEXT_PUBLIC_API_URL || "https://api.ejemplo.com";
const urlBase = `${urlBas}/api/pharma-guide/setting/role`;

export class statusService {
  async createStatus(nameStatus: string) {
    try {
      if (!nameStatus) {
        throw new Error("Faltan Parametros");
      }

      const token = await AccessTokenService.getToken();
      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }

      const response = await axios.post(
        `${urlBase}`,
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
}
