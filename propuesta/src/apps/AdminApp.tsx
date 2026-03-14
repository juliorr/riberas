import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lock, LayoutDashboard, Map, FileText, RefreshCw, Bell, Users,
  Eye, Upload, Trash2, Edit3, Search, Filter, ChevronRight, ChevronDown,
  BarChart3, TrendingUp, Globe, Settings, LogOut, Plus, Download,
  Layers, CheckCircle2, AlertTriangle, Clock, Database, ArrowUpDown,
  Wifi, WifiOff, Image, Calendar, Activity, PieChart, User
} from "lucide-react";
import logoCircle from "../assets/logo-circle.png";

const GOLD = "#B8860B";
const NAVY = "#1B2A4A";

// Desktop screen wrapper
function Screen({ children, label, id }: { children: React.ReactNode; label: string; id: string }) {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      <div className="w-[820px] min-w-[820px] h-[540px] rounded-xl border border-[#E8E0D4] overflow-hidden bg-white"
        style={{
          boxShadow: '0 0 0 1px rgba(0,0,0,0.03), 0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 40px -8px rgba(0,0,0,0.08), 0 40px 80px -20px rgba(0,0,0,0.06)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.03), 0 8px 12px -2px rgba(0,0,0,0.05), 0 28px 48px -8px rgba(0,0,0,0.1), 0 48px 88px -20px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.03), 0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 40px -8px rgba(0,0,0,0.08), 0 40px 80px -20px rgba(0,0,0,0.06)';
        }}
      >
        {children}
      </div>
      <span className="screen-id">{id}</span>
      <p className="screen-name max-w-[600px]">{label}</p>
    </div>
  );
}

