export class AccessTokenService {
  static async getToken() {
    try {
      const res = await fetch("/api/get-token");
      const data = await res.json();

      if (res.ok && data.token) {
        return data.token;
      } else {
        throw new Error("No se pudo obtener el token.");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al obtener el token.");
    }
  }
}
