# Propuesta Tecnica — Plataforma Digital Las Riberas

**Pantalla | Kiosko | Integracion HubSpot**

Frontend: React (Panel Admin web) + React Native (Pantalla y Kiosko mobile) | Backend: Python

Version 1.0 — Marzo 2026

---

## 1. Resumen Ejecutivo

La presente propuesta tecnica detalla la arquitectura, stack tecnologico y plan de implementacion para la Plataforma Digital Las Riberas, compuesta por tres soluciones integradas: **Pantalla** (Digital Signage), **Kiosko** (Sales Enablement) e **Integracion con HubSpot** (Gateway), junto con un Panel Administrativo compartido.

La solucion se construira con **React Native** para las aplicaciones moviles (Pantalla y Kiosko), **React** para el Panel Administrativo web, y **Python** en el backend. El diseno seguira el lenguaje visual del sitio actual lasriberas.mx: estetica minimalista de lujo, paleta neutra con acentos dorados, tipografia sans-serif y layout modular orientado a la experiencia inmobiliaria premium.

HubSpot se establece como fuente unica de verdad (SSOT) para inventario, estatus comercial, precios y trazabilidad de cotizaciones. El Gateway centraliza toda la comunicacion con el CRM, distribuyendo deltas y snapshots a Pantalla y Kiosko mediante un patron push.

---

## 2. Stack Tecnologico

### 2.1 Apps Moviles — Pantalla y Kiosko (React Native)

| Componente | Tecnologia | Justificacion |
|---|---|---|
| Framework base | React Native 0.76+ + TypeScript | Apps nativas iOS/Android desde un solo codebase, rendimiento nativo |
| Navegacion | React Navigation 7 | Navegacion nativa fluida, deep linking, gestos nativos |
| State management | Zustand + TanStack Query | Estado local ligero + cache de datos del servidor con sync automatico |
| Mapas interactivos | react-native-mapbox-gl (MapLibre) | Renderizado nativo de mapas, soporte GeoJSON/tiles, gestos touch nativos |
| UI Components | NativeWind (Tailwind para RN) | Utility-first styling consistente con el Panel Admin web |
| Offline / Storage | WatermelonDB + AsyncStorage | Base de datos offline-first para inventario + almacenamiento de estado |
| Animaciones | React Native Reanimated 3 | Animaciones a 60fps en el hilo nativo para idle mode y transiciones |
| Video player | react-native-video | Playlist de idle mode, fallback automatico, reproduccion nativa |
| PDF viewer | react-native-pdf | Visor nativo de PDFs de modelos inmobiliarios |
| Push notifications | Firebase Cloud Messaging (FCM) | Notificaciones push para actualizaciones de inventario en tiempo real |
| Build & Deploy | Expo (managed workflow) o bare workflow | OTA updates, builds en la nube (EAS Build), distribucion TestFlight/Play Store |
| Testing | Jest + React Native Testing Library + Detox | Unit, integracion y E2E nativo |

### 2.2 Panel Administrativo Web (React)

| Componente | Tecnologia | Justificacion |
|---|---|---|
| Framework base | React 18 + TypeScript | Ecosistema maduro, tipado fuerte, amplia comunidad |
| Build tool | Vite | HMR instantaneo, builds optimizados, soporte nativo de TS |
| State management | Zustand + TanStack Query | Consistencia con las apps moviles, cache de servidor |
| UI Components | Tailwind CSS + Headless UI | Utility-first responsive, componentes accesibles |
| Drag & Drop | dnd-kit | Upload de contenido (banners, videos, calendarios, PDFs) |
| Mapas (GIS Manager) | MapLibre GL JS | Preview de archivos GIS en el navegador |
| Testing | Vitest + React Testing Library + Playwright | Unit, integracion y E2E |

### 2.3 Backend (Python)

