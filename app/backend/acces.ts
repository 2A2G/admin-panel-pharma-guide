import axios from "axios";

const urlBase = process.env.NEXT_PUBLIC_API_URL || "https://api.ejemplo.com";

export class AccesService {
  private url = `${urlBase}/access/pharma-guide/login`;

  async login(credentials: { username: string; password: string }) {
    try {
      const response = await axios.post(this.url, credentials);
      if (response.status === 200) {
        return true;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al iniciar sesión.");
    }
  }
}
