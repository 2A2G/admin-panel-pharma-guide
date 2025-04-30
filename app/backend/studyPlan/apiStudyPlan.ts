import axios from "axios";
import { AccessTokenService } from "../../api/accesToken";

const urlBas = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const urlBase = `${urlBas}/api/pharma-guide/study-plans-all`;

export class StudyPlanService {
  async getStudyPlan() {
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
        const { studyPlan, message } = response.data;

        if (!Array.isArray(studyPlan)) {
          throw new Error("Formato de respuesta inesperado del servidor.");
        }

        return studyPlan;
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    } catch (error: any) {
      throw new Error(
        error?.message || "Error al obtener el plan de estudios."
      );
    }
  }
}
