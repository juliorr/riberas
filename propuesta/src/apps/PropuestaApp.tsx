import { useState, useEffect, useRef, useCallback } from "react";
import {
  BookOpen, Server, Layout, Palette, Database, Globe, Shield,
  CalendarDays, CheckCircle2, Monitor, AlertTriangle, Link2, FileEdit,
  ChevronRight, ExternalLink
} from "lucide-react";
import arqAws from "../assets/arquitectura-aws.png";
import arqDo from "../assets/arquitectura-digitalocean.png";

const GOLD = "#B8860B";
const NAVY = "#1B2A4A";

// ── Section definitions ──
const sections = [
  { id: "resumen", num: "1", label: "Resumen Ejecutivo", icon: BookOpen },
  { id: "stack", num: "2", label: "Stack Tecnologico", icon: Server },
  { id: "arquitectura", num: "3", label: "Arquitectura", icon: Layout },
  { id: "diseno", num: "4", label: "Diseno UI/UX", icon: Palette },
  { id: "modelo", num: "5", label: "Modelo de Datos", icon: Database },
  { id: "apis", num: "6", label: "APIs", icon: Globe },
  { id: "seguridad", num: "7", label: "Seguridad", icon: Shield },
  { id: "plan", num: "8", label: "Plan de Implementacion", icon: CalendarDays },
  { id: "criterios", num: "9", label: "Criterios de Aceptacion", icon: CheckCircle2 },
  { id: "pantallas", num: "10", label: "Inventario de Pantallas", icon: Monitor },
  { id: "riesgos", num: "11", label: "Riesgos", icon: AlertTriangle },
  { id: "supuestos", num: "12", label: "Supuestos", icon: Link2 },
  { id: "control", num: "13", label: "Control de Cambios", icon: FileEdit },
];

// ── Styled table helpers ──
function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b-2" style={{ borderColor: GOLD + "40" }}>
        {children}
      </tr>
    </thead>
  );
}
function TH({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider ${className}`} style={{ color: NAVY }}>
      {children}
    </th>
  );
}
function TD({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`px-3 py-2 text-[11px] text-gray-700 ${className}`}>
      {children}
    </td>
  );
}
function STable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#E8E0D4]">
      <table className="w-full text-left">{children}</table>
    </div>
  );
}
function SectionTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: GOLD }}>{num}</span>
      <h2 className="text-lg font-bold" style={{ color: NAVY }}>{title}</h2>
    </div>
  );
}
function SubTitle({ title }: { title: string }) {
  return <h3 className="text-sm font-bold mt-5 mb-2" style={{ color: NAVY }}>{title}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] text-gray-600 leading-relaxed mb-3">{children}</p>;
}
function Divider() {
  return <div className="h-px my-4" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)` }} />;
}

// ══════════════════════════════════════════════
// SECTION COMPONENTS
// ══════════════════════════════════════════════

