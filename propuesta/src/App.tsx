import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PantallaApp } from "./apps/PantallaApp";
import { KioskoApp } from "./apps/KioskoApp";
import { AdminApp } from "./apps/AdminApp";
import { Smartphone, Monitor, Tablet } from "lucide-react";

export default function App() {
  const [activeApp, setActiveApp] = useState("pantalla");

  return (
    <div className="min-h-screen bg-[#f0ece6]">
      {/* Header */}
      <header className="bg-[#1B2A4A] text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#B8860B] flex items-center justify-center text-xs font-bold">LR</div>
          <div>
            <h1 className="text-lg font-semibold tracking-wide">Las Riberas</h1>
            <p className="text-xs text-white/60">Prototipo Navegable — Propuesta Tecnica</p>
          </div>
        </div>
        <div className="text-xs text-white/40">36 pantallas | React Native + React Web</div>
      </header>

      {/* App Selector */}
      <Tabs value={activeApp} onValueChange={setActiveApp} className="w-full">
        <div className="bg-white border-b px-6 py-2 sticky top-0 z-50">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto bg-[#f0ece6]">
            <TabsTrigger value="pantalla" className="gap-2 data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white">
              <Smartphone className="w-4 h-4" /> Pantalla (12)
            </TabsTrigger>
            <TabsTrigger value="kiosko" className="gap-2 data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white">
              <Tablet className="w-4 h-4" /> Kiosko (10)
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2 data-[state=active]:bg-[#1B2A4A] data-[state=active]:text-white">
              <Monitor className="w-4 h-4" /> Panel Admin (14)
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="pantalla" className="mt-0 p-6">
          <PantallaApp />
        </TabsContent>
        <TabsContent value="kiosko" className="mt-0 p-6">
          <KioskoApp />
        </TabsContent>
        <TabsContent value="admin" className="mt-0 p-6">
          <AdminApp />
        </TabsContent>
      </Tabs>
    </div>
  );
}
