import { AccessTokenService } from "@/app/api/accesToken";
import axios from "axios";

const urlBas = process.env.NEXT_PUBLIC_API_URL || "https://api.ejemplo.com";
const urlBase = `${urlBas}/api/pharma-guide/drug`;

export class DrugService {
  async getDrugs() {
    try {
      const token = await AccessTokenService.getToken();

      const response = await axios.get(`${urlBase}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const drugs = response.data;
        if (!drugs) {
          throw new Error("Fármacos no encontrados");
        }
        return drugs;
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al obtener los fármacos");
    }
  }
}
