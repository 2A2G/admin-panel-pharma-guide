import axios from "axios";
import { NextResponse } from "next/server";

const urlBase = process.env.NEXT_PUBLIC_API_URL || "https://api.ejemplo.com";

export class AccesService {
  private url = `${urlBase}/access/pharma-guide/login`;

  async login(credentials: { username: string; password: string }) {
    try {
      const response = await axios.post(this.url, credentials);

      if (response.status === 200) {
        const token = response.data;
        if (!token) {
          throw new Error("Token no recibido");
        }

        await fetch("/api/set-cookie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        return true;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al iniciar sesión.");
    }
  }
  async logout() {
    try {
      const response = await fetch("/api/remove-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/login";
        return true;
      } else {
        throw new Error("Error al cerrar sesión.");
      }
    } catch (error: any) {
      throw new Error(error?.message || "Error al cerrar sesión.");
    }
  }
}
