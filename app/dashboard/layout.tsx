import type React from "react"
import { MainNav } from "@/components/main-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="lg:pl-[240px]">
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
