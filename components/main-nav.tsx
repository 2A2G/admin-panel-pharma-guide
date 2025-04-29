"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  PillIcon as FileText,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import isotipo from "../app/img/isotipo_.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AccesService } from "@/app/backend/access/acces";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const items: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Medicamentos",
    href: "/dashboard/medicamentos",
    icon: <Image src={isotipo} alt="Isotipo" className="h-5 w-5" />,
  },
  {
    title: "Categorías",
    href: "/dashboard/categorias",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Usuarios",
    href: "/dashboard/usuarios",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Contenido",
    href: "/dashboard/contenido",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Estadísticas",
    href: "/dashboard/estadisticas",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Configuración",
    href: "/dashboard/configuracion",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function MainNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const accesService = new AccesService();
      await accesService.logout();
      document.cookie = "auth_token=; path=/; max-age=0";
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center h-14 px-4 border-b">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                <Image
                  src={isotipo}
                  alt="Isotipo"
                  className="h-5 w-5 text-green-600"
                />
                <span className="text-green-700">PharmaGuide</span>
              </Link>
            </div>
            <nav className="flex-1 overflow-auto py-4">
              <ul className="grid gap-1 px-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                        pathname === item.href
                          ? "bg-green-100 text-green-700"
                          : "hover:bg-muted"
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t p-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex h-full w-[240px] flex-col fixed inset-y-0 z-10">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Image
              src={isotipo}
              alt="Isotipo"
              className="h-5 w-5 text-green-600"
            />
            <span className="text-green-700">PharmaGuide</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid gap-1 px-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-green-100 text-green-700"
                      : "hover:bg-muted"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t p-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </>
  );
}
