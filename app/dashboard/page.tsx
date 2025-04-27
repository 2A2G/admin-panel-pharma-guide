import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, BarChart3, PillIcon as Capsule, Clock, FileText, Package, Pill, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido al panel administrativo de PharmaGuide.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medicamentos</CardTitle>
            <Capsule className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12 en la última semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 en el último mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,856</div>
            <p className="text-xs text-muted-foreground">+248 en el último mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artículos</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+8 en la última semana</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Medicamentos Populares</CardTitle>
                <CardDescription>Los medicamentos más buscados este mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Paracetamol", views: 1240, icon: <Pill className="h-4 w-4" /> },
                    { name: "Ibuprofeno", views: 980, icon: <Pill className="h-4 w-4" /> },
                    { name: "Amoxicilina", views: 750, icon: <Pill className="h-4 w-4" /> },
                    { name: "Loratadina", views: 620, icon: <Pill className="h-4 w-4" /> },
                    { name: "Omeprazol", views: 540, icon: <Pill className="h-4 w-4" /> },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Activity className="h-3 w-3" />
                        {item.views}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Categorías Populares</CardTitle>
                <CardDescription>Las categorías más visitadas este mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Analgésicos", views: 3240, icon: <Package className="h-4 w-4" /> },
                    { name: "Antibióticos", views: 2180, icon: <Package className="h-4 w-4" /> },
                    { name: "Antialérgicos", views: 1950, icon: <Package className="h-4 w-4" /> },
                    { name: "Antiinflamatorios", views: 1720, icon: <Package className="h-4 w-4" /> },
                    { name: "Antiácidos", views: 1540, icon: <Package className="h-4 w-4" /> },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Activity className="h-3 w-3" />
                        {item.views}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas actualizaciones en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Nuevo medicamento añadido",
                      time: "Hace 2 horas",
                      icon: <Capsule className="h-4 w-4" />,
                    },
                    {
                      action: "Actualización de categoría",
                      time: "Hace 4 horas",
                      icon: <Package className="h-4 w-4" />,
                    },
                    {
                      action: "Nuevo artículo publicado",
                      time: "Hace 6 horas",
                      icon: <FileText className="h-4 w-4" />,
                    },
                    {
                      action: "Nuevo usuario registrado",
                      time: "Hace 12 horas",
                      icon: <Users className="h-4 w-4" />,
                    },
                    {
                      action: "Actualización de medicamento",
                      time: "Hace 1 día",
                      icon: <Capsule className="h-4 w-4" />,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{item.icon}</div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{item.action}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Estadísticas de Uso</CardTitle>
                <CardDescription>Actividad de usuarios en los últimos 30 días</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BarChart3 className="h-5 w-5" />
                  <span>Gráfico de estadísticas de uso</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analíticas Detalladas</CardTitle>
              <CardDescription>Análisis detallado del uso de la aplicación</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BarChart3 className="h-5 w-5" />
                <span>Contenido de analíticas detalladas</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes</CardTitle>
              <CardDescription>Reportes generados del sistema</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-5 w-5" />
                <span>Contenido de reportes</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
