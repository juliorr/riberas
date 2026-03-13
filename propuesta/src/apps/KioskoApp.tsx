import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Map, Layers, MapPin, ChevronRight, FileText, Send, CheckCircle2,
  Filter, Search, Wifi, WifiOff, Star, Home, Menu, X, Download,
  Building2, Trees, Dumbbell, Waves, ChevronDown, User, Phone as PhoneIcon,
  Mail, DollarSign, Ruler, ArrowLeft, Eye, Clock, AlertTriangle
} from "lucide-react";

const GOLD = "#B8860B";
const NAVY = "#1B2A4A";

function Phone({ children, label, id }: { children: React.ReactNode; label: string; id: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-content bg-white">{children}</div>
      </div>
      <Badge variant="outline" className="text-xs font-mono">{id}</Badge>
      <p className="text-sm text-gray-600 font-medium text-center max-w-[300px]">{label}</p>
    </div>
  );
}

function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex justify-between items-center px-6 py-1 text-[10px] ${light ? "text-white" : "text-gray-800"}`}>
      <span className="font-semibold">9:41</span>
      <div className="flex gap-1 items-center">
        <Wifi className="w-3 h-3" />
        <div className="w-5 h-2.5 rounded-sm border border-current relative">
          <div className="absolute inset-0.5 bg-current rounded-[1px]" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  );
}

// K-01: Mapa Interactivo
function MapaInteractivo() {
  return (
    <Phone label="Mapa Interactivo — Vista aérea con lotes" id="K-01">
      <StatusBar />
      <div className="px-4 pt-2 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold" style={{ color: NAVY }}>Mapa del Desarrollo</h2>
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
            <Layers className="w-3 h-3" /> Capas
          </Button>
        </div>
      </div>
      {/* Map area */}
      <div className="mx-4 h-[400px] rounded-xl bg-gradient-to-br from-green-100 via-green-50 to-blue-50 relative overflow-hidden border border-gray-200">
        {/* Simulated map grid */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute border-b border-gray-400" style={{ top: `${(i + 1) * 12}%`, left: 0, right: 0 }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute border-r border-gray-400" style={{ left: `${(i + 1) * 16}%`, top: 0, bottom: 0 }} />
          ))}
        </div>
        {/* Lot markers */}
        {[
          { x: "25%", y: "30%", status: "green", n: "A-12" },
          { x: "55%", y: "25%", status: "green", n: "A-15" },
          { x: "40%", y: "55%", status: "gold", n: "B-03" },
          { x: "70%", y: "45%", status: "red", n: "B-07" },
          { x: "30%", y: "70%", status: "green", n: "C-01" },
          { x: "60%", y: "65%", status: "gold", n: "C-04" },
          { x: "80%", y: "30%", status: "green", n: "A-22" },
        ].map((lot, i) => (
          <div key={i} className="absolute flex flex-col items-center" style={{ left: lot.x, top: lot.y }}>
            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center ${
              lot.status === "green" ? "bg-emerald-500" : lot.status === "gold" ? "bg-amber-500" : "bg-red-500"
            }`}>
              <span className="text-[7px] text-white font-bold">{lot.n}</span>
            </div>
          </div>
        ))}
        {/* River */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-200/60 to-transparent" />
        <p className="absolute bottom-2 left-3 text-[9px] text-blue-600/60 font-medium">Río</p>
        {/* Legend */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-lg p-2 shadow-sm">
          <div className="flex flex-col gap-1">
            {[
              { color: "bg-emerald-500", label: "Disponible" },
              { color: "bg-amber-500", label: "Apartado" },
              { color: "bg-red-500", label: "Vendido" },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${l.color}`} />
                <span className="text-[8px] text-gray-600">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Compass */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-[10px] font-bold text-gray-500">N</div>
      </div>
      {/* Zoom controls */}
      <div className="flex justify-center gap-2 mt-3 mb-2">
        <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-xs">+</Button>
        <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-xs">−</Button>
      </div>
      {/* Bottom tab bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t py-2 px-6">
        <div className="flex justify-around">
          <div className="flex flex-col items-center gap-0.5">
            <Map className="w-4 h-4" style={{ color: GOLD }} />
            <span className="text-[9px] font-medium" style={{ color: GOLD }}>Mapa</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-[9px] text-gray-400">Buscar</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Star className="w-4 h-4 text-gray-400" />
            <span className="text-[9px] text-gray-400">Amenidades</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// K-02: Selector de Capas
function SelectorCapas() {
  const layers = [
    { name: "Lotes", icon: MapPin, active: true },
    { name: "Amenidades", icon: Star, active: true },
    { name: "Vialidades", icon: Building2, active: false },
    { name: "Áreas verdes", icon: Trees, active: true },
    { name: "Topografía", icon: Layers, active: false },
    { name: "Infraestructura", icon: Building2, active: false },
  ];
  return (
    <Phone label="Selector de Capas — Toggle GIS" id="K-02">
      <StatusBar />
      <div className="px-4 pt-2 pb-3 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4 text-gray-500" />
        <h2 className="text-sm font-semibold" style={{ color: NAVY }}>Capas del Mapa</h2>
      </div>
      <div className="px-4 space-y-2">
        {layers.map((l, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: l.active ? GOLD + "15" : "#f3f3f3" }}>
                <l.icon className="w-4 h-4" style={{ color: l.active ? GOLD : "#aaa" }} />
              </div>
              <span className={`text-sm ${l.active ? "font-medium text-gray-800" : "text-gray-400"}`}>{l.name}</span>
            </div>
            <div className={`w-10 h-5 rounded-full p-0.5 transition ${l.active ? "bg-[#B8860B]" : "bg-gray-300"}`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow transition ${l.active ? "translate-x-5" : ""}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 mt-4">
        <p className="text-[10px] text-gray-400 text-center">Las capas GIS se sincronizan desde el Panel Admin</p>
      </div>
    </Phone>
  );
}

// K-03: Popup Lote
function PopupLote() {
  return (
    <Phone label="Popup — Info rápida de lote" id="K-03">
      <StatusBar />
      {/* Map background */}
      <div className="h-[300px] bg-gradient-to-br from-green-100 via-green-50 to-blue-50 relative">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute border-b border-gray-400" style={{ top: `${(i + 1) * 20}%`, left: 0, right: 0 }} />
          ))}
        </div>
        {/* Selected lot marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 rounded-full bg-emerald-500 border-3 border-white shadow-lg flex items-center justify-center animate-pulse">
            <span className="text-[9px] text-white font-bold">A-12</span>
          </div>
        </div>
      </div>
      {/* Popup card */}
      <div className="mx-4 -mt-8 relative z-10">
        <Card className="p-4 shadow-lg border-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-sm" style={{ color: NAVY }}>Lote A-12</h3>
              <p className="text-[10px] text-gray-500">Sección Río — Etapa 1</p>
            </div>
            <Badge className="text-[9px] bg-emerald-100 text-emerald-700 border-0">Disponible</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-gray-50 rounded p-1.5 text-center">
              <p className="text-[9px] text-gray-500">Área</p>
              <p className="text-xs font-semibold">450 m²</p>
            </div>
            <div className="bg-gray-50 rounded p-1.5 text-center">
              <p className="text-[9px] text-gray-500">Frente</p>
              <p className="text-xs font-semibold">15 m</p>
            </div>
            <div className="bg-gray-50 rounded p-1.5 text-center">
              <p className="text-[9px] text-gray-500">Precio</p>
              <p className="text-xs font-semibold" style={{ color: GOLD }}>$2.4M</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 h-8 text-xs" style={{ backgroundColor: NAVY }}>
              Ver Detalle
            </Button>
            <Button size="sm" variant="outline" className="flex-1 h-8 text-xs" style={{ borderColor: GOLD, color: GOLD }}>
              Cotizar
            </Button>
          </div>
        </Card>
      </div>
      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t py-2 px-6">
        <div className="flex justify-around">
          <Map className="w-4 h-4" style={{ color: GOLD }} />
          <Search className="w-4 h-4 text-gray-400" />
          <Star className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </Phone>
  );
}

// K-04: Detalle Lote
function DetalleLote() {
  return (
    <Phone label="Detalle Lote — Ficha completa" id="K-04">
      <StatusBar />
      <div className="px-4 pt-2 pb-2 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4 text-gray-500" />
        <h2 className="text-sm font-semibold" style={{ color: NAVY }}>Lote A-12</h2>
        <Badge className="ml-auto text-[9px] bg-emerald-100 text-emerald-700 border-0">Disponible</Badge>
      </div>
      {/* Hero image placeholder */}
      <div className="mx-4 h-40 rounded-xl bg-gradient-to-r from-[#1B2A4A] to-[#2D4A7A] flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <Eye className="w-6 h-6 text-white/40 mx-auto mb-1" />
          <p className="text-white/50 text-[10px]">Vista del lote</p>
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? "bg-white" : "bg-white/40"}`} />
          ))}
        </div>
      </div>
      {/* Price */}
      <div className="px-4 mt-3">
        <p className="text-xl font-bold" style={{ color: GOLD }}>$2,400,000 MXN</p>
        <p className="text-[10px] text-gray-400">Precio de lista • IVA incluido</p>
      </div>
      {/* Specs grid */}
      <div className="px-4 mt-3 grid grid-cols-2 gap-2">
        {[
          { label: "Superficie", value: "450 m²", icon: Ruler },
          { label: "Frente", value: "15.0 m", icon: Ruler },
          { label: "Fondo", value: "30.0 m", icon: Ruler },
          { label: "Sección", value: "Río", icon: MapPin },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
            <s.icon className="w-3.5 h-3.5 text-gray-400" />
            <div>
              <p className="text-[9px] text-gray-500">{s.label}</p>
              <p className="text-xs font-semibold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      {/* CTA */}
      <div className="px-4 mt-4 space-y-2">
        <Button className="w-full h-10 text-sm font-medium" style={{ backgroundColor: GOLD }}>
          <FileText className="w-4 h-4 mr-2" /> Descargar Ficha PDF
        </Button>
        <Button variant="outline" className="w-full h-10 text-sm font-medium" style={{ borderColor: NAVY, color: NAVY }}>
          <Send className="w-4 h-4 mr-2" /> Solicitar Cotización
        </Button>
      </div>
    </Phone>
  );
}