| Componente | Tecnologia | Justificacion |
|---|---|---|
| Framework API | FastAPI | Async nativo, validacion Pydantic, OpenAPI automatico, alto rendimiento |
| ORM / DB | SQLAlchemy 2.0 + Alembic | Async sessions, migraciones versionadas |
| Base de datos | PostgreSQL 16 + PostGIS | Soporte geoespacial nativo para WGS84 / GeoJSON |
| Cache / Pub-Sub | Redis 7 | Cache de estado canonico, pub-sub para push en tiempo real |
| Cola de tareas | Celery + Redis (broker) | Procesamiento asincrono de webhooks, reintentos y DLQ |
| Object storage | MinIO (S3-compatible) | PDFs, videos, imagenes, calendarios. Compatible con cualquier cloud |
| GIS processing | Fiona + Shapely + PyProj | Lectura de Shapefile/KMZ/KML, validacion WGS84, conversion GeoJSON |
| HubSpot SDK | hubspot-api-client (Python) | Operaciones CRM: contacts, deals, webhooks, batch read |
| Auth | JWT (PyJWT) + HMAC signatures | Panel Admin (JWT) y servicio-a-servicio (HMAC) |
| Testing | pytest + httpx + factory-boy | Async tests, fixtures, cobertura minima 80% |

### 2.4 Infraestructura y DevOps

| Componente | Tecnologia |
|---|---|
| Contenerizacion | Docker + Docker Compose |
| Orquestacion | Docker Swarm o Kubernetes (segun escala) |
| CI/CD | GitHub Actions |
| Reverse proxy | Nginx / Traefik con TLS automatico |
| Monitoreo | Prometheus + Grafana + Loki |
| Alertas | Grafana Alerting + integracion Slack/email |
| Hosting recomendado | DigitalOcean App Platform / AWS ECS (flexible) |

---

## 3. Arquitectura del Sistema

### 3.1 Diagrama de Arquitectura (Alto Nivel)

El sistema sigue un patron de arquitectura orientada a eventos con el Gateway como hub central:

```
                        HubSpot (SSOT)
                             |
                          webhooks
                             v
          [ Gateway / Integracion ]  <-->  [ Panel Administrativo ]
            |  push deltas/snapshots         React Web (admin)
            |
       +----+--------+
       v              v
  [ Pantalla ]   [ Kiosko ]
  React Native   React Native
  App Movil      App Movil
```

### 3.2 Servicios y Responsabilidades

#### Servicio Gateway (Python / FastAPI)

- Receptor unico de webhooks de HubSpot con validacion de firma (Signature V3).
- Procesamiento asincrono (Celery): deduplicacion por event_id, batch read del estado final.
- Mantenimiento de estado canonico en PostgreSQL + cache Redis.
- Distribucion push de deltas y snapshots a Pantalla API y Kiosko API.
- Operaciones CRM: upsert Contact, creacion de Deal, asociaciones lote/casa.
- Dead-letter queue (DLQ) para fallas persistentes con reintentos configurables.
- Bitacora de auditoria: cada event_id y external_id trazable.

#### Servicio Pantalla (React Native + FastAPI)

- Aplicacion movil nativa touch-first full-screen: banner superior + area central interactiva.
- Menu dinamico: Desarrollo, Bienes Raices, Club, Maderas, Nona, Calendario.
- Idle mode: activacion a 30s de inactividad, playlist de videos/imagenes, fallback automatico.
- Calendario mensual navegable con imagenes desde object storage.
- Integracion OpenTable via widget/overlay para Maderas.
- API propia: `POST /sync/v1/inventory/events`, `POST /sync/v1/inventory/snapshot`, `GET /health`.
- Degradacion offline con WatermelonDB + AsyncStorage: cache de contenido y last known state.
- Distribucion via App Store / Google Play o MDM corporativo para dispositivos en sitio.

#### Servicio Kiosko (React Native + FastAPI)

- Aplicacion movil con mapa interactivo nativo por capas (Mapbox/MapLibre): colindancias, secciones, lotes/casas, amenidades.
- Soporte GIS: Shapefile, KMZ, KML en WGS84, renderizado como GeoJSON/vector tiles.
- Detalle de lote/casa: estatus, precio (HubSpot) + atributos tecnicos (GIS).
- Visor de PDF de modelos desde object storage.
- Flujo de cotizacion: captura de prospecto, envio a Gateway, creacion de Contact + Deal en HubSpot.
- API propia: events, snapshot, `POST /sales/v1/quote`, `GET /health`.
- Cola de solicitudes offline (WatermelonDB) para reintento al recuperar conectividad.
- Distribucion via App Store / Google Play o tablets en punto de venta.

#### Panel Administrativo (React + FastAPI)

