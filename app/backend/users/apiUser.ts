import axios from "axios";
import { AccessTokenService } from "../../api/accesToken";
import { headers } from "next/headers";
import { error } from "console";

const urlBas = process.env.NEXT_PUBLIC_API_URL || "https://api.ejemplo.com";
const urlBase = `${urlBas}/api/pharma-guide/users`;
const urlRegister = `${urlBas}/api/access/pharma-guide/register`;

export class UserService {
  async createUser(full_name: string, email: string, roleId: number) {
    const user = { full_name, email, roleId };

    try {
      const token = await AccessTokenService.getToken();

      const response = await axios.post(`${urlRegister}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        return response.data;
      } else {
        return false;
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al crear el usuario");
    }
  }

  async getUser() {
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
        const user = response.data;
        if (!user) {
          throw new Error("Usuario no encontrado");
        }
        return user;
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al obtener el usuario.");
    }
  }
}
