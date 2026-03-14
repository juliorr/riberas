import { useState } from "react";
import { KioskoApp } from "./apps/KioskoApp";
import { AdminApp } from "./apps/AdminApp";
import { PropuestaApp } from "./apps/PropuestaApp";
import { Monitor, Tablet, ChevronRight, Layers, Smartphone, TabletSmartphone, RotateCcw, FileText } from "lucide-react";
import logoRounded from "./assets/logo-rounded.png";

export type DeviceType = "phone" | "tablet-v" | "tablet-h";

const NAVY = "#1B2A4A";
const GOLD = "#B8860B";

const apps = [
  {
    id: "kiosko",
    label: "Kiosko",
    subtitle: "Sales Enablement",
    count: 10,
    icon: Tablet,
    tech: "React Native",
    desc: "Mapa interactivo GIS, fichas de lotes, cotizador integrado con HubSpot y modo offline con cola de envío.",
  },
  {
    id: "admin",
    label: "Panel Admin",
    subtitle: "Gestión Central",
    count: 11,
    icon: Monitor,
    tech: "React Web",
    desc: "GIS Manager, Storage PDFs, Sync Ops, notificaciones y gestión de usuarios con RBAC.",
  },
  {
    id: "propuesta",
    label: "Propuesta",
    subtitle: "Documento Técnico",
    count: 13,
    icon: FileText,
    tech: "Especificación",
    desc: "Arquitectura, stack, plan de implementación, APIs, seguridad y cronograma del proyecto.",
  },
];

export default function App() {
  const [activeApp, setActiveApp] = useState("kiosko");
  const [deviceType, setDeviceType] = useState<DeviceType>("tablet-h");
  const active = apps.find((a) => a.id === activeApp)!;
  const isMobileApp = activeApp === "kiosko";
  const isDocApp = activeApp === "propuesta";

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* ── Header ── */}
      <header className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative max-w-7xl mx-auto px-8 py-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <img
                src={logoRounded}
                alt="Las Riberas"
                className="w-14 h-14 rounded-2xl shadow-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-light text-white tracking-[0.15em]">
                  LAS RIBERAS
                </h1>
                <p className="text-white/40 text-sm mt-1 tracking-wide">
                  Propuesta Técnica — Prototipo Navegable
                </p>
              </div>
            </div>
            <div className="text-right mt-1">
              <div className="flex items-center gap-2 text-white/30 text-sm">
                <Layers className="w-4 h-4" />
                <span>21 pantallas</span>
              </div>
              <p className="text-white/20 text-xs mt-1">
                React Native + React Web + Python
              </p>
            </div>
          </div>
        </div>
        {/* Gold accent line */}
        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      </header>

      {/* ── App Navigator ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E8E0D4]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-0">
            {apps.map((app) => {
              const isActive = app.id === activeApp;
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className={`
                    relative flex items-center gap-3 px-6 py-4 transition-all duration-200
                    ${isActive
                      ? "text-[#1B2A4A]"
                      : "text-gray-400 hover:text-gray-600"
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#B8860B]" : ""}`} />
                  <div className="text-left">
                    <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                      {app.label}
                    </span>
                    <span className={`ml-2 text-xs ${isActive ? "text-[#B8860B]" : "text-gray-300"}`}>
                      {app.count}
                    </span>
                  </div>
                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-6 right-6 h-[2px] rounded-t"
                      style={{ backgroundColor: GOLD }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Section Context ── */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold" style={{ color: NAVY }}>
                {active.label}
              </h2>
              <span
                className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: GOLD + "15", color: GOLD }}
              >
                {active.tech}
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-xl">{active.desc}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Device selector - only for mobile apps */}
            {isMobileApp && (
              <div className="device-selector">
                <button
                  onClick={() => setDeviceType("phone")}
                  className={`device-selector-btn ${deviceType === "phone" ? "active" : ""}`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Teléfono</span>
                </button>
                <button
                  onClick={() => setDeviceType("tablet-v")}
                  className={`device-selector-btn ${deviceType === "tablet-v" ? "active" : ""}`}
                >
                  <TabletSmartphone className="w-3.5 h-3.5" />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => setDeviceType("tablet-h")}
                  className={`device-selector-btn ${deviceType === "tablet-h" ? "active" : ""}`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tablet H</span>
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-400 text-xs bg-white/60 px-3 py-2 rounded-lg border border-[#E8E0D4]">
              <span className="font-mono" style={{ color: GOLD }}>{active.count}</span>
              <span>{isDocApp ? "secciones" : "pantallas"}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-300">interactivo</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Screen Gallery ── */}
      <div className="px-8 pb-12">
        {activeApp === "kiosko" && <KioskoApp deviceType={deviceType} />}
        {activeApp === "admin" && <AdminApp />}
        {activeApp === "propuesta" && <PropuestaApp />}
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[#E8E0D4] bg-white/40">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoRounded}
              alt="Las Riberas"
              className="w-6 h-6 rounded object-cover"
            />
            <span className="text-xs text-gray-400">
              Las Riberas — Propuesta Técnica v1.0
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