- **GIS Manager:** carga, validacion WGS84, versionado y rollback de archivos geoespaciales.
- **Storage & Content Manager:** portal drag & drop para banner, idle, calendario, PDFs.
- **Sync Ops:** dashboard de estado de webhooks, lag, fallas de push, ultimas sincronizaciones.
- **Notificaciones:** alertas por playlist vacia, formato invalido, errores GIS, fallas de integracion.
- **Acciones operativas:** resync manual, reintentos, inspeccion de DLQ.

---

## 4. Diseno UI/UX

### 4.1 Lineamientos de Diseno (basados en lasriberas.mx)

El diseno de todas las interfaces seguira el lenguaje visual del sitio actual de Las Riberas para mantener coherencia de marca:

| Aspecto | Especificacion |
|---|---|
| Estilo general | Minimalista de lujo, priorizando fotografia aspiracional y espacios en blanco |
| Paleta primaria | Fondos neutros (blancos, grises claros), texto oscuro (#2D2D2D) |
| Acentos | Dorado (#B8860B) para CTAs, iconos destacados y elementos de marca |
| Tipografia | Droid Sans (400/700) o Inter como alternativa web-optimizada |
| Layout | Modular con tarjetas, secciones full-width, hero sections para cada producto |
| Navegacion | Dual: barra horizontal principal + hamburguesa secundaria |
| CTAs | Botones prominentes con verbos de accion: DESCUBRE, MAS INFORMACION, COTIZAR |
| Interaccion touch | Targets minimos de 48px, gestos de swipe, feedback visual inmediato |
| Responsive | Mobile-first, breakpoints en 768px (tablet) y 1200px (desktop/pantalla) |

### 4.2 Componentes Reutilizables

Se construira un Design System compartido entre React Native (mobile) y React (web), alineado a la identidad visual de Las Riberas:

**Componentes React Native (Pantalla y Kiosko):**

- **PropertyCard:** tarjeta nativa de lote/casa con imagen, estatus (badge de color), precio y CTA.
- **InteractiveMap:** wrapper de Mapbox/MapLibre nativo con controles de capas, gestos touch y popups de detalle.
- **MediaCarousel:** carrusel full-screen para idle mode con animaciones nativas (Reanimated 3).
- **QuoteForm:** formulario multi-paso para solicitud de cotizacion con validacion en tiempo real.
- **StatusBadge:** indicador visual de estatus (Disponible/Apartado/Vendido) con colores semaforo.
- **CalendarGrid:** grilla mensual navegable renderizando imagenes desde storage.
- **PDFViewer:** visor nativo de PDFs de modelos inmobiliarios.
- **IdlePlayer:** reproductor de video/imagen full-screen con playlist y fallback automatico.

**Componentes React (Panel Administrativo web):**

- **DragDropUploader:** componente de carga con preview, validacion de formato/peso y barra de progreso.
- **NotificationPanel:** panel lateral de alertas con prioridad, timestamp y accion sugerida.
- **SyncDashboard:** visualizacion de estado de webhooks, lag y fallas.
- **GISPreview:** preview de archivos geoespaciales sobre mapa web.

---

## 5. Modelo de Datos

### 5.1 Base de Datos (PostgreSQL + PostGIS)

Esquema principal del Gateway para estado canonico y auditoria:

| Tabla | Campos clave | Proposito |
|---|---|---|
| `inventory_lots` | id, external_id, section, status, price, area_m2, lot_type, geom (PostGIS), pdf_url, hubspot_record_id, updated_at | Estado canonico de lotes/casas sincronizado desde HubSpot |
| `sync_events` | id, event_id (unique), cursor, occurred_at, entity_type, change_type, payload (JSONB), processed_at, status | Bitacora de eventos recibidos de HubSpot (deduplicacion) |
| `push_log` | id, target (pantalla/kiosko), event_id, attempt, status, response_code, sent_at | Registro de distribuciones a Pantalla/Kiosko API |
| `dead_letter_queue` | id, event_id, target, payload, error, retries, next_retry_at, created_at | Fallas persistentes para analisis y reintento manual |
| `quotes` | id, folio, prospect_name, email, phone, lot_id, hubspot_contact_id, hubspot_deal_id, status, created_at | Solicitudes de cotizacion con trazabilidad HubSpot |
| `gis_versions` | id, filename, file_type, version, datum, upload_by, validated, active, created_at | Versionado de archivos geoespaciales |
| `content_assets` | id, category (banner/idle/calendar/pdf), storage_path, mime_type, size_bytes, uploaded_by, created_at | Registro de assets multimedia |

### 5.2 Contrato Canonico (JSON)

Formato de evento delta distribuido a Pantalla y Kiosko:

```json
{
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
}
```

---

## 6. Especificacion de APIs

### 6.1 Gateway API

| Metodo | Endpoint | Descripcion |
|---|---|---|
| POST | `/webhooks/hubspot` | Receptor de webhooks con validacion de firma V3 |
| POST | `/api/v1/quotes` | Recibe solicitud de cotizacion desde Kiosko |
| GET | `/api/v1/inventory` | Consulta de inventario canonico (Panel Admin) |
| POST | `/api/v1/sync/resync` | Fuerza resync completo (accion operativa) |
| GET | `/api/v1/sync/status` | Estado de sincronizacion, lag y fallas |
| GET | `/api/v1/dlq` | Consulta de dead-letter queue |
| POST | `/api/v1/dlq/{id}/retry` | Reintento manual de evento en DLQ |
| GET | `/health` | Health check del servicio |

### 6.2 Pantalla API

| Metodo | Endpoint | Descripcion |
|---|---|---|
| POST | `/sync/v1/inventory/events` | Recibe deltas canonicos (idempotente por event_id) |
| POST | `/sync/v1/inventory/snapshot` | Recibe snapshot completo para bootstrap/recuperacion |
| GET | `/health` | Estado del servicio (last_cursor_applied, salud de cache) |

### 6.3 Kiosko API

| Metodo | Endpoint | Descripcion |
|---|---|---|
| POST | `/sync/v1/inventory/events` | Recibe deltas canonicos (idempotente por event_id) |
| POST | `/sync/v1/inventory/snapshot` | Recibe snapshot completo |
| POST | `/sales/v1/quote` | Solicitud de cotizacion, valida y envia a Gateway |
| GET | `/health` | Estado del servicio |

---

## 7. Seguridad

| Capa | Mecanismo | Detalle |
|---|---|---|
| HubSpot → Gateway | Signature V3 (HMAC-SHA256) | Validacion de firma en cada webhook recibido |
| Gateway → Pantalla/Kiosko | HMAC servicio-a-servicio | Firma de requests con secreto compartido rotable |
| Panel Admin | JWT + RBAC | Tokens de corta duracion, roles (admin/editor/viewer) |
| Secretos | Vault / Secret Manager | Sin credenciales en codigo, rotacion automatica |
| Transporte | TLS 1.3 obligatorio | Certificados Let's Encrypt con renovacion automatica |
| Object Storage | Presigned URLs | Acceso temporal a PDFs/media, sin exposicion directa del bucket |
| Auditoria | Bitacora inmutable | Cada operacion trazable por event_id y external_id |
| Red | Allowlist de IPs | Solo IPs de HubSpot permitidas en endpoint de webhooks |

---

## 8. Plan de Implementacion

### 8.1 Fases del Proyecto

| Fase | Duracion | Entregables Clave |
|---|---|---|
| **Fase 0:** Setup & Fundamentos | 2 semanas | Repositorio monorepo, CI/CD, Docker, PostgreSQL + PostGIS, MinIO, esquema base |
| **Fase 1:** Gateway + HubSpot | 3 semanas | Webhooks, estado canonico, batch read, distribucion push, DLQ, tests de integracion |
| **Fase 2:** Kiosko MVP | 4 semanas | Mapa interactivo, capas GIS, detalle de lote, visor PDF, flujo de cotizacion completo |
| **Fase 3:** Pantalla MVP | 3 semanas | Layout touch, menu dinamico, idle mode + playlist, calendario, integracion OpenTable |
| **Fase 4:** Panel Administrativo | 3 semanas | GIS Manager, Content Manager (drag & drop), Sync Ops dashboard, notificaciones |
| **Fase 5:** Offline & Hardening | 2 semanas | WatermelonDB sync, cache local, cola offline, pruebas de degradacion, seguridad, builds iOS/Android |
| **Fase 6:** QA & Deploy | 2 semanas | Testing E2E, pruebas de aceptacion, deploy productivo, documentacion, handover |

**Duracion total estimada: 19 semanas (aproximadamente 5 meses).**

### 8.2 Metodologia

- Sprints de 2 semanas con demos al final de cada sprint.
- Kanban board compartido (GitHub Projects o similar) con visibilidad para el cliente.
- Reuniones semanales de sincronizacion (30 min) y retrospectivas por fase.
- Entrega continua: cada merge a main despliega automaticamente a staging.
- Promocion a produccion controlada con aprobacion del cliente.

### 8.3 Desglose de Horas-Hombre por Fase y Rol

Se estima una jornada de **40 horas/semana por persona** a tiempo completo. Los roles parciales se indican con las horas reales asignadas. El equipo base contempla **8 roles** con dedicacion variable segun la fase.

#### Equipo y dedicacion por fase (horas totales)

| Rol | Fase 0 (2 sem) | Fase 1 (3 sem) | Fase 2 (4 sem) | Fase 3 (3 sem) | Fase 4 (3 sem) | Fase 5 (2 sem) | Fase 6 (2 sem) | **Total horas** |
|---|---|---|---|---|---|---|---|---|
| Tech Lead / Arquitecto | 80 | 120 | 160 | 120 | 90 | 80 | 80 | **730** |
| Backend Developer 1 | 80 | 120 | 160 | 60 | 120 | 60 | 40 | **640** |
| Backend Developer 2 | 40 | 120 | 80 | 60 | 90 | 60 | 40 | **490** |
| Frontend Developer 1 (RN) | 40 | 60 | 160 | 120 | 120 | 80 | 40 | **620** |
| Frontend Developer 2 (RN/Web) | — | — | 160 | 120 | 120 | 80 | 40 | **520** |
| DevOps Engineer | 80 | 60 | 40 | 30 | 30 | 60 | 80 | **380** |
| QA Engineer | — | — | 80 | 60 | 60 | 60 | 80 | **340** |
| UX/UI Designer | 40 | 90 | 80 | 60 | — | — | — | **270** |
| **Total por fase** | **360** | **570** | **920** | **630** | **630** | **480** | **400** | **3,990** |

#### Resumen de esfuerzo

| Metrica | Valor |
|---|---|
| Total horas-hombre del proyecto | **3,990 horas** |
| Duracion total | 19 semanas |
| Promedio de personas activas por semana | ~5.3 personas |
| Maximo de personas simultaneas | 8 (Fases 2 y 3) |
| Minimo de personas simultaneas | 5 (Fase 0) |

#### Notas sobre la asignacion

- **Tech Lead / Arquitecto:** Dedicacion completa durante todo el proyecto. Lidera definiciones de arquitectura en fases tempranas y code reviews / hardening en fases finales.
- **Backend Developers (2):** Dedicacion completa en Fases 1-2 (Gateway + APIs). En fases posteriores alternan entre soporte de API del Panel Admin y tareas de integracion.
- **Frontend Developer 1 (React Native):** Se incorpora parcialmente desde Fase 0 (setup del proyecto RN). Dedicacion completa desde Fase 2 en adelante para Kiosko, Pantalla y Panel Admin.
- **Frontend Developer 2 (React Native / Web):** Se incorpora en Fase 2 para el desarrollo paralelo de mapas y UI del Kiosko. Transiciona al Panel Admin web en Fase 4.
- **DevOps Engineer:** Alta dedicacion en Fase 0 (infraestructura base) y Fase 6 (deploy productivo). Dedicacion parcial el resto del proyecto para mantenimiento de CI/CD y monitoreo.
- **QA Engineer:** Se incorpora en Fase 2 con la primera funcionalidad testeable. Dedicacion completa en Fase 6 para pruebas de aceptacion y E2E.
- **UX/UI Designer:** Dedicacion parcial en Fases 0-3 para design system, wireframes y validacion de experiencia touch. No requerido en fases de hardening y deploy.

---

## 9. Criterios de Aceptacion

### 9.1 Sincronizacion y Tiempo Real

- Cambios en HubSpot (estatus/precio) reflejados en Pantalla y Kiosko en menos de 10 segundos bajo condiciones normales.
- Ante fallas temporales, el sistema converge mediante reintentos exponenciales o resync de snapshot.
- Idempotencia garantizada: eventos duplicados no generan estados inconsistentes.

### 9.2 Cotizacion con Trazabilidad

- Solicitud desde Kiosko crea/actualiza Contact, crea Deal y asocia al lote/casa en HubSpot.
- Correo de cotizacion enviado desde HubSpot (workflow) con registro completo en CRM.
- Folio unico asignado a cada cotizacion con estado consultable.

### 9.3 GIS Operativo

- Panel Administrativo permite cargar, validar, versionar y hacer rollback de archivos WGS84.
- Atributos tecnicos publicados automaticamente a HubSpot y distribuidos a Pantalla/Kiosko.
- Geometrias renderizadas en MapLibre con interaccion fluida (< 200ms de respuesta en pan/zoom).

### 9.4 Contenido Operable

- Marketing actualiza banner/idle/calendario mediante portal drag & drop sin intervencion tecnica.
- Validacion automatica de formatos y peso con feedback inmediato.
- Fallback automatico si playlist vacia o formato invalido, con alerta en Panel Administrativo.

### 9.5 Rendimiento

- Tiempo de carga inicial de Pantalla y Kiosko: < 3 segundos en conexion estandar.
- Modo offline operativo con contenido cacheado y ultimo estado conocido del inventario.
- Panel Administrativo: operaciones de carga y validacion GIS en menos de 30 segundos para archivos estandar.

---

## 10. Inventario de Pantallas / Screens

Basado en los requerimientos del documento de alcance, se estima el siguiente numero de pantallas unicas que vera el usuario en cada aplicacion:

### 10.1 App Pantalla (React Native) — 12 pantallas

| # | Pantalla | Descripcion |
|---|---|---|
| P-01 | Idle Mode (Full-screen) | Reproductor de playlist de videos/imagenes con transiciones, aparece tras 30s de inactividad |
| P-02 | Fallback Video | Video backup cuando playlist esta vacia o hay formatos no soportados |
| P-03 | Home / Menu Principal | Layout con banner superior + menu de secciones (Desarrollo, Bienes Raices, Club, etc.) |
| P-04 | Seccion Desarrollo | Contenido informativo del desarrollo Las Riberas |
| P-05 | Bienes Raices - Listado | Inventario de lotes/casas con estatus sincronizado desde HubSpot |
| P-06 | Bienes Raices - Detalle | Detalle de lote/casa: estatus, precio, atributos tecnicos |
| P-07 | Seccion Club | Contenido informativo del club |
| P-08 | Maderas (Reservaciones) | Overlay/WebView con widget de OpenTable para reservaciones |
| P-09 | Seccion Nona | Contenido informativo de Nona |
| P-10 | Calendario | Vista mensual navegable con imagenes (mes actual hacia adelante) |
| P-11 | Calendario - Detalle Evento | Detalle de imagen/evento del calendario seleccionado |
| P-12 | Sin Conexion (Offline) | Indicador de modo offline con last known state activo |

### 10.2 App Kiosko (React Native) — 10 pantallas

| # | Pantalla | Descripcion |
|---|---|---|
| K-01 | Mapa Interactivo (Home) | Mapa principal con capas: colindancias, secciones, amenidades, lotes/casas |
| K-02 | Selector de Capas | Controles para activar/desactivar capas GIS (overlay o panel lateral) |
| K-03 | Popup de Lote en Mapa | Popup al tocar un lote: resumen rapido con estatus, precio y CTA "Ver detalle" |
| K-04 | Detalle de Lote/Casa | Pantalla completa: estatus, precio, area, medidas, tipo, galeria, boton "Ver PDF" y "Cotizar" |
| K-05 | Visor de PDF del Modelo | Visor nativo del PDF del modelo arquitectonico |
| K-06 | Cotizacion - Datos del Prospecto | Formulario: nombre, email, telefono, lote(s) de interes |
| K-07 | Cotizacion - Confirmacion | Resumen de solicitud con folio asignado y estado "Enviada" |
| K-08 | Listado de Inventario | Vista alternativa en lista/grid del inventario con filtros (estatus, seccion, precio) |
| K-09 | Seccion Amenidades | Detalle de amenidades y areas verdes del desarrollo |
| K-10 | Sin Conexion (Offline) | Modo offline con datos cacheados, cola de cotizaciones pendientes |

### 10.3 Panel Administrativo Web (React) — 14 pantallas

| # | Pantalla | Descripcion |
|---|---|---|
| A-01 | Login | Autenticacion JWT con roles (admin/editor/viewer) |
| A-02 | Dashboard Principal | Vista general: estado de sincronizacion, alertas activas, metricas clave |
| A-03 | GIS Manager - Listado | Lista de archivos GIS cargados con version, estado y fecha |
| A-04 | GIS Manager - Carga/Validacion | Formulario de carga de Shapefile/KMZ/KML con validacion WGS84 y preview en mapa |
| A-05 | GIS Manager - Detalle/Rollback | Historial de versiones de un archivo GIS con opcion de rollback |
| A-06 | Content Manager - Banners | Drag & drop para gestionar imagenes del banner superior de Pantalla |
| A-07 | Content Manager - Idle Playlist | Drag & drop para gestionar videos/imagenes de la playlist de idle mode |
| A-08 | Content Manager - Calendario | Gestion de imagenes de calendario por mes (YYYY-MM) |
| A-09 | Content Manager - PDFs | Gestion de PDFs de modelos inmobiliarios |
| A-10 | Sync Ops - Dashboard | Estado de webhooks, lag, fallas de push, ultimas sincronizaciones |
| A-11 | Sync Ops - Dead Letter Queue | Listado de eventos fallidos con detalle, payload y boton de reintento |
| A-12 | Sync Ops - Resync | Accion operativa para forzar resync completo desde HubSpot |
| A-13 | Notificaciones / Alertas | Panel de alertas: playlist vacia, formato invalido, errores GIS, fallas de integracion |
| A-14 | Gestion de Usuarios | CRUD de usuarios del panel con asignacion de roles (solo admin) |

### 10.4 Resumen Total

| Aplicacion | Tipo | Pantallas |
|---|---|---|
| App Pantalla | React Native (mobile) | 12 |
| App Kiosko | React Native (mobile) | 10 |
| Panel Administrativo | React (web) | 14 |
| **Total del sistema** | | **36 pantallas** |

> **Nota:** Este conteo incluye pantallas unicas. No se cuentan variantes de estado (loading, error, empty state) ni modales secundarios (confirmaciones, tooltips), que se estiman en aproximadamente 15-20 componentes adicionales de soporte.

---

## 11. Riesgos y Mitigaciones

| Riesgo | Impacto | Probabilidad | Mitigacion |
|---|---|---|---|
| Modelado HubSpot no definido | Alto | Media | Iniciar con custom properties; migrar a custom objects si se requiere |
| Archivos GIS con datum incorrecto | Medio | Media | Validacion automatica de datum en la carga con rechazo y mensaje claro |
| Limites de rate de API de HubSpot | Medio | Baja | Batch read, cache agresivo, backoff exponencial en reintentos |
| Conectividad inestable en sitio | Alto | Media | Apps nativas con WatermelonDB offline-first, cola local, last known state |
| Latencia en renderizado GIS | Medio | Baja | Vector tiles pre-generados, simplificacion de geometrias, cache de GeoJSON |
| Cambios de alcance no controlados | Alto | Media | Proceso formal de control de cambios (seccion 13) |

---

## 12. Supuestos y Dependencias

- Acceso y credenciales a HubSpot (API key / Private App) disponibles antes de Fase 1.
- Archivos GIS entregados por el cliente en WGS84 con external_id por entidad.
- OpenTable se integra inicialmente via widget/overlay; APIs avanzadas dependen de aprobacion como partner.
- La decision de infraestructura (proveedor, dominios, certificados) se define antes del despliegue productivo.
- El cliente provee assets multimedia (videos, imagenes, PDFs de modelos) en formatos estandar.
- Definiciones pendientes (modelado HubSpot, diccionario GIS, embed vs vista nativa) se resuelven durante Fase 0.

---

## 13. Control de Cambios

Cualquier cambio que altere modelo de datos en HubSpot, contrato canonico, reglas de workflows, nuevas integraciones o modificaciones mayores de UX se gestionara mediante solicitud formal de cambio que incluya:

1. Descripcion del cambio solicitado y justificacion.
2. Analisis de impacto en costo, tiempo y arquitectura.
3. Aprobacion formal por ambas partes antes de implementacion.
4. Actualizacion del documento de alcance y esta propuesta tecnica.

---

*Documento preparado para: Las Riberas — Marzo 2026*