// Sidebar component
function Sidebar({ active = "dashboard", onNavigate }: { active?: string; onNavigate: (id: string) => void }) {
  const items = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", target: "A-02" },
    { id: "gis", icon: Map, label: "GIS Manager", target: "A-03" },
    { id: "storage", icon: FileText, label: "Storage PDFs", target: "A-06" },
    { id: "sync", icon: RefreshCw, label: "Sync Ops", target: "A-07" },
    { id: "alerts", icon: Bell, label: "Notificaciones", target: "A-10" },
    { id: "users", icon: Users, label: "Usuarios", target: "A-11" },
  ];
  return (
    <div className="w-48 h-full flex flex-col border-r" style={{ backgroundColor: NAVY }}>
      <div className="px-4 py-3 flex items-center gap-2">
        <img src={logoCircle} alt="LR" className="w-7 h-7 rounded-full" />
        <div>
          <p className="text-white text-xs font-semibold">Las Riberas</p>
          <p className="text-white/40 text-[9px]">Panel Admin</p>
        </div>
      </div>
      <div className="flex-1 py-2 space-y-0.5 px-2">
        {items.map(item => (
          <button key={item.id} onClick={() => onNavigate(item.target)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs transition ${
            active === item.id ? "bg-white/15 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/5"
          }`}>
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </button>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-3 h-3 text-white/60" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[10px] font-medium truncate">Admin Principal</p>
            <p className="text-white/40 text-[9px]">Super Admin</p>
          </div>
          <LogOut className="w-3 h-3 text-white/40 cursor-pointer hover:text-white/80 transition" onClick={() => onNavigate("A-01")} />
        </div>
      </div>
    </div>
  );
}

// Topbar
function Topbar({ title }: { title: string }) {
  return (
    <div className="h-10 border-b flex items-center justify-between px-4">
      <h1 className="text-sm font-semibold" style={{ color: NAVY }}>{title}</h1>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Bell className="w-4 h-4 text-gray-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 text-white text-[7px] flex items-center justify-center">3</div>
        </div>
        <Settings className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}

// A-01: Login
function LoginScreen({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <Screen label="Login — Autenticación MFA" id="A-01">
      <div className="h-full flex">
        {/* Left panel */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center p-8" style={{ backgroundColor: NAVY }}>
          <img src={logoCircle} alt="Las Riberas" className="w-16 h-16 rounded-full mb-4" />
          <h1 className="text-white text-xl font-light tracking-[0.3em] mb-1">LAS RIBERAS</h1>
          <p className="text-white/40 text-xs tracking-wider">Panel de Administración</p>
        </div>
        {/* Right panel */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center p-8 bg-white">
          <div className="w-full max-w-64">
            <h2 className="text-lg font-semibold mb-1" style={{ color: NAVY }}>Iniciar Sesión</h2>
            <p className="text-xs text-gray-500 mb-5">Ingresa tus credenciales para continuar</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-500 font-medium block mb-1">Email</label>
                <div className="border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-400">admin@lasriberas.mx</div>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-medium block mb-1">Contraseña</label>
                <div className="border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-400 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> ••••••••
                </div>
              </div>
              <Button className="w-full h-9 text-xs font-medium" style={{ backgroundColor: GOLD }} onClick={() => onNavigate("A-02")}>Ingresar</Button>
              <div className="text-center">
                <p className="text-[10px] text-gray-400">Autenticación de dos factores habilitada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// A-02: Dashboard
function DashboardScreen({ onNavigate }: { onNavigate: (id: string) => void }) {
  const stats = [
    { label: "Lotes Disponibles", value: "24", change: "-2", icon: Map, color: "emerald" },
    { label: "Cotizaciones Hoy", value: "8", change: "+3", icon: FileText, color: "blue" },
    { label: "Visitas Kiosko", value: "142", change: "+18%", icon: Eye, color: "purple" },
    { label: "Sync Status", value: "OK", change: "Hace 5m", icon: RefreshCw, color: "amber" },
  ];
  return (
    <Screen label="Dashboard — KPIs y actividad reciente" id="A-02">
      <div className="h-full flex">
        <Sidebar active="dashboard" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Topbar title="Dashboard" />
          <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {stats.map((s, i) => (
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${s.color}-100`}>
                        <s.icon className={`w-4 h-4 text-${s.color}-600`} />
                      </div>
                      <Badge variant="outline" className="text-[9px]">{s.change}</Badge>
                    </div>
                    <p className="text-lg font-bold" style={{ color: NAVY }}>{s.value}</p>
                    <p className="text-[10px] text-gray-500">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Charts row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2 pt-3 px-3">
                  <CardTitle className="text-xs font-semibold flex items-center gap-1" style={{ color: NAVY }}>
                    <BarChart3 className="w-3.5 h-3.5" /> Cotizaciones (7 días)
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3">
                  <div className="flex items-end gap-1.5 h-20">
                    {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: i === 5 ? GOLD : GOLD + "40" }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
                      <span key={i} className="text-[8px] text-gray-400 flex-1 text-center">{d}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2 pt-3 px-3">
                  <CardTitle className="text-xs font-semibold flex items-center gap-1" style={{ color: NAVY }}>
                    <PieChart className="w-3.5 h-3.5" /> Inventario por Estatus
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full border-[8px] border-emerald-500 relative">
                    <div className="absolute inset-0 rounded-full border-[8px] border-transparent border-t-amber-500 border-r-amber-500" style={{ transform: "rotate(20deg)" }} />
                    <div className="absolute inset-0 rounded-full border-[8px] border-transparent border-t-red-400" style={{ transform: "rotate(280deg)" }} />
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { color: "bg-emerald-500", label: "Disponible", val: "24 (50%)" },
                      { color: "bg-amber-500", label: "Apartado", val: "14 (29%)" },
                      { color: "bg-red-400", label: "Vendido", val: "10 (21%)" },
                    ].map((l, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${l.color}`} />
                        <span className="text-[10px] text-gray-600">{l.label}</span>
                        <span className="text-[10px] font-semibold">{l.val}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Recent activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 pt-3 px-3">
                <CardTitle className="text-xs font-semibold" style={{ color: NAVY }}>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="space-y-2">
                  {[
                    { icon: FileText, text: "Nueva cotización COT-2026-0847 — Lote A-12", time: "Hace 5 min", color: "blue" },
                    { icon: RefreshCw, text: "Sync HubSpot completado — 3 deals actualizados", time: "Hace 15 min", color: "emerald" },
                    { icon: Upload, text: "Capa GIS 'Topografía v2' subida por Admin", time: "Hace 1h", color: "purple" },
                    { icon: AlertTriangle, text: "Kiosko Modelo — offline hace 35 min", time: "Hace 35 min", color: "amber" },
                  ].map((a, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5">
                      <div className={`w-6 h-6 rounded-full bg-${a.color}-100 flex items-center justify-center`}>
                        <a.icon className={`w-3 h-3 text-${a.color}-600`} />
                      </div>
                      <p className="text-[10px] text-gray-700 flex-1">{a.text}</p>
                      <span className="text-[9px] text-gray-400">{a.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// A-03: GIS Manager — Listado
function GISList({ onNavigate }: { onNavigate: (id: string) => void }) {
  const layers = [
    { name: "Lotes Residenciales", format: "SHP", size: "2.4 MB", date: "12 Mar", status: "active" },
    { name: "Topografía v2", format: "KMZ", size: "8.1 MB", date: "11 Mar", status: "active" },
    { name: "Áreas Verdes", format: "KML", size: "1.2 MB", date: "10 Mar", status: "active" },
    { name: "Infraestructura", format: "SHP", size: "3.7 MB", date: "08 Mar", status: "draft" },
    { name: "Vialidades", format: "SHP", size: "1.8 MB", date: "05 Mar", status: "active" },
  ];
  return (
    <Screen label="GIS Manager — Listado de capas" id="A-03">
      <div className="h-full flex">
        <Sidebar active="gis" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Topbar title="GIS Manager" />
          <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white border rounded-md px-2.5 py-1.5">
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">Buscar capas...</span>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                  <Filter className="w-3 h-3" /> Filtrar
                </Button>
              </div>
              <Button size="sm" className="h-8 text-xs gap-1" style={{ backgroundColor: GOLD }} onClick={() => onNavigate("A-04")}>
                <Upload className="w-3 h-3" /> Subir Capa
              </Button>
            </div>
            <Card className="border-0 shadow-sm">
              <div className="overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-2.5 text-gray-500 font-medium">Nombre</th>
                      <th className="text-left p-2.5 text-gray-500 font-medium">Formato</th>
                      <th className="text-left p-2.5 text-gray-500 font-medium">Tamaño</th>
                      <th className="text-left p-2.5 text-gray-500 font-medium">Fecha</th>
                      <th className="text-left p-2.5 text-gray-500 font-medium">Estatus</th>
                      <th className="text-right p-2.5 text-gray-500 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {layers.map((l, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-gray-50/50">
                        <td className="p-2.5 font-medium" style={{ color: NAVY }}>
                          <div className="flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5" style={{ color: GOLD }} />
                            {l.name}
                          </div>
                        </td>
                        <td className="p-2.5"><Badge variant="outline" className="text-[9px]">{l.format}</Badge></td>
                        <td className="p-2.5 text-gray-500">{l.size}</td>
                        <td className="p-2.5 text-gray-500">{l.date}</td>
                        <td className="p-2.5">
                          <Badge className={`text-[9px] border-0 ${l.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                            {l.status === "active" ? "Activa" : "Borrador"}
                          </Badge>
                        </td>
                        <td className="p-2.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => onNavigate("A-05")}><Eye className="w-3 h-3 text-gray-400" /></Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Edit3 className="w-3 h-3 text-gray-400" /></Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Trash2 className="w-3 h-3 text-red-400" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// A-04: GIS Upload
function GISUpload({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <Screen label="GIS — Subida y validación de capa" id="A-04">
      <div className="h-full flex">
        <Sidebar active="gis" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Topbar title="Subir Capa GIS" />
          <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
            <div className="grid grid-cols-2 gap-4">
              {/* Upload zone */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2 pt-3 px-3">
                  <CardTitle className="text-xs font-semibold" style={{ color: NAVY }}>Archivo</CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#B8860B]/40 transition">
                    <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Arrastra tu archivo aquí</p>
                    <p className="text-[10px] text-gray-400">SHP, KMZ, KML — Max 50 MB</p>
                    <Button variant="outline" size="sm" className="mt-3 h-7 text-[10px]">Seleccionar Archivo</Button>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div>
                      <label className="text-[10px] text-gray-500 font-medium block mb-1">Nombre de la capa</label>
                      <div className="border rounded-md px-2.5 py-1.5 text-xs text-gray-400">Topografía v3</div>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 font-medium block mb-1">Proyección</label>
                      <div className="border rounded-md px-2.5 py-1.5 text-xs text-gray-600 flex items-center justify-between">
                        WGS 84 (EPSG:4326) <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Validation results */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2 pt-3 px-3">
                  <CardTitle className="text-xs font-semibold" style={{ color: NAVY }}>Validación</CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3">
                  <div className="space-y-2">
                    {[
                      { label: "Formato válido", status: "ok", detail: "Shapefile (SHP + DBF + SHX)" },
                      { label: "Proyección", status: "ok", detail: "WGS 84 detectado automáticamente" },
                      { label: "Geometrías válidas", status: "ok", detail: "48 polígonos — sin errores" },
                      { label: "Campos requeridos", status: "warn", detail: "Campo 'precio' no encontrado" },
                      { label: "Tamaño", status: "ok", detail: "3.2 MB — dentro del límite" },
                    ].map((v, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded bg-gray-50">
                        {v.status === "ok" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-[10px] font-medium text-gray-700">{v.label}</p>
                          <p className="text-[9px] text-gray-500">{v.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full h-8 text-xs mt-3" style={{ backgroundColor: GOLD }}>
                    Publicar Capa
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// A-05: GIS Preview
function GISPreview({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <Screen label="GIS — Vista previa de capa" id="A-05">
      <div className="h-full flex">
        <Sidebar active="gis" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Topbar title="Vista Previa — Lotes Residenciales" />
          <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
            <div className="grid grid-cols-3 gap-4 h-full">
              {/* Map preview */}
              <div className="col-span-2 bg-gradient-to-br from-green-100 via-green-50 to-blue-50 rounded-lg border relative overflow-hidden">
                <div className="absolute inset-0 opacity-15">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute border-b border-gray-400" style={{ top: `${(i + 1) * 15}%`, left: 0, right: 0 }} />
                  ))}
                </div>
                {/* Polygons */}
                {[
                  { x: "15%", y: "20%", w: "120px", h: "80px" },
                  { x: "45%", y: "15%", w: "100px", h: "90px" },
                  { x: "25%", y: "50%", w: "130px", h: "70px" },
                  { x: "60%", y: "40%", w: "110px", h: "85px" },
                ].map((p, i) => (
                  <div key={i} className="absolute border-2 border-[#B8860B] bg-[#B8860B]/10 rounded" style={{ left: p.x, top: p.y, width: p.w, height: p.h }} />
                ))}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded px-2 py-1">
                  <p className="text-[9px] text-gray-500">48 polígonos • WGS 84</p>
                </div>
              </div>
              {/* Attributes */}
              <Card className="border-0 shadow-sm overflow-auto">
                <CardHeader className="pb-2 pt-3 px-3">
                  <CardTitle className="text-xs font-semibold" style={{ color: NAVY }}>Atributos</CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3">
                  <div className="space-y-1.5">
                    {[
                      { field: "id_lote", type: "string", sample: "A-12" },
                      { field: "seccion", type: "string", sample: "Río" },
                      { field: "area_m2", type: "float", sample: "450.0" },
                      { field: "frente_m", type: "float", sample: "15.0" },
                      { field: "fondo_m", type: "float", sample: "30.0" },
                      { field: "estatus", type: "string", sample: "disponible" },
                      { field: "etapa", type: "int", sample: "1" },
                    ].map((a, i) => (
                      <div key={i} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="text-[10px] font-mono font-medium" style={{ color: NAVY }}>{a.field}</p>
                          <p className="text-[8px] text-gray-400">{a.type}</p>
                        </div>
                        <Badge variant="outline" className="text-[9px] font-mono">{a.sample}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// A-06: Storage Manager — PDFs
function StoragePDFs({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <Screen label="Storage — PDFs de modelos inmobiliarios" id="A-06">
      <div className="h-full flex">
        <Sidebar active="storage" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Topbar title="Storage — PDFs de Modelos" />
          <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white border rounded-md px-2.5 py-1.5">
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">Buscar PDF...</span>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                  <Filter className="w-3 h-3" /> Filtrar
                </Button>
              </div>
              <Button size="sm" className="h-8 text-xs gap-1" style={{ backgroundColor: GOLD }}>
                <Upload className="w-3 h-3" /> Subir PDF
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Modelo Río A — Planta Baja", lote: "Sección Río", size: "3.8 MB", date: "12 Mar", downloads: 24 },
                { name: "Modelo Río A — Planta Alta", lote: "Sección Río", size: "3.2 MB", date: "12 Mar", downloads: 18 },
                { name: "Modelo Bosque B", lote: "Sección Bosque", size: "4.1 MB", date: "10 Mar", downloads: 31 },
                { name: "Modelo Club C — Premium", lote: "Sección Club", size: "5.6 MB", date: "08 Mar", downloads: 42 },
                { name: "Modelo Lago D", lote: "Sección Lago", size: "3.4 MB", date: "05 Mar", downloads: 15 },
                { name: "Ficha Técnica General", lote: "Todas las secciones", size: "2.1 MB", date: "01 Mar", downloads: 67 },
              ].map((p, i) => (
                <Card key={i} className="border-0 shadow-sm overflow-hidden">
                  <div className="h-24 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-red-400 mx-auto" />
                      <p className="text-[8px] text-red-400 mt-1">PDF</p>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-[11px] font-semibold truncate" style={{ color: NAVY }}>{p.name}</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">{p.lote} • {p.size}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[9px] text-gray-400">{p.date} • {p.downloads} descargas</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Download className="w-3 h-3 text-gray-400" /></Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Trash2 className="w-3 h-3 text-red-400" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// Sync sub-tabs
function SyncTabs({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", target: "A-07" },
    { id: "mapping", label: "Mapeo", target: "A-08" },
    { id: "devices", label: "Dispositivos", target: "A-09" },
  ];
  return (
    <div className="flex gap-2 mb-3">
      {tabs.map(t => (
        <Badge
          key={t.id}
          className={`text-[10px] cursor-pointer ${t.id === active ? "" : "bg-transparent border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
          style={t.id === active ? { backgroundColor: NAVY } : {}}
          onClick={() => onNavigate(t.target)}
        >
          {t.label}
        </Badge>
      ))}
    </div>
  );
}

// A-07: Sync — Dashboard
function SyncDashboard({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <Screen label="Sync Ops — Estado de sincronización" id="A-07">
      <div className="h-full flex">
        <Sidebar active="sync" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Topbar title="Sync Operations" />
          <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
            <SyncTabs active="dashboard" onNavigate={onNavigate} />
            {/* Sync status cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "HubSpot → Admin", status: "ok", lastSync: "Hace 5 min", deals: 48, icon: Globe },
                { label: "Admin → Kiosko", status: "warn", lastSync: "Hace 35 min", deals: 10, icon: Database },
              ].map((s, i) => (
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <s.icon className="w-4 h-4" style={{ color: GOLD }} />
                      <p className="text-xs font-semibold" style={{ color: NAVY }}>{s.label}</p>
                    </div>
                    <div className="flex items-center gap-1.5 mb-1">
                      {s.status === "ok" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      )}
                      <span className={`text-[10px] ${s.status === "ok" ? "text-emerald-600" : "text-amber-600"}`}>
                        {s.status === "ok" ? "Sincronizado" : "Pendiente"}
                      </span>
                    </div>
                    <p className="text-[9px] text-gray-400">{s.lastSync} • {s.deals} registros</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Sync log */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 pt-3 px-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-semibold" style={{ color: NAVY }}>Log de Sincronización</CardTitle>
                  <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1">
                    <RefreshCw className="w-3 h-3" /> Forzar Sync
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="space-y-1.5">
                  {[
                    { time: "14:32", action: "PUSH", detail: "Delta sync → 3 deals actualizados en Kiosko", status: "ok" },
                    { time: "14:30", action: "PULL", detail: "Snapshot recibido de HubSpot — 48 deals", status: "ok" },
                    { time: "14:15", action: "PUSH", detail: "Cotización COT-0847 → HubSpot", status: "ok" },
                    { time: "14:00", action: "PUSH", detail: "Delta sync → Kiosko (timeout)", status: "err" },
                    { time: "13:45", action: "PULL", detail: "Webhook HubSpot — deal A-12 actualizado", status: "ok" },
                    { time: "13:30", action: "PUSH", detail: "Snapshot completo → Kiosko", status: "ok" },
                  ].map((l, i) => (
                    <div key={i} className="flex items-center gap-2 py-1 text-[10px] border-b border-gray-50 last:border-0">
                      <span className="text-gray-400 font-mono w-10">{l.time}</span>
                      <Badge variant="outline" className={`text-[8px] w-10 justify-center ${
                        l.action === "PULL" ? "border-blue-300 text-blue-600" : "border-emerald-300 text-emerald-600"
                      }`}>{l.action}</Badge>
                      <span className="flex-1 text-gray-600">{l.detail}</span>
                      {l.status === "ok" ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// A-08: Sync — HubSpot Mapping
function SyncMapping({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <Screen label="Sync — Mapeo de campos HubSpot" id="A-08">
      <div className="h-full flex">
        <Sidebar active="sync" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Topbar title="Mapeo de Campos — HubSpot" />
          <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
            <SyncTabs active="mapping" onNavigate={onNavigate} />
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-2.5 text-gray-500 font-medium">Campo Local</th>
                      <th className="text-center p-2.5 text-gray-500 font-medium">→</th>
                      <th className="text-left p-2.5 text-gray-500 font-medium">Campo HubSpot</th>
                      <th className="text-left p-2.5 text-gray-500 font-medium">Tipo</th>
                      <th className="text-center p-2.5 text-gray-500 font-medium">Sync</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { local: "id_lote", hs: "dealname", type: "string", sync: "bi" },
                      { local: "estatus", hs: "dealstage", type: "enum", sync: "bi" },
                      { local: "precio", hs: "amount", type: "number", sync: "pull" },
                      { local: "area_m2", hs: "hs_lot_area", type: "number", sync: "pull" },
                      { local: "seccion", hs: "hs_lot_section", type: "string", sync: "pull" },
                      { local: "contacto", hs: "associated_contact", type: "ref", sync: "push" },
                      { local: "cotizacion_id", hs: "hs_quote_id", type: "string", sync: "push" },
                      { local: "fecha_visita", hs: "hs_last_visit", type: "date", sync: "push" },
                    ].map((m, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-gray-50/50">
                        <td className="p-2.5 font-mono" style={{ color: NAVY }}>{m.local}</td>
                        <td className="p-2.5 text-center text-gray-300">→</td>
                        <td className="p-2.5 font-mono text-gray-600">{m.hs}</td>
                        <td className="p-2.5"><Badge variant="outline" className="text-[9px]">{m.type}</Badge></td>
                        <td className="p-2.5 text-center">
                          <Badge className={`text-[9px] border-0 ${
                            m.sync === "bi" ? "bg-purple-100 text-purple-700" :
                            m.sync === "pull" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                          }`}>
                            {m.sync === "bi" ? "↔ Bi" : m.sync === "pull" ? "← Pull" : "→ Push"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// A-09: Sync — Device Status
function SyncDevices({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <Screen label="Sync — Estado de dispositivos" id="A-09">
      <div className="h-full flex">
        <Sidebar active="sync" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Topbar title="Dispositivos Conectados" />
          <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
            <SyncTabs active="devices" onNavigate={onNavigate} />
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Kiosko Entrada", type: "Kiosko", status: "online", lastPing: "Hace 3 min", version: "1.1.5", cache: "95%" },
                { name: "Kiosko Sala Ventas", type: "Kiosko", status: "online", lastPing: "Hace 1 min", version: "1.1.5", cache: "88%" },
                { name: "Kiosko Modelo", type: "Kiosko", status: "offline", lastPing: "Hace 35 min", version: "1.1.4", cache: "78%" },
                { name: "Kiosko Pool", type: "Kiosko", status: "online", lastPing: "Hace 1 min", version: "1.1.5", cache: "96%" },
                { name: "Kiosko Casa Club", type: "Kiosko", status: "online", lastPing: "Hace 5 min", version: "1.1.5", cache: "90%" },
              ].map((d, i) => (
                <Card key={i} className={`border-0 shadow-sm ${d.status === "offline" ? "ring-1 ring-red-200" : ""}`}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${d.status === "online" ? "bg-emerald-500" : "bg-red-500"}`} />
                        <p className="text-xs font-semibold" style={{ color: NAVY }}>{d.name}</p>
                      </div>
                      <Badge variant="outline" className="text-[9px]">{d.type}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Último ping", value: d.lastPing },
                        { label: "Versión", value: d.version },
                        { label: "Caché", value: d.cache },
                        { label: "Estado", value: d.status === "online" ? "En línea" : "Sin conexión" },
                      ].map((s, j) => (
                        <div key={j}>
                          <p className="text-[9px] text-gray-400">{s.label}</p>
                          <p className="text-[10px] font-medium">{s.value}</p>
                        </div>
                      ))}
                    </div>
                    {d.status === "offline" && (
                      <div className="mt-2 p-1.5 bg-red-50 rounded flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        <p className="text-[9px] text-red-600">Dispositivo sin conexión — verificar red</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// A-10: Notificaciones
function NotificationsScreen({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <Screen label="Notificaciones — Centro de alertas" id="A-10">
      <div className="h-full flex">
        <Sidebar active="alerts" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Topbar title="Notificaciones" />
          <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="text-[10px]" style={{ backgroundColor: NAVY }}>Todas (12)</Badge>
              <Badge variant="outline" className="text-[10px] text-gray-500">Alertas (3)</Badge>
              <Badge variant="outline" className="text-[10px] text-gray-500">Info (9)</Badge>
            </div>
            <div className="space-y-2">
              {[
                { title: "Dispositivo offline", desc: "Kiosko Modelo sin conexión hace 35 min", time: "Hace 35 min", type: "alert", read: false },
                { title: "Nueva cotización", desc: "COT-2026-0847 — Lote A-12 por Juan Pérez", time: "Hace 1h", type: "info", read: false },
                { title: "Sync completado", desc: "HubSpot snapshot — 48 deals sincronizados", time: "Hace 2h", type: "success", read: false },
                { title: "Capa GIS actualizada", desc: "Topografía v2 publicada exitosamente", time: "Hace 3h", type: "info", read: true },
                { title: "PDF sin vincular", desc: "Modelo Lago D — sin lote asignado", time: "Hace 5h", type: "alert", read: true },
                { title: "Nuevo usuario", desc: "vendedor@lasriberas.mx agregado como Vendedor", time: "Ayer", type: "info", read: true },
                { title: "Backup completado", desc: "Respaldo automático de base de datos", time: "Ayer", type: "success", read: true },
              ].map((n, i) => (
                <Card key={i} className={`border-0 shadow-sm ${!n.read ? "ring-1 ring-[#B8860B]/20 bg-[#B8860B]/[0.02]" : ""}`}>
                  <CardContent className="p-3 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                      n.type === "alert" ? "bg-red-100" : n.type === "success" ? "bg-emerald-100" : "bg-blue-100"
                    }`}>
                      {n.type === "alert" ? <AlertTriangle className="w-4 h-4 text-red-600" /> :
                       n.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> :
                       <Bell className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs ${!n.read ? "font-semibold" : "font-medium text-gray-600"}`} style={!n.read ? { color: NAVY } : {}}>
                          {n.title}
                        </p>
                        <span className="text-[9px] text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">{n.desc}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ backgroundColor: GOLD }} />}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// A-11: Gestión de Usuarios
function UsersScreen({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <Screen label="Usuarios — Roles y permisos" id="A-11">
      <div className="h-full flex">
        <Sidebar active="users" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Topbar title="Gestión de Usuarios" />
          <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white border rounded-md px-2.5 py-1.5">
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">Buscar usuario...</span>
                </div>
              </div>
              <Button size="sm" className="h-8 text-xs gap-1" style={{ backgroundColor: GOLD }}>
                <Plus className="w-3 h-3" /> Agregar Usuario
              </Button>
            </div>
            <Card className="border-0 shadow-sm">
              <div className="overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-2.5 text-gray-500 font-medium">Usuario</th>
                      <th className="text-left p-2.5 text-gray-500 font-medium">Email</th>
                      <th className="text-left p-2.5 text-gray-500 font-medium">Rol</th>
                      <th className="text-left p-2.5 text-gray-500 font-medium">Último acceso</th>
                      <th className="text-center p-2.5 text-gray-500 font-medium">Estado</th>
                      <th className="text-right p-2.5 text-gray-500 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Admin Principal", email: "admin@lasriberas.mx", role: "Super Admin", last: "Hoy 14:30", active: true },
                      { name: "María García", email: "maria@lasriberas.mx", role: "GIS Manager", last: "Hoy 12:15", active: true },
                      { name: "Carlos López", email: "carlos@lasriberas.mx", role: "GIS Manager", last: "Ayer", active: true },
                      { name: "Ana Rodríguez", email: "ana@lasriberas.mx", role: "Vendedor", last: "Hoy 10:30", active: true },
                      { name: "Pedro Martínez", email: "pedro@lasriberas.mx", role: "Vendedor", last: "Hace 3 días", active: false },
                    ].map((u, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-gray-50/50">
                        <td className="p-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                            <span className="font-medium" style={{ color: NAVY }}>{u.name}</span>
                          </div>
                        </td>
                        <td className="p-2.5 text-gray-500">{u.email}</td>
                        <td className="p-2.5">
                          <Badge variant="outline" className={`text-[9px] ${
                            u.role === "Super Admin" ? "border-purple-300 text-purple-700" :
                            u.role.includes("Manager") ? "border-blue-300 text-blue-700" : "border-gray-300 text-gray-600"
                          }`}>{u.role}</Badge>
                        </td>
                        <td className="p-2.5 text-gray-500">{u.last}</td>
                        <td className="p-2.5 text-center">
                          <div className={`w-2 h-2 rounded-full mx-auto ${u.active ? "bg-emerald-500" : "bg-gray-300"}`} />
                        </td>
                        <td className="p-2.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Edit3 className="w-3 h-3 text-gray-400" /></Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Trash2 className="w-3 h-3 text-red-400" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Screen>
  );
}

const screens = [
  { id: "A-01", label: "Login" },
  { id: "A-02", label: "Dashboard" },
  { id: "A-03", label: "GIS List" },
  { id: "A-04", label: "GIS Upload" },
  { id: "A-05", label: "GIS Preview" },
  { id: "A-06", label: "PDFs" },
  { id: "A-07", label: "Sync" },
  { id: "A-08", label: "Mapeo" },
  { id: "A-09", label: "Devices" },
  { id: "A-10", label: "Alertas" },
  { id: "A-11", label: "Usuarios" },
];

// Main export
export function AdminApp() {
  const [screen, setScreen] = useState("A-01");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="screen-fade" key={screen}>
        {screen === "A-01" && <LoginScreen onNavigate={setScreen} />}
        {screen === "A-02" && <DashboardScreen onNavigate={setScreen} />}
        {screen === "A-03" && <GISList onNavigate={setScreen} />}
        {screen === "A-04" && <GISUpload onNavigate={setScreen} />}
        {screen === "A-05" && <GISPreview onNavigate={setScreen} />}
        {screen === "A-06" && <StoragePDFs onNavigate={setScreen} />}
        {screen === "A-07" && <SyncDashboard onNavigate={setScreen} />}
        {screen === "A-08" && <SyncMapping onNavigate={setScreen} />}
        {screen === "A-09" && <SyncDevices onNavigate={setScreen} />}
        {screen === "A-10" && <NotificationsScreen onNavigate={setScreen} />}
        {screen === "A-11" && <UsersScreen onNavigate={setScreen} />}
      </div>
      <div className="screen-strip">
        {screens.map(s => (
          <button
            key={s.id}
            onClick={() => setScreen(s.id)}
            className={`screen-strip-pill ${screen === s.id ? "active" : ""}`}
          >
            {s.id}
          </button>
        ))}
      </div>
    </div>
  );
}
