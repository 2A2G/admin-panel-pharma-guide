import { AccessTokenService } from "@/app/api/accesToken";
import axios from "axios";

export interface ManagementIa {}

const urlBas = process.env.NEXT_PUBLIC_API_URL || "https://api.ejemplo.com";
const urlBase = `${urlBas}/api/pharma-guide/ia-management`;

export class managementIAService {
  async createManagementIa(managementIa: ManagementIa) {
    try {
      const token = await AccessTokenService.getToken();

      const response = await axios.post(
        `${urlBase}`,
        { data: managementIa },
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
      throw new Error(error?.message || "Error al crear el modjelo de IA");
    }
  }

  async getManagementIA() {
    try {
      const token = await AccessTokenService.getToken();
      const response = await axios.get(`${urlBase}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error: any) {
      throw new Error(
        error?.message || "Error al obtener los modelo de IA registrados"
      );
    }
  }
}