// K-05: Visor PDF
function VisorPDF() {
  return (
    <Phone label="Visor PDF — Ficha técnica" id="K-05">
      <StatusBar />
      <div className="px-4 pt-2 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-semibold" style={{ color: NAVY }}>Ficha Lote A-12</h2>
        </div>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Download className="w-4 h-4 text-gray-500" />
        </Button>
      </div>
      {/* PDF viewer */}
      <div className="mx-4 flex-1 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-200 h-8 flex items-center justify-center">
          <p className="text-[9px] text-gray-500">Página 1 de 2</p>
        </div>
        <div className="p-4 space-y-3">
          {/* Simulated PDF content */}
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#B8860B] flex items-center justify-center text-white text-[8px] font-bold">LR</div>
              <div>
                <p className="text-[10px] font-semibold" style={{ color: NAVY }}>LAS RIBERAS</p>
                <p className="text-[8px] text-gray-400">Ficha Técnica</p>
              </div>
            </div>
            <div className="border-t pt-2 mt-1">
              <p className="text-[10px] font-semibold mb-1">Lote A-12 — Sección Río</p>
              <div className="space-y-0.5">
                {["Superficie: 450 m²", "Frente: 15.0 m", "Fondo: 30.0 m", "Uso de suelo: Residencial", "Servicios: Agua, Luz, Drenaje"].map((line, i) => (
                  <p key={i} className="text-[9px] text-gray-600">{line}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="h-28 bg-gray-100 rounded flex items-center justify-center">
              <Map className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-[8px] text-gray-400 text-center mt-1">Plano de ubicación</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <Button className="w-full h-9 text-xs" style={{ backgroundColor: GOLD }}>
          <Download className="w-3 h-3 mr-1" /> Compartir PDF
        </Button>
      </div>
    </Phone>
  );
}

// K-06: Cotización — Datos
function CotizacionDatos() {
  return (
    <Phone label="Cotización — Captura de datos" id="K-06">
      <StatusBar />
      <div className="px-4 pt-2 pb-2 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4 text-gray-500" />
        <h2 className="text-sm font-semibold" style={{ color: NAVY }}>Solicitar Cotización</h2>
      </div>
      {/* Progress */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#B8860B] text-white text-[10px] flex items-center justify-center font-bold">1</div>
          <div className="flex-1 h-0.5 bg-gray-200"><div className="h-full w-0 bg-[#B8860B]" /></div>
          <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 text-[10px] flex items-center justify-center font-bold">2</div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] font-medium" style={{ color: GOLD }}>Datos</span>
          <span className="text-[9px] text-gray-400">Confirmar</span>
        </div>
      </div>
      {/* Selected lot summary */}
      <div className="mx-4 p-3 bg-gray-50 rounded-lg border border-gray-100 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold" style={{ color: NAVY }}>Lote A-12</p>
            <p className="text-[10px] text-gray-500">Sección Río • 450 m²</p>
          </div>
          <p className="text-sm font-bold" style={{ color: GOLD }}>$2.4M</p>
        </div>
      </div>
      {/* Form */}
      <div className="px-4 space-y-3">
        {[
          { label: "Nombre completo", icon: User, placeholder: "Juan Pérez García" },
          { label: "Teléfono", icon: PhoneIcon, placeholder: "+52 33 1234 5678" },
          { label: "Email", icon: Mail, placeholder: "juan@email.com" },
        ].map((f, i) => (
          <div key={i}>
            <label className="text-[10px] text-gray-500 font-medium mb-0.5 block">{f.label}</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-white">
              <f.icon className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-400">{f.placeholder}</span>
            </div>
          </div>
        ))}
        <div>
          <label className="text-[10px] text-gray-500 font-medium mb-0.5 block">Comentarios</label>
          <div className="border border-gray-200 rounded-lg px-3 py-2.5 bg-white h-16">
            <span className="text-xs text-gray-400">Opcional...</span>
          </div>
        </div>
      </div>
      <div className="px-4 mt-4">
        <Button className="w-full h-10 text-sm font-medium" style={{ backgroundColor: NAVY }}>
          Continuar <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </Phone>
  );
}

// K-07: Cotización — Confirmación
function CotizacionConfirm() {
  return (
    <Phone label="Cotización — Confirmación con folio" id="K-07">
      <StatusBar />
      <div className="flex flex-col items-center justify-center h-[85%] px-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-lg font-semibold mb-1" style={{ color: NAVY }}>¡Cotización Enviada!</h2>
        <p className="text-xs text-gray-500 text-center mb-4">Tu solicitud ha sido registrada y enviada al equipo de ventas.</p>
        {/* Folio */}
        <div className="bg-gray-50 rounded-xl p-4 w-full mb-4 border border-gray-100">
          <p className="text-[10px] text-gray-500 text-center mb-1">Número de Folio</p>
          <p className="text-xl font-mono font-bold text-center" style={{ color: GOLD }}>COT-2026-0847</p>
          <div className="border-t border-gray-200 mt-3 pt-3 space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">Lote</span><span className="font-medium">A-12 — Sección Río</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">Precio</span><span className="font-medium" style={{ color: GOLD }}>$2,400,000 MXN</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">Fecha</span><span className="font-medium">13 Mar 2026</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">Contacto</span><span className="font-medium">Juan Pérez</span>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 text-center mb-4">
          Se ha enviado una copia a tu email y al CRM (HubSpot)
        </p>
        <Button className="w-full h-10 text-sm" style={{ backgroundColor: NAVY }}>
          <Home className="w-4 h-4 mr-2" /> Volver al Mapa
        </Button>
      </div>
    </Phone>
  );
}

// K-08: Listado Inventario
function ListadoInventario() {
  const lots = [
    { id: "A-12", section: "Río", area: "450", price: "$2.4M", status: "Disponible", color: "emerald" },
    { id: "A-15", section: "Río", area: "520", price: "$2.8M", status: "Disponible", color: "emerald" },
    { id: "B-03", section: "Bosque", area: "380", price: "$1.9M", status: "Apartado", color: "amber" },
    { id: "B-07", section: "Bosque", area: "410", price: "$2.1M", status: "Vendido", color: "red" },
    { id: "C-01", section: "Golf", area: "600", price: "$3.5M", status: "Disponible", color: "emerald" },
    { id: "C-04", section: "Golf", area: "480", price: "$2.7M", status: "Apartado", color: "amber" },
  ];
  return (
    <Phone label="Inventario — Lista con filtros" id="K-08">
      <StatusBar />
      <div className="px-4 pt-2 pb-2">
        <h2 className="text-sm font-semibold" style={{ color: NAVY }}>Inventario de Lotes</h2>
        <p className="text-[10px] text-gray-500">24 lotes disponibles de 48</p>
      </div>
      {/* Search */}
      <div className="px-4 mb-2">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs text-gray-400">Buscar por lote o sección...</span>
        </div>
      </div>
      {/* Filter pills */}
      <div className="px-4 mb-2 flex gap-1.5 overflow-x-auto">
        {["Todos", "Disponible", "Río", "Bosque", "Golf"].map((f, i) => (
          <Badge key={i} variant={i === 0 ? "default" : "outline"} className={`text-[9px] whitespace-nowrap shrink-0 ${
            i === 0 ? "bg-[#1B2A4A] text-white" : "text-gray-600"
          }`}>{f}</Badge>
        ))}
      </div>
      {/* Lots list */}
      <div className="px-4 space-y-2 overflow-y-auto" style={{ maxHeight: "380px" }}>
        {lots.map((lot, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div className={`w-2 h-10 rounded-full ${
              lot.color === "emerald" ? "bg-emerald-500" : lot.color === "amber" ? "bg-amber-500" : "bg-red-400"
            }`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold" style={{ color: NAVY }}>Lote {lot.id}</p>
                <p className="text-xs font-bold" style={{ color: GOLD }}>{lot.price}</p>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-[10px] text-gray-500">Sección {lot.section} • {lot.area} m²</p>
                <Badge variant="outline" className={`text-[8px] border-0 ${
                  lot.color === "emerald" ? "bg-emerald-50 text-emerald-700" :
                  lot.color === "amber" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                }`}>{lot.status}</Badge>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </div>
        ))}
      </div>
    </Phone>
  );
}

// K-09: Amenidades
function Amenidades() {
  const amenities = [
    { name: "Casa Club", desc: "Salón de eventos y terraza", icon: Building2, img: "from-amber-100 to-amber-50" },
    { name: "Alberca Infinity", desc: "Alberca con vista al río", icon: Waves, img: "from-blue-100 to-blue-50" },
    { name: "Gimnasio", desc: "Equipamiento de última generación", icon: Dumbbell, img: "from-gray-100 to-gray-50" },
    { name: "Canchas Deportivas", desc: "Tenis, pádel y fútbol", icon: Star, img: "from-green-100 to-green-50" },
    { name: "Spa & Wellness", desc: "Tratamientos y sauna", icon: Star, img: "from-purple-100 to-purple-50" },
    { name: "Senderos", desc: "2.5 km de senderos naturales", icon: Trees, img: "from-emerald-100 to-emerald-50" },
  ];
  return (
    <Phone label="Amenidades — Galería y descripción" id="K-09">
      <StatusBar />
      <div className="px-4 pt-2 pb-2">
        <h2 className="text-sm font-semibold" style={{ color: NAVY }}>Amenidades</h2>
        <p className="text-[10px] text-gray-500">Las Riberas — Club & Lifestyle</p>
      </div>
      <div className="px-4 space-y-3 overflow-y-auto" style={{ maxHeight: "500px" }}>
        {amenities.map((a, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-gray-100">
            <div className={`h-24 bg-gradient-to-r ${a.img} flex items-center justify-center`}>
              <a.icon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold" style={{ color: NAVY }}>{a.name}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

// K-10: Offline Mode
function OfflineKiosko() {
  return (
    <Phone label="Offline — Modo sin conexión" id="K-10">
      <StatusBar />
      <div className="flex flex-col items-center justify-center h-[85%] px-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
          <WifiOff className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-base font-semibold mb-1" style={{ color: NAVY }}>Modo Offline</h2>
        <p className="text-xs text-gray-500 text-center mb-5">Funciones limitadas disponibles sin conexión a internet.</p>
        {/* Cache status */}
        <div className="w-full space-y-2 mb-5">
          {[
            { label: "Mapa e inventario", status: "cached", time: "Hace 2h" },
            { label: "Fichas PDF", status: "cached", time: "Hace 2h" },
            { label: "Imágenes del mapa", status: "partial", time: "Hace 4h" },
            { label: "Cotizaciones", status: "queued", time: "3 pendientes" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === "cached" ? "bg-emerald-500" :
                  item.status === "partial" ? "bg-amber-500" : "bg-blue-500"
                }`} />
                <span className="text-xs text-gray-700">{item.label}</span>
              </div>
              <span className="text-[10px] text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
        <div className="w-full p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-amber-800 font-medium">Cotizaciones en cola</p>
              <p className="text-[10px] text-amber-600">Se enviarán automáticamente al recuperar conexión.</p>
            </div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// Main export
export function KioskoApp() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold" style={{ color: NAVY }}>Kiosko — Sales Enablement App</h2>
        <p className="text-sm text-gray-500">10 pantallas • React Native • Mapa interactivo GIS + Cotizador</p>
      </div>
      <div className="flex gap-8 overflow-x-auto pb-6" style={{ scrollbarWidth: "thin" }}>
        <MapaInteractivo />
        <SelectorCapas />
        <PopupLote />
        <DetalleLote />
        <VisorPDF />
        <CotizacionDatos />
        <CotizacionConfirm />
        <ListadoInventario />
        <Amenidades />
        <OfflineKiosko />
      </div>
    </div>
  );
}