function SecResumen() {
  return (
    <>
      <SectionTitle num="1" title="Resumen Ejecutivo" />
      <P>
        La presente propuesta tecnica detalla la arquitectura, stack tecnologico y plan de implementacion para la
        <strong> Plataforma Digital Las Riberas</strong>, compuesta por dos soluciones integradas:
        <strong> Kiosko</strong> (Sales Enablement) e <strong>Integracion con HubSpot</strong> (Gateway),
        junto con un Panel Administrativo.
      </P>
      <P>
        La solucion se construira con <strong>React Native</strong> para la aplicacion movil (Kiosko),
        <strong> React</strong> para el Panel Administrativo web, y <strong>Python</strong> en el backend.
        El diseno seguira el lenguaje visual del sitio actual lasriberas.mx: estetica minimalista de lujo,
        paleta neutra con acentos dorados, tipografia sans-serif y layout modular orientado a la experiencia
        inmobiliaria premium.
      </P>
      <P>
        HubSpot se establece como fuente unica de verdad (SSOT) para inventario, estatus comercial, precios y
        trazabilidad de cotizaciones. El Gateway centraliza toda la comunicacion con el CRM, distribuyendo
        deltas y snapshots a Kiosko mediante un patron push.
      </P>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "Soluciones", value: "2", sub: "Kiosko + Gateway" },
          { label: "Duracion", value: "16 sem", sub: "~4 meses" },
          { label: "Esfuerzo", value: "1,936h", sub: "4 roles" },
        ].map(m => (
          <div key={m.label} className="rounded-lg p-3 text-center border border-[#E8E0D4] bg-[#FDFBF7]">
            <div className="text-xl font-bold" style={{ color: GOLD }}>{m.value}</div>
            <div className="text-[11px] font-semibold" style={{ color: NAVY }}>{m.label}</div>
            <div className="text-[10px] text-gray-400">{m.sub}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function SecStack() {
  const rnStack = [
    ["Framework base", "React Native 0.83+ + TypeScript", "Apps nativas iOS/Android, New Architecture"],
    ["Navegacion", "React Navigation 7", "Deep linking, gestos nativos, Static API"],
    ["State", "Zustand 5 + TanStack Query v5", "Estado local + cache de servidor"],
    ["Mapas", "react-native-mapbox-gl (MapLibre)", "GeoJSON/tiles, gestos touch nativos"],
    ["UI", "NativeWind v4", "Tailwind para RN, consistente con web"],
    ["Offline", "WatermelonDB + AsyncStorage", "DB offline-first para inventario"],
    ["Animaciones", "React Native Reanimated 4", "60fps en hilo nativo"],
    ["PDF", "react-native-pdf", "Visor nativo de PDFs"],
    ["Push", "Firebase Cloud Messaging", "Notificaciones en tiempo real"],
    ["Build", "Expo SDK 55", "OTA updates, EAS Build"],
    ["Testing", "Jest + RNTL + Detox", "Unit, integracion y E2E"],
  ];
  const webStack = [
    ["Framework", "React 19 + TypeScript", "Server Components, Actions, use()"],
    ["Build", "Vite 7", "HMR instantaneo, Rolldown"],
    ["State", "Zustand 5 + TanStack Query v5", "Consistencia con movil"],
    ["UI", "Tailwind CSS v4 + Headless UI v2", "CSS-first, accesible"],
    ["Drag & Drop", "dnd-kit", "Upload PDFs, archivos GIS"],
    ["Mapas", "MapLibre GL JS", "Preview GIS en navegador"],
    ["Testing", "Vitest 3 + RTL + Playwright", "Unit, integracion, E2E"],
  ];
  const backStack = [
    ["API", "FastAPI 0.128+", "Async, Pydantic v2, OpenAPI"],
    ["ORM", "SQLAlchemy 2.1 + Alembic", "Async sessions, migraciones"],
    ["DB", "PostgreSQL 17 + PostGIS", "Geoespacial nativo WGS84"],
    ["Cache", "Redis 7", "Pub-sub, estado canonico"],
    ["Colas", "Celery 5.4+ + Redis", "Webhooks, reintentos, DLQ"],
    ["Storage", "MinIO (S3)", "PDFs, imagenes"],
    ["GIS", "Fiona + Shapely + PyProj", "Shapefile/KMZ/KML"],
    ["HubSpot", "hubspot-api-client", "Contacts, deals, webhooks"],
    ["Auth", "JWT + HMAC", "Panel (JWT), servicio (HMAC)"],
    ["Testing", "pytest + httpx + factory-boy", "Async, cobertura 80%"],
  ];
  const infraStack = [
    ["Contenerizacion", "Docker + Docker Compose"],
    ["Orquestacion", "Docker Swarm / Kubernetes"],
    ["CI/CD", "GitHub Actions"],
    ["Proxy", "Nginx / Traefik v3 + TLS"],
    ["Monitoreo", "Prometheus + Grafana + Loki"],
    ["Alertas", "Grafana + Slack/email"],
    ["Hosting", "DigitalOcean / AWS (flexible)"],
  ];

  const renderStack = (title: string, rows: string[][], cols: string[]) => (
    <>
      <SubTitle title={title} />
      <STable>
        <THead>
          {cols.map(c => <TH key={c}>{c}</TH>)}
        </THead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"}>
              {r.map((cell, j) => (
                <TD key={j} className={j === 0 ? "font-semibold whitespace-nowrap" : ""}>{cell}</TD>
              ))}
            </tr>
          ))}
        </tbody>
      </STable>
    </>
  );

  return (
    <>
      <SectionTitle num="2" title="Stack Tecnologico" />
      {renderStack("2.1 App Movil — Kiosko (React Native)", rnStack, ["Componente", "Tecnologia", "Justificacion"])}
      <Divider />
      {renderStack("2.2 Panel Administrativo Web (React)", webStack, ["Componente", "Tecnologia", "Justificacion"])}
      <Divider />
      {renderStack("2.3 Backend (Python)", backStack, ["Componente", "Tecnologia", "Justificacion"])}
      <Divider />
      {renderStack("2.4 Infraestructura y DevOps", infraStack, ["Componente", "Tecnologia"])}
    </>
  );
}

