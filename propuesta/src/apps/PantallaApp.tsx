import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Menu, Home, Building2, Trees, UtensilsCrossed, Calendar, ChevronRight, ChevronLeft, Wifi, WifiOff, MapPin, Star, X, Image } from "lucide-react";

const GOLD = "#B8860B";
const NAVY = "#1B2A4A";

// Phone wrapper
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

// Status bar
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

// P-01: Idle Mode
function IdleMode() {
  return (
    <Phone label="Idle Mode — Playlist full-screen" id="P-01">
      <div className="h-full relative bg-gradient-to-b from-[#1B2A4A] to-[#0a1628]">
        <StatusBar light />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#B8860B]/20 flex items-center justify-center mb-6">
            <Play className="w-10 h-10 text-[#B8860B]" fill="#B8860B" />
          </div>
          <p className="text-white/80 text-sm tracking-[0.3em] uppercase">Las Riberas</p>
          <p className="text-white/40 text-xs mt-2">Video 2 de 5</p>
          <div className="absolute bottom-24 flex gap-1.5">
            {[0,1,2,3,4].map(i => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i===1 ? "bg-[#B8860B]" : "bg-white/30"}`} />
            ))}
          </div>
          <p className="absolute bottom-12 text-white/30 text-[10px]">Toca para volver al menu</p>
        </div>
      </div>
    </Phone>
  );
}

// P-02: Fallback Video
function FallbackVideo() {
  return (
    <Phone label="Fallback — Video backup" id="P-02">
      <div className="h-full relative bg-black">
        <StatusBar light />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <Play className="w-8 h-8 text-white/60" />
          </div>
          <p className="text-white/60 text-sm">Video de respaldo</p>
          <div className="absolute top-16 right-4">
            <Badge className="bg-red-500/80 text-white text-[9px] border-0">FALLBACK</Badge>
          </div>
          <div className="absolute bottom-32 left-6 right-6 bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-3">
            <p className="text-yellow-300 text-[10px] text-center">Playlist vacia o formato no soportado. Alerta enviada al Panel Admin.</p>
          </div>
          <p className="absolute bottom-12 text-white/30 text-[10px]">Toca para volver al menu</p>
        </div>
      </div>
    </Phone>
  );
}

// P-03: Home / Menu Principal
function HomeMenu() {
  const sections = [
    { icon: Building2, label: "Desarrollo", color: "#B8860B" },
    { icon: MapPin, label: "Bienes Raices", color: "#2D6A4F" },
    { icon: Star, label: "Club", color: "#1B2A4A" },
    { icon: UtensilsCrossed, label: "Maderas", color: "#8B4513" },
    { icon: Trees, label: "Nona", color: "#556B2F" },
    { icon: Calendar, label: "Calendario", color: "#6B4C8A" },
  ];
  return (
    <Phone label="Home — Menu principal" id="P-03">
      <StatusBar />
      {/* Banner */}
      <div className="h-44 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A] to-[#2D4A7A]" />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="w-10 h-10 rounded-full bg-[#B8860B] flex items-center justify-center text-white text-xs font-bold mb-2">LR</div>
          <p className="text-white text-lg font-light tracking-[0.2em]">LAS RIBERAS</p>
          <p className="text-white/50 text-[10px] mt-1 tracking-wider">VIVE LA EXPERIENCIA</p>
        </div>
      </div>
      {/* Menu Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {sections.map((s, i) => (
            <button key={i} className="flex flex-col items-center gap-2 p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100">
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: s.color + "15" }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <span className="text-xs font-medium text-gray-700">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Bottom nav hint */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t py-2 px-4">
        <div className="flex justify-around">
          <Home className="w-5 h-5 text-[#B8860B]" />
          <Menu className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </Phone>
  );
}

// P-04: Seccion Desarrollo
function SeccionDesarrollo() {
  return (
    <Phone label="Seccion Desarrollo" id="P-04">
      <StatusBar />
      <div className="px-4 py-3 flex items-center gap-3 border-b">
        <ChevronLeft className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-semibold text-[#1B2A4A]">Desarrollo</span>
      </div>
      <div className="h-48 bg-gradient-to-br from-[#1B2A4A] to-[#2D4A7A] flex items-end p-5">
        <div>
          <p className="text-white text-lg font-semibold">Las Riberas</p>
          <p className="text-white/60 text-xs mt-1">Un desarrollo premium rodeado de naturaleza</p>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex gap-3">
          {["150+ Ha", "Golf 18H", "Lago"].map((t,i) => (
            <div key={i} className="flex-1 bg-[#f0ece6] rounded-lg p-3 text-center">
              <p className="text-sm font-bold text-[#1B2A4A]">{t}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          Descubre un estilo de vida unico en Las Riberas, un desarrollo inmobiliario premium que combina la naturaleza con amenidades de clase mundial.
        </p>
        <div className="bg-gray-100 rounded-xl h-32 flex items-center justify-center">
          <Image className="w-8 h-8 text-gray-300" />
        </div>
        <Button className="w-full bg-[#B8860B] hover:bg-[#9a7209] text-white">DESCUBRE MAS</Button>
      </div>
    </Phone>
  );
}

// P-05: Bienes Raices Listado
function BienesRaicesListado() {
  const lots = [
    { id: "L-101", section: "Sec. A", status: "Disponible", price: "$3,500,000", color: "bg-emerald-500" },
    { id: "L-102", section: "Sec. A", status: "Apartado", price: "$3,800,000", color: "bg-yellow-500" },
    { id: "L-103", section: "Sec. B", status: "Vendido", price: "$4,200,000", color: "bg-red-500" },
    { id: "L-104", section: "Sec. B", status: "Disponible", price: "$3,100,000", color: "bg-emerald-500" },
    { id: "V-201", section: "Villas", status: "Disponible", price: "$8,500,000", color: "bg-emerald-500" },
    { id: "V-202", section: "Villas", status: "Apartado", price: "$9,200,000", color: "bg-yellow-500" },
  ];
  return (
    <Phone label="Bienes Raices — Inventario" id="P-05">
      <StatusBar />
      <div className="px-4 py-3 flex items-center gap-3 border-b">
        <ChevronLeft className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-semibold text-[#1B2A4A]">Bienes Raices</span>
      </div>
      {/* Filters */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto">
        {["Todos", "Lotes", "Villas", "Casas"].map((f, i) => (
          <Badge key={i} variant={i === 0 ? "default" : "outline"} className={i === 0 ? "bg-[#1B2A4A] text-white text-[10px] shrink-0" : "text-[10px] shrink-0"}>{f}</Badge>
        ))}
      </div>
      {/* List */}
      <div className="px-4 py-2 space-y-2">
        {lots.map((l, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
              <div>
                <p className="text-sm font-semibold text-[#1B2A4A]">{l.id}</p>
                <p className="text-[10px] text-gray-400">{l.section}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[#B8860B]">{l.price}</p>
              <p className="text-[10px] text-gray-400">{l.status}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] text-gray-400 mt-2">Sincronizado con HubSpot en tiempo real</p>
    </Phone>
  );
}

// P-06: Bienes Raices Detalle
function BienesRaicesDetalle() {
  return (
    <Phone label="Detalle de Lote/Casa" id="P-06">
      <StatusBar />
      <div className="px-4 py-3 flex items-center gap-3 border-b">
        <ChevronLeft className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-semibold text-[#1B2A4A]">Lote L-101</span>
      </div>
      <div className="h-40 bg-gradient-to-br from-[#2D6A4F]/20 to-[#2D6A4F]/5 flex items-center justify-center">
        <MapPin className="w-12 h-12 text-[#2D6A4F]/30" />
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-[#1B2A4A]">Lote L-101</h2>
            <p className="text-xs text-gray-400">Seccion A — Las Riberas</p>
          </div>
          <Badge className="bg-emerald-500 text-white border-0 text-[10px]">Disponible</Badge>
        </div>
        <p className="text-2xl font-bold" style={{ color: GOLD }}>$3,500,000 MXN</p>
        <div className="grid grid-cols-3 gap-2">
          {[["Area", "450 m²"], ["Frente", "15 m"], ["Fondo", "30 m"]].map(([k, v], i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-2.5 text-center">
              <p className="text-[10px] text-gray-400">{k}</p>
              <p className="text-sm font-bold text-[#1B2A4A]">{v}</p>
            </div>
          ))}
        </div>
        <div className="border rounded-lg p-3">
          <p className="text-[10px] text-gray-400 mb-1">Tipo</p>
          <p className="text-sm text-[#1B2A4A]">Lote residencial con vista al lago</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1 bg-[#B8860B] hover:bg-[#9a7209] text-white text-xs">VER PDF MODELO</Button>
          <Button variant="outline" className="flex-1 border-[#1B2A4A] text-[#1B2A4A] text-xs">COTIZAR</Button>
        </div>
      </div>
    </Phone>
  );
}

// P-07: Seccion Club
function SeccionClub() {
  return (
    <Phone label="Seccion Club" id="P-07">
      <StatusBar />
      <div className="px-4 py-3 flex items-center gap-3 border-b">
        <ChevronLeft className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-semibold text-[#1B2A4A]">Club</span>
      </div>
      <div className="h-44 bg-gradient-to-br from-[#1B2A4A] to-[#2D4A7A] flex items-end p-5">
        <p className="text-white text-lg font-semibold">Club Las Riberas</p>
      </div>
      <div className="p-4 space-y-3">
        {[
          { title: "Casa Club", desc: "Salon de eventos y area social" },
          { title: "Alberca", desc: "Alberca semiolimpica con area de chapoteadero" },
          { title: "Gimnasio", desc: "Equipamiento de ultima generacion" },
          { title: "Canchas", desc: "Tenis, padel y futbol" },
          { title: "Spa", desc: "Area de relajacion y masajes" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-[#1B2A4A]/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-[#1B2A4A]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1B2A4A]">{item.title}</p>
              <p className="text-[10px] text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

// P-08: Maderas
function MaderasScreen() {
  return (
    <Phone label="Maderas — OpenTable" id="P-08">
      <StatusBar />
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-semibold text-[#1B2A4A]">Maderas</span>
        </div>
        <Badge className="bg-[#DA3743] text-white border-0 text-[9px]">OpenTable</Badge>
      </div>
      <div className="h-36 bg-gradient-to-br from-[#8B4513] to-[#5a2d0a] flex items-end p-5">
        <div>
          <p className="text-white text-lg font-semibold">Restaurante Maderas</p>
          <p className="text-white/60 text-xs">Cocina contemporanea mexicana</p>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="border-2 border-dashed border-[#DA3743]/30 rounded-xl p-6 text-center bg-[#DA3743]/5">
          <UtensilsCrossed className="w-8 h-8 mx-auto mb-3 text-[#DA3743]" />
          <p className="text-sm font-semibold text-[#DA3743]">Widget OpenTable</p>
          <p className="text-[10px] text-gray-400 mt-1">Reservacion integrada via overlay</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Horario</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Lun - Vie</span><span className="font-medium">13:00 - 23:00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sab - Dom</span><span className="font-medium">10:00 - 23:00</span>
          </div>
        </div>
        <Button className="w-full bg-[#DA3743] hover:bg-[#c0303d] text-white">RESERVAR MESA</Button>
      </div>
    </Phone>
  );
}

// P-09: Nona
function NonaScreen() {
  return (
    <Phone label="Seccion Nona" id="P-09">
      <StatusBar />
      <div className="px-4 py-3 flex items-center gap-3 border-b">
        <ChevronLeft className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-semibold text-[#1B2A4A]">Nona</span>
      </div>
      <div className="h-44 bg-gradient-to-br from-[#556B2F] to-[#3a4a20] flex items-end p-5">
        <div>
          <p className="text-white text-lg font-semibold">Nona</p>
          <p className="text-white/60 text-xs">Experiencia gastronomica italiana</p>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          Disfruta de la autentica cocina italiana en un ambiente sofisticado rodeado de la naturaleza de Las Riberas.
        </p>
        <div className="bg-gray-100 rounded-xl h-28 flex items-center justify-center">
          <Image className="w-8 h-8 text-gray-300" />
        </div>
        <div className="bg-gray-100 rounded-xl h-28 flex items-center justify-center">
          <Image className="w-8 h-8 text-gray-300" />
        </div>
        <Button className="w-full bg-[#556B2F] hover:bg-[#3a4a20] text-white">CONOCER MAS</Button>
      </div>
    </Phone>
  );
}

// P-10: Calendario
function CalendarioScreen() {
  const months = ["Mar", "Abr", "May", "Jun", "Jul", "Ago"];
  return (
    <Phone label="Calendario mensual" id="P-10">
      <StatusBar />
      <div className="px-4 py-3 flex items-center gap-3 border-b">
        <ChevronLeft className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-semibold text-[#1B2A4A]">Calendario</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <ChevronLeft className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-bold text-[#1B2A4A]">2026</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {months.map((m, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-gray-100 hover:border-[#B8860B] transition cursor-pointer">
              <div className={`h-24 ${i === 0 ? "bg-[#B8860B]/10" : "bg-gray-100"} flex items-center justify-center`}>
                <Calendar className={`w-8 h-8 ${i === 0 ? "text-[#B8860B]" : "text-gray-300"}`} />
              </div>
              <div className="p-2 text-center">
                <p className={`text-sm font-semibold ${i === 0 ? "text-[#B8860B]" : "text-gray-600"}`}>{m} 2026</p>
                <p className="text-[10px] text-gray-400">{i === 0 ? "Mes actual" : `${2 + i} eventos`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// P-11: Calendario Detalle
function CalendarioDetalle() {
  return (
    <Phone label="Calendario — Detalle" id="P-11">
      <StatusBar />
      <div className="px-4 py-3 flex items-center gap-3 border-b">
        <ChevronLeft className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-semibold text-[#1B2A4A]">Marzo 2026</span>
      </div>
      <div className="h-52 bg-gradient-to-br from-[#6B4C8A] to-[#4a3560] flex items-end p-5">
        <div>
          <Badge className="bg-white/20 text-white border-0 text-[9px] mb-2">EVENTO ESPECIAL</Badge>
          <p className="text-white text-lg font-semibold">Open House Las Riberas</p>
          <p className="text-white/60 text-xs mt-1">Sabado 21 de Marzo, 10:00 AM</p>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          Te invitamos a conocer el desarrollo, recorrer las amenidades y descubrir las opciones de lotes y casas disponibles.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400">Duracion</p>
            <p className="text-sm font-bold text-[#1B2A4A]">4 horas</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400">Ubicacion</p>
            <p className="text-sm font-bold text-[#1B2A4A]">Casa Club</p>
          </div>
        </div>
        <Button className="w-full bg-[#6B4C8A] hover:bg-[#5a3d75] text-white">MAS INFORMACION</Button>
      </div>
    </Phone>
  );
}

// P-12: Offline
function OfflineScreen() {
  return (
    <Phone label="Modo Offline" id="P-12">
      <StatusBar />
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-semibold text-[#1B2A4A]">Las Riberas</span>
        </div>
        <Badge className="bg-orange-500 text-white border-0 text-[9px] gap-1">
          <WifiOff className="w-3 h-3" /> OFFLINE
        </Badge>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 mt-16">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
          <WifiOff className="w-8 h-8 text-orange-500" />
        </div>
        <h3 className="text-lg font-semibold text-[#1B2A4A] mb-2">Sin conexion</h3>
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          Mostrando la ultima informacion disponible. Los datos se actualizaran automaticamente al recuperar la conexion.
        </p>
        <div className="mt-6 w-full space-y-2">
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-green-700">Inventario cacheado (hace 5 min)</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-green-700">Contenido multimedia disponible</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-xs text-yellow-700">Mapa limitado (sin capa satelital)</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

export function PantallaApp() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#1B2A4A]">App Pantalla <span className="text-[#B8860B]">(React Native)</span></h2>
        <p className="text-sm text-gray-500 mt-1">Digital Signage — 12 pantallas para dispositivos en sitio</p>
      </div>
      <div className="flex gap-8 overflow-x-auto pb-8" style={{ scrollSnapType: "x mandatory" }}>
        <IdleMode />
        <FallbackVideo />
        <HomeMenu />
        <SeccionDesarrollo />
        <BienesRaicesListado />
        <BienesRaicesDetalle />
        <SeccionClub />
        <MaderasScreen />
        <NonaScreen />
        <CalendarioScreen />
        <CalendarioDetalle />
        <OfflineScreen />
      </div>
    </div>
  );
}
