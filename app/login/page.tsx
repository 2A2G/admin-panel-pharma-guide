"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PillIcon as Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import isotipo from "../img/isotipo_.png";
import { AccesService } from "@/app/backend/access/acces";
import LoadingCircles from "@/components/ui/loading";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const accesService = new AccesService();
    try {
      const isAuthenticated = await accesService.login({ username, password });

      if (isAuthenticated) {
        document.cookie = "auth_token=authenticated; path=/; max-age=86400";
        router.push("/dashboard");
      } else {
        setError("Credenciales inválidas. Intente nuevamente.");
      }
    } catch (err: any) {
      setError("Error al iniciar sesión. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="flex flex-col items-center">
          <LoadingCircles />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src={isotipo}
              alt="PharmaGuide Logo"
              className="h-20 w-20 object-contain"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">
            PharmaGuide
          </CardTitle>
          <CardDescription>Panel Administrativo</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  placeholder="Ingrese su usuario"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground flex flex-col gap-1">
          <span>
            PharmaGuide © {new Date().getFullYear()} - Todos los derechos
            reservados
          </span>
          <span className="text-xs">
            By{" "}
            <span className="font-medium text-green-700">
              Aldair Gutierrez Guerrero
            </span>{" "}
            ·{" "}
            <a
              href="https://github.com/2A2G"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-800"
            >
              GitHub: 2A2G
            </a>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