function SecArquitectura() {
  return (
    <>
      <SectionTitle num="3" title="Arquitectura del Sistema" />
      <SubTitle title="3.1 Diagrama de Arquitectura (Alto Nivel)" />
      <P>El sistema sigue un patron de arquitectura orientada a eventos con el Gateway como hub central.</P>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white" style={{ backgroundColor: "#FF9900" }}>AWS</span>
            <span className="text-[10px] text-gray-400">Amazon Web Services</span>
          </div>
          <div className="rounded-lg border border-[#E8E0D4] overflow-hidden bg-[#0D1117]">
            <img src={arqAws} alt="Arquitectura AWS" className="w-full" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white" style={{ backgroundColor: "#0080FF" }}>DigitalOcean</span>
            <span className="text-[10px] text-gray-400">Alternativa equivalente</span>
          </div>
          <div className="rounded-lg border border-[#E8E0D4] overflow-hidden bg-[#0D1117]">
            <img src={arqDo} alt="Arquitectura DigitalOcean" className="w-full" />
          </div>
        </div>
      </div>

      <SubTitle title="3.2 Servicios y Responsabilidades" />
      <div className="space-y-3 mt-2">
        {[
          { name: "Servicio Gateway", desc: "Receptor de webhooks HubSpot (Signature V3), procesamiento asincrono (Celery), estado canonico PostgreSQL + Redis, distribucion push, DLQ con reintentos, bitacora de auditoria." },
          { name: "Servicio Kiosko", desc: "App movil con mapa interactivo por capas (MapLibre), soporte GIS (Shapefile/KMZ/KML), detalle de lotes, visor PDF, flujo de cotizacion con HubSpot, cola offline (WatermelonDB)." },
          { name: "Panel Administrativo", desc: "GIS Manager (carga, validacion WGS84, versionado, rollback), Storage Manager (PDFs drag & drop), Sync Ops (webhooks, lag, DLQ), notificaciones y acciones operativas." },
        ].map(s => (
          <div key={s.name} className="rounded-lg border border-[#E8E0D4] p-3 bg-[#FDFBF7]">
            <div className="text-[11px] font-bold mb-1" style={{ color: NAVY }}>{s.name}</div>
            <div className="text-[10px] text-gray-500 leading-relaxed">{s.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function SecDiseno() {
  const guidelines = [
    ["Estilo", "Minimalista de lujo, fotografia aspiracional, espacios en blanco"],
    ["Paleta", "Fondos neutros (blancos, grises), texto oscuro (#2D2D2D)"],
    ["Acentos", "Dorado (#B8860B) para CTAs, iconos, elementos de marca"],
    ["Tipografia", "Droid Sans / Inter, pesos 400/700"],
    ["Layout", "Modular con tarjetas, secciones full-width, hero sections"],
    ["Navegacion", "Dual: barra horizontal + hamburguesa secundaria"],
    ["CTAs", "Botones prominentes: DESCUBRE, MAS INFO, COTIZAR"],
    ["Touch", "Targets 48px min, swipe, feedback visual inmediato"],
    ["Responsive", "Mobile-first, breakpoints 768px / 1200px"],
  ];

  return (
    <>
      <SectionTitle num="4" title="Diseno UI/UX" />
      <SubTitle title="4.1 Lineamientos de Diseno" />
      <P>El diseno de todas las interfaces sigue el lenguaje visual del sitio lasriberas.mx para mantener coherencia de marca.</P>
      <STable>
        <THead><TH>Aspecto</TH><TH>Especificacion</TH></THead>
        <tbody>
          {guidelines.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"}>
              <TD className="font-semibold whitespace-nowrap">{r[0]}</TD>
              <TD>{r[1]}</TD>
            </tr>
          ))}
        </tbody>
      </STable>

      <SubTitle title="4.2 Componentes Reutilizables" />
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="rounded-lg border border-[#E8E0D4] p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>React Native (Kiosko)</div>
          {["PropertyCard — tarjeta de lote con imagen, estatus, precio", "InteractiveMap — Mapbox/MapLibre con capas y popups", "QuoteForm — formulario multi-paso de cotizacion", "StatusBadge — semaforo Disponible/Apartado/Vendido", "PDFViewer — visor nativo de modelos"].map(c => (
            <div key={c} className="text-[10px] text-gray-600 flex items-start gap-1.5 mb-1">
              <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" style={{ color: GOLD }} />
              <span>{c}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-[#E8E0D4] p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>React (Panel Admin)</div>
          {["DragDropUploader — carga con preview y validacion", "NotificationPanel — alertas con prioridad y accion", "SyncDashboard — estado de webhooks y fallas", "GISPreview — preview geoespacial sobre mapa web"].map(c => (
            <div key={c} className="text-[10px] text-gray-600 flex items-start gap-1.5 mb-1">
              <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" style={{ color: GOLD }} />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SecModelo() {
  const tables = [
    ["inventory_lots", "id, external_id, section, status, price, geom (PostGIS), hubspot_record_id", "Estado canonico sincronizado desde HubSpot"],
    ["sync_events", "id, event_id (unique), cursor, entity_type, change_type, payload (JSONB)", "Bitacora de eventos (deduplicacion)"],
    ["push_log", "id, target, event_id, attempt, status, response_code, sent_at", "Registro de distribuciones a APIs"],
    ["dead_letter_queue", "id, event_id, target, payload, error, retries, next_retry_at", "Fallas para analisis y reintento"],
    ["quotes", "id, folio, prospect_name, email, lot_id, hubspot_deal_id, status", "Cotizaciones con trazabilidad HubSpot"],
    ["gis_versions", "id, filename, file_type, version, datum, validated, active", "Versionado de archivos GIS"],
    ["content_assets", "id, category (pdf/media), storage_path, mime_type, size_bytes", "Assets multimedia"],
  ];

  return (
    <>
      <SectionTitle num="5" title="Modelo de Datos" />
      <SubTitle title="5.1 Base de Datos (PostgreSQL + PostGIS)" />
      <STable>
        <THead><TH>Tabla</TH><TH>Campos clave</TH><TH>Proposito</TH></THead>
        <tbody>
          {tables.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"}>
              <TD className="font-mono text-[10px] font-semibold whitespace-nowrap" style={{ color: GOLD }}>{r[0]}</TD>
              <TD className="text-[10px]">{r[1]}</TD>
              <TD className="text-[10px]">{r[2]}</TD>
            </tr>
          ))}
        </tbody>
      </STable>

      <SubTitle title="5.2 Contrato Canonico (JSON)" />
      <P>Formato de evento delta distribuido a Kiosko:</P>
      <pre className="rounded-lg p-4 text-[10px] font-mono leading-relaxed overflow-x-auto" style={{ backgroundColor: NAVY, color: "#A5D6A7" }}>
{`{
  "event_id": "uuid",
  "cursor": 12345,
  "occurred_at": "ISO8601",
  "entity_type": "lot|house",
  "external_id": "HS-12345",
  "change_type": "updated",
  "changed_fields": ["status", "price"],
  "snapshot": {
    "status": "available",
    "price": 3500000
  }
}`}
      </pre>
    </>
  );
}

function SecAPIs() {
  const methodColor: Record<string, string> = {
    GET: "bg-emerald-500", POST: "bg-blue-500", PUT: "bg-amber-500",
    PATCH: "bg-amber-500", DELETE: "bg-red-500",
  };

  const webhooksSync = [
    ["POST", "/webhooks/hubspot", "Receptor webhooks, validacion firma V3"],
    ["POST", "/api/v1/sync/resync", "Forzar resync completo"],
    ["GET", "/api/v1/sync/status", "Estado de sincronizacion"],
    ["GET", "/api/v1/dlq", "Dead-letter queue"],
    ["POST", "/api/v1/dlq/{id}/retry", "Reintento manual DLQ"],
    ["GET", "/health", "Health check"],
  ];
  const auth = [
    ["POST", "/api/v1/auth/login", "Inicio de sesion, retorna access + refresh token"],
    ["POST", "/api/v1/auth/logout", "Invalida sesion y refresh token"],
    ["POST", "/api/v1/auth/refresh", "Renueva access token con refresh token"],
    ["POST", "/api/v1/auth/forgot-password", "Solicitud de restablecimiento de contrasena"],
    ["POST", "/api/v1/auth/reset-password", "Restablece contrasena con token temporal"],
  ];
  const users = [
    ["GET", "/api/v1/users", "Listado de usuarios con paginacion"],
    ["POST", "/api/v1/users", "Crear usuario con rol asignado"],
    ["GET", "/api/v1/users/{id}", "Detalle de usuario"],
    ["PUT", "/api/v1/users/{id}", "Actualizar datos de usuario"],
    ["DELETE", "/api/v1/users/{id}", "Eliminar usuario"],
    ["PATCH", "/api/v1/users/{id}/role", "Cambiar rol de usuario"],
  ];
  const inventoryQuotes = [
    ["GET", "/api/v1/inventory", "Inventario canonico con filtros (estatus, seccion, precio)"],
    ["GET", "/api/v1/inventory/{id}", "Detalle de lote/casa"],
    ["GET", "/api/v1/inventory/geojson", "Capas GeoJSON para mapa interactivo"],
    ["POST", "/api/v1/quotes", "Cotizacion desde Kiosko"],
    ["GET", "/api/v1/quotes", "Listado de cotizaciones (Panel Admin)"],
    ["GET", "/api/v1/quotes/{id}", "Detalle de cotizacion"],
  ];
  const gis = [
    ["GET", "/api/v1/gis", "Listado de archivos GIS con version y estado"],
    ["POST", "/api/v1/gis/upload", "Carga Shapefile/KMZ/KML, validacion WGS84"],
    ["GET", "/api/v1/gis/{id}", "Detalle de archivo GIS"],
    ["GET", "/api/v1/gis/{id}/versions", "Historial de versiones"],
    ["POST", "/api/v1/gis/{id}/rollback/{version}", "Rollback a version anterior"],
    ["DELETE", "/api/v1/gis/{id}", "Eliminar archivo GIS"],
    ["GET", "/api/v1/gis/{id}/preview", "Preview GeoJSON para mapa web"],
  ];
  const assets = [
    ["GET", "/api/v1/assets", "Listado de assets (PDFs, imagenes)"],
    ["POST", "/api/v1/assets/upload", "Carga con validacion de formato/peso"],
    ["GET", "/api/v1/assets/{id}", "Detalle de asset"],
    ["DELETE", "/api/v1/assets/{id}", "Eliminar asset"],
    ["GET", "/api/v1/assets/{id}/url", "Presigned URL temporal para descarga"],
  ];
  const notifDashboard = [
    ["GET", "/api/v1/notifications", "Listado de alertas con prioridad"],
    ["PATCH", "/api/v1/notifications/{id}/read", "Marcar notificacion como leida"],
    ["GET", "/api/v1/notifications/unread-count", "Contador de no leidas (badge)"],
    ["GET", "/api/v1/dashboard/metrics", "Metricas clave para dashboard principal"],
  ];
  const kiosko = [
    ["POST", "/sync/v1/inventory/events", "Deltas canonicos (idempotente)"],
    ["POST", "/sync/v1/inventory/snapshot", "Snapshot completo"],
    ["POST", "/sales/v1/quote", "Solicitud de cotizacion"],
    ["GET", "/sales/v1/quote/{folio}", "Consultar estado de cotizacion"],
    ["GET", "/api/v1/amenities", "Informacion de amenidades"],
    ["GET", "/health", "Estado del servicio"],
  ];

  const renderApi = (title: string, rows: string[][]) => (
    <>
      <SubTitle title={title} />
      <STable>
        <THead><TH>Metodo</TH><TH>Endpoint</TH><TH>Descripcion</TH></THead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"}>
              <TD>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white ${methodColor[r[0]] || "bg-gray-500"}`}>
                  {r[0]}
                </span>
              </TD>
              <TD className="font-mono text-[10px]" style={{ color: NAVY }}>{r[1]}</TD>
              <TD className="text-[10px]">{r[2]}</TD>
            </tr>
          ))}
        </tbody>
      </STable>
    </>
  );

  return (
    <>
      <SectionTitle num="6" title="Especificacion de APIs" />
      {renderApi("6.1 Gateway API — Webhooks & Sync", webhooksSync)}
      <Divider />
      {renderApi("6.2 Gateway API — Autenticacion", auth)}
      <Divider />
      {renderApi("6.3 Gateway API — Usuarios", users)}
      <Divider />
      {renderApi("6.4 Gateway API — Inventario & Cotizaciones", inventoryQuotes)}
      <Divider />
      {renderApi("6.5 Gateway API — GIS Manager", gis)}
      <Divider />
      {renderApi("6.6 Gateway API — Storage / Assets", assets)}
      <Divider />
      {renderApi("6.7 Gateway API — Notificaciones & Dashboard", notifDashboard)}
      <Divider />
      {renderApi("6.8 Kiosko API", kiosko)}
    </>
  );
}

function SecSeguridad() {
  const rows = [
    ["HubSpot -> Gateway", "Signature V3 (HMAC-SHA256)", "Validacion en cada webhook"],
    ["Gateway -> Kiosko", "HMAC servicio-a-servicio", "Secreto compartido rotable"],
    ["Panel Admin", "JWT + RBAC", "Tokens cortos, roles admin/editor/viewer"],
    ["Secretos", "Vault / Secret Manager", "Sin credenciales en codigo"],
    ["Transporte", "TLS 1.3", "Let's Encrypt, renovacion automatica"],
    ["Storage", "Presigned URLs", "Acceso temporal, sin bucket expuesto"],
    ["Auditoria", "Bitacora inmutable", "Trazable por event_id y external_id"],
    ["Red", "Allowlist de IPs", "Solo IPs HubSpot en webhooks"],
    ["Dispositivos", "Kiosk mode + MDM", "Bloqueo navegacion, USB, auto-lock"],
    ["Validacion", "Sanitizacion server-side", "Anti XSS/SQL injection"],
    ["Rate limiting", "Throttling IP/endpoint", "Backoff exponencial interno"],
    ["Privacidad", "LFPDPPP", "Aviso de privacidad, consentimiento, cifrado"],
    ["Dependencias", "Escaneo automatizado", "npm audit, container scanning en CI"],
    ["Sesiones", "Expiracion + invalidacion", "JWT 15min/7d, logout remoto"],
  ];

  return (
    <>
      <SectionTitle num="7" title="Seguridad" />
      <STable>
        <THead><TH>Capa</TH><TH>Mecanismo</TH><TH>Detalle</TH></THead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"}>
              <TD className="font-semibold whitespace-nowrap">{r[0]}</TD>
              <TD className="whitespace-nowrap">{r[1]}</TD>
              <TD>{r[2]}</TD>
            </tr>
          ))}
        </tbody>
      </STable>
    </>
  );
}

function SecPlan() {
  const phases = [
    ["0", "Setup & Fundamentos", "2 sem", "Monorepo, CI/CD, Docker, PostgreSQL + PostGIS, MinIO, esquema base"],
    ["1", "Gateway + HubSpot", "3 sem", "Webhooks, estado canonico, batch read, push, DLQ, tests de integracion"],
    ["2", "Kiosko MVP", "4 sem", "Mapa interactivo, capas GIS, detalle lote, visor PDF, cotizacion"],
    ["3", "Panel Administrativo", "3 sem", "GIS Manager, Storage Manager, Sync Ops, notificaciones"],
    ["4", "Offline & Hardening", "2 sem", "WatermelonDB, cache, cola offline, seguridad, builds iOS/Android"],
    ["5", "QA & Deploy", "2 sem", "Testing E2E, aceptacion, deploy productivo, documentacion, handover"],
  ];
  const hours = [
    ["Tech Lead / Arquitecto", "80", "120", "160", "80", "70", "70", "580"],
    ["Backend Developer", "80", "120", "160", "110", "50", "40", "560"],
    ["Frontend Developer (RN)", "40", "60", "160", "100", "60", "40", "460"],
    ["QA Engineer", "48", "72", "96", "60", "36", "24", "336"],
    ["Total por fase", "248", "372", "576", "350", "216", "174", "1,936"],
  ];
  const kanban = [
    ["Horas - API", "Gateway, HubSpot, APIs, GIS backend, Celery/Redis", "~1,140h"],
    ["Horas - Web", "Panel Admin React (11 pantallas)", "~250-300h"],
    ["Mobile - App", "Kiosko (10 pantallas) en React Native", "~460h"],
    ["Horas - DevOps", "Docker, CI/CD, monitoreo, deploy, seguridad", "~180-220h"],
    ["Horas - QA", "Testing E2E, integracion, aceptacion, offline", "~336h"],
  ];

  return (
    <>
      <SectionTitle num="8" title="Plan de Implementacion" />
      <SubTitle title="8.1 Fases del Proyecto" />
      <STable>
        <THead><TH>Fase</TH><TH>Duracion</TH><TH>Entregables Clave</TH></THead>
        <tbody>
          {phases.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"}>
              <TD className="font-semibold whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white" style={{ backgroundColor: GOLD }}>{r[0]}</span>
                  {r[1]}
                </span>
              </TD>
              <TD className="whitespace-nowrap font-medium">{r[2]}</TD>
              <TD>{r[3]}</TD>
            </tr>
          ))}
        </tbody>
      </STable>
      <div className="mt-3 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold border" style={{ borderColor: GOLD, color: NAVY }}>
          <CalendarDays className="w-3.5 h-3.5" style={{ color: GOLD }} />
          Duracion total: 16 semanas (~4 meses)
        </span>
      </div>

      <SubTitle title="8.3 Desglose de Horas por Fase y Rol" />
      <div className="overflow-x-auto rounded-lg border border-[#E8E0D4]">
        <table className="w-full text-left">
          <THead>
            <TH>Rol</TH>
            <TH>F0</TH><TH>F1</TH><TH>F2</TH><TH>F3</TH><TH>F4</TH><TH>F5</TH>
            <TH>Total</TH>
          </THead>
          <tbody>
            {hours.map((r, i) => (
              <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"} ${i === hours.length - 1 ? "font-bold border-t-2" : ""}`}
                style={i === hours.length - 1 ? { borderColor: GOLD + "60" } : {}}>
                <TD className="font-semibold whitespace-nowrap text-[10px]">{r[0]}</TD>
                {r.slice(1).map((c, j) => (
                  <TD key={j} className={`text-center text-[10px] ${j === r.length - 2 ? "font-bold" : ""}`}
                    style={j === r.length - 2 ? { color: GOLD } : {}}>{c}</TD>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubTitle title="8.4 Distribucion por Area Tecnica" />
      <STable>
        <THead><TH>Columna</TH><TH>Que incluye</TH><TH>Horas</TH></THead>
        <tbody>
          {kanban.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"}>
              <TD className="font-semibold whitespace-nowrap">{r[0]}</TD>
              <TD>{r[1]}</TD>
              <TD className="font-bold whitespace-nowrap" style={{ color: GOLD }}>{r[2]}</TD>
            </tr>
          ))}
        </tbody>
      </STable>
    </>
  );
}

function SecCriterios() {
  const groups = [
    { title: "9.1 Sincronizacion y Tiempo Real", items: [
      "Cambios en HubSpot reflejados en Kiosko en < 10 segundos.",
      "Ante fallas, convergencia mediante reintentos exponenciales o resync.",
      "Idempotencia garantizada: duplicados no generan inconsistencias.",
    ]},
    { title: "9.2 Cotizacion con Trazabilidad", items: [
      "Solicitud crea/actualiza Contact, crea Deal y asocia al lote en HubSpot.",
      "Correo de cotizacion via workflow HubSpot con registro completo.",
      "Folio unico asignado con estado consultable.",
    ]},
    { title: "9.3 GIS Operativo", items: [
      "Cargar, validar, versionar y rollback de archivos WGS84.",
      "Atributos publicados a HubSpot y distribuidos a Kiosko.",
      "Geometrias renderizadas con < 200ms de respuesta en pan/zoom.",
    ]},
    { title: "9.4 Contenido Operable", items: [
      "Gestion de PDFs via drag & drop sin intervencion tecnica.",
      "Validacion automatica de formatos y peso.",
      "Archivos GIS versionados con rollback disponible.",
    ]},
    { title: "9.5 Rendimiento", items: [
      "Carga inicial de Kiosko: < 3 segundos.",
      "Modo offline con contenido cacheado y ultimo estado conocido.",
      "Operaciones GIS en Panel Admin en < 30 segundos.",
    ]},
  ];

  return (
    <>
      <SectionTitle num="9" title="Criterios de Aceptacion" />
      <div className="space-y-3">
        {groups.map(g => (
          <div key={g.title} className="rounded-lg border border-[#E8E0D4] p-3">
            <div className="text-[11px] font-bold mb-2" style={{ color: NAVY }}>{g.title}</div>
            {g.items.map((item, i) => (
              <div key={i} className="flex items-start gap-2 mb-1">
                <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: GOLD }} />
                <span className="text-[10px] text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function SecPantallas() {
  const kiosko = [
    ["K-01", "Mapa Interactivo (Home)", "Mapa con capas: colindancias, secciones, amenidades, lotes"],
    ["K-02", "Selector de Capas", "Controles para activar/desactivar capas GIS"],
    ["K-03", "Popup de Lote", "Popup: resumen, estatus, precio, CTA 'Ver detalle'"],
    ["K-04", "Detalle de Lote/Casa", "Estatus, precio, area, galeria, botones PDF y Cotizar"],
    ["K-05", "Visor de PDF", "Visor nativo del modelo arquitectonico"],
    ["K-06", "Cotizacion - Datos", "Formulario: nombre, email, telefono, lotes"],
    ["K-07", "Cotizacion - Confirmacion", "Resumen con folio y estado 'Enviada'"],
    ["K-08", "Listado Inventario", "Vista lista/grid con filtros"],
    ["K-09", "Amenidades", "Detalle de amenidades y areas verdes"],
    ["K-10", "Offline", "Datos cacheados, cola de cotizaciones pendientes"],
  ];
  const admin = [
    ["A-01", "Login", "Autenticacion JWT con roles"],
    ["A-02", "Dashboard", "Estado sync, alertas, metricas clave"],
    ["A-03", "GIS - Listado", "Archivos GIS con version y estado"],
    ["A-04", "GIS - Carga", "Upload Shapefile/KMZ/KML con validacion"],
    ["A-05", "GIS - Rollback", "Historial de versiones con rollback"],
    ["A-06", "Storage PDFs", "Gestion de PDFs de modelos"],
    ["A-07", "Sync - Dashboard", "Webhooks, lag, fallas, ultimas sync"],
    ["A-08", "Sync - DLQ", "Eventos fallidos con reintento"],
    ["A-09", "Sync - Resync", "Forzar resync desde HubSpot"],
    ["A-10", "Notificaciones", "Alertas: formato, GIS, integracion"],
    ["A-11", "Usuarios", "CRUD con roles (solo admin)"],
  ];

  const renderScreens = (title: string, rows: string[][]) => (
    <>
      <SubTitle title={title} />
      <STable>
        <THead><TH>#</TH><TH>Pantalla</TH><TH>Descripcion</TH></THead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"}>
              <TD className="font-mono font-bold whitespace-nowrap" style={{ color: GOLD }}>{r[0]}</TD>
              <TD className="font-semibold whitespace-nowrap">{r[1]}</TD>
              <TD>{r[2]}</TD>
            </tr>
          ))}
        </tbody>
      </STable>
    </>
  );

  return (
    <>
      <SectionTitle num="10" title="Inventario de Pantallas" />
      {renderScreens("10.1 App Kiosko (React Native) — 10 pantallas", kiosko)}
      <Divider />
      {renderScreens("10.2 Panel Administrativo (React) — 11 pantallas", admin)}
      <Divider />
      <div className="grid grid-cols-3 gap-3 mt-2">
        {[
          { app: "Kiosko", type: "React Native", count: "10" },
          { app: "Panel Admin", type: "React Web", count: "11" },
          { app: "Total", type: "Sistema completo", count: "21" },
        ].map(s => (
          <div key={s.app} className={`rounded-lg p-3 text-center border ${s.app === "Total" ? "border-2" : "border-[#E8E0D4]"}`}
            style={s.app === "Total" ? { borderColor: GOLD, backgroundColor: GOLD + "08" } : {}}>
            <div className="text-lg font-bold" style={{ color: s.app === "Total" ? GOLD : NAVY }}>{s.count}</div>
            <div className="text-[11px] font-semibold" style={{ color: NAVY }}>{s.app}</div>
            <div className="text-[9px] text-gray-400">{s.type}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function SecRiesgos() {
  const rows = [
    ["Modelado HubSpot no definido", "Alto", "Media", "Custom properties; migrar a custom objects si se requiere"],
    ["Archivos GIS con datum incorrecto", "Medio", "Media", "Validacion automatica con rechazo y mensaje claro"],
    ["Limites de rate HubSpot API", "Medio", "Baja", "Batch read, cache agresivo, backoff exponencial"],
    ["Conectividad inestable en sitio", "Alto", "Media", "WatermelonDB offline-first, cola local"],
    ["Latencia en renderizado GIS", "Medio", "Baja", "Vector tiles, simplificacion, cache GeoJSON"],
    ["Cambios de alcance", "Alto", "Media", "Proceso formal de control de cambios (seccion 13)"],
  ];

  return (
    <>
      <SectionTitle num="11" title="Riesgos y Mitigaciones" />
      <STable>
        <THead><TH>Riesgo</TH><TH>Impacto</TH><TH>Prob.</TH><TH>Mitigacion</TH></THead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"}>
              <TD className="font-semibold">{r[0]}</TD>
              <TD>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white ${r[1] === "Alto" ? "bg-red-500" : "bg-amber-500"}`}>
                  {r[1]}
                </span>
              </TD>
              <TD className="text-[10px]">{r[2]}</TD>
              <TD>{r[3]}</TD>
            </tr>
          ))}
        </tbody>
      </STable>
    </>
  );
}

function SecSupuestos() {
  const items = [
    "Acceso y credenciales a HubSpot (API key / Private App) disponibles antes de Fase 1.",
    "Archivos GIS entregados por el cliente en WGS84 con external_id por entidad.",
    "La decision de infraestructura (proveedor, dominios, certificados) se define antes del despliegue productivo.",
    "El cliente provee assets (imagenes, PDFs de modelos) en formatos estandar.",
    "Definiciones pendientes (modelado HubSpot, diccionario GIS) se resuelven durante Fase 0.",
    "Herramienta de desarrollo IA: Se utilizara Claude (plan MAX individual) como asistente de desarrollo durante todo el periodo de implementacion (16 semanas). El costo de la suscripcion se incluira como partida adicional en el presupuesto final. (Precio pendiente de agregar.)",
  ];

  return (
    <>
      <SectionTitle num="12" title="Supuestos y Dependencias" />
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 rounded-lg border border-[#E8E0D4] p-3 bg-[#FDFBF7]">
            <Link2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: GOLD }} />
            <span className="text-[11px] text-gray-600">{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function SecControl() {
  const steps = [
    "Descripcion del cambio solicitado y justificacion.",
    "Analisis de impacto en costo, tiempo y arquitectura.",
    "Aprobacion formal por ambas partes antes de implementacion.",
    "Actualizacion del documento de alcance y esta propuesta tecnica.",
  ];

  return (
    <>
      <SectionTitle num="13" title="Control de Cambios" />
      <P>
        Cualquier cambio que altere modelo de datos en HubSpot, contrato canonico, reglas de workflows,
        nuevas integraciones o modificaciones mayores de UX se gestionara mediante solicitud formal que incluya:
      </P>
      <div className="space-y-2 mt-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-[#E8E0D4] p-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: GOLD }}>
              {i + 1}
            </span>
            <span className="text-[11px] text-gray-600">{step}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center text-[10px] text-gray-400 italic">
        Documento preparado para: Las Riberas — Marzo 2026
      </div>
    </>
  );
}

// ══════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════

const sectionComponents: Record<string, () => JSX.Element> = {
  resumen: SecResumen,
  stack: SecStack,
  arquitectura: SecArquitectura,
  diseno: SecDiseno,
  modelo: SecModelo,
  apis: SecAPIs,
  seguridad: SecSeguridad,
  plan: SecPlan,
  criterios: SecCriterios,
  pantallas: SecPantallas,
  riesgos: SecRiesgos,
  supuestos: SecSupuestos,
  control: SecControl,
};

export function PropuestaApp() {
  const [activeSection, setActiveSection] = useState("resumen");
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Intersection Observer for TOC sync
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        root: contentRef.current,
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0,
      }
    );

    const refs = sectionRefs.current;
    Object.values(refs).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex rounded-xl border border-[#E8E0D4] overflow-hidden bg-white" style={{
        height: "calc(100vh - 260px)",
        minHeight: "600px",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.03), 0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 40px -8px rgba(0,0,0,0.08)",
      }}>
        {/* ── TOC Sidebar ── */}
        <div className="w-56 shrink-0 flex flex-col border-r overflow-y-auto" style={{ backgroundColor: NAVY }}>
          <div className="px-4 py-4 border-b border-white/10">
            <p className="text-white/40 text-[9px] uppercase tracking-widest font-semibold">Propuesta Tecnica</p>
            <p className="text-white text-xs font-semibold mt-0.5">Las Riberas</p>
            <p className="text-white/30 text-[9px] mt-0.5">v1.0 — Marzo 2026</p>
          </div>
          <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
            {sections.map((s) => {
              const isActive = s.id === activeSection;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-[10px] transition-all duration-200 ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-white/45 hover:text-white/75 hover:bg-white/5"
                  }`}
                >
                  <span className={`w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold shrink-0 ${
                    isActive ? "text-white" : "text-white/40"
                  }`} style={isActive ? { backgroundColor: GOLD } : { backgroundColor: "rgba(255,255,255,0.08)" }}>
                    {s.num}
                  </span>
                  <span className="truncate">{s.label}</span>
                  {isActive && (
                    <ChevronRight className="w-3 h-3 ml-auto shrink-0" style={{ color: GOLD }} />
                  )}
                </button>
              );
            })}
          </nav>
          <div className="px-4 py-3 border-t border-white/10">
            <div className="text-[9px] text-white/25">13 secciones</div>
          </div>
        </div>

        {/* ── Content Area ── */}
        <div ref={contentRef} className="flex-1 overflow-y-auto" style={{ scrollBehavior: "smooth" }}>
          <div className="p-8 space-y-10">
            {sections.map((s) => {
              const Component = sectionComponents[s.id];
              return (
                <div
                  key={s.id}
                  id={s.id}
                  ref={(el) => { sectionRefs.current[s.id] = el; }}
                  className="scroll-mt-4"
                >
                  <Component />
                  {s.id !== "control" && (
                    <div className="h-px mt-8" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)` }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
