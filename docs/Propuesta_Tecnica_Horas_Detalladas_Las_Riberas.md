# Propuesta Tecnica — Horas Detalladas

**Plataforma Digital Las Riberas**

Pantalla (React Native) | Kiosko (React Native) | Panel Admin (React Web) | Backend (Python)

Version 1.0 — Marzo 2026

---

## 1. Resumen de Esfuerzo

| Metrica | Valor |
|---|---|
| Total horas-hombre del proyecto | **3,990 horas** |
| Duracion total | 19 semanas (~5 meses) |
| Personas en el equipo | 8 roles |
| Promedio de personas activas por semana | ~5.3 |
| Maximo de personas simultaneas | 8 (Fases 2 y 3) |
| Minimo de personas simultaneas | 5 (Fase 0) |
| Jornada base | 40 horas/semana por persona |

---

## 2. Equipo y Roles

| Rol | Dedicacion | Horas totales |
|---|---|---|
| Tech Lead / Arquitecto | Completa (19 semanas) | 730 |
| Backend Developer 1 | Completa (19 semanas, variable) | 640 |
| Backend Developer 2 | Parcial a completa (19 semanas, variable) | 490 |
| Frontend Developer 1 (React Native) | Parcial a completa (19 semanas) | 620 |
| Frontend Developer 2 (React Native / Web) | Completa desde Fase 2 (14 semanas) | 520 |
| DevOps Engineer | Variable (19 semanas) | 380 |
| QA Engineer | Desde Fase 2 (14 semanas) | 340 |
| UX/UI Designer | Parcial, Fases 0-3 (12 semanas) | 270 |
| **Total** | | **3,990** |

---

## 3. Desglose por Fase y Rol (horas totales)

| Rol | Fase 0 (2 sem) | Fase 1 (3 sem) | Fase 2 (4 sem) | Fase 3 (3 sem) | Fase 4 (3 sem) | Fase 5 (2 sem) | Fase 6 (2 sem) | **Total** |
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

---

## 4. Detalle por Fase

### Fase 0: Setup & Fundamentos (2 semanas — 360 horas)

| Rol | h/sem | Horas | Actividades principales |
|---|---|---|---|
| Tech Lead / Arquitecto | 40 | 80 | Definicion de arquitectura, estructura de monorepo, esquema de DB, contratos de API |
| Backend Developer 1 | 40 | 80 | Setup de FastAPI, PostgreSQL + PostGIS, esquema inicial Alembic, estructura de proyecto |
| Backend Developer 2 | 20 | 40 | Configuracion de Redis, estructura de Celery, setup de MinIO (object storage) |
| Frontend Developer 1 (RN) | 20 | 40 | Inicializacion proyecto React Native (Expo/bare), configuracion de navegacion y NativeWind |
| DevOps Engineer | 40 | 80 | Docker Compose, CI/CD con GitHub Actions, ambientes dev/staging, configuracion de Nginx |
| UX/UI Designer | 20 | 40 | Kickoff de design system, paleta de colores, tipografia, componentes base en Figma |

**Personas activas: 6 | Horas/semana promedio: 180**

---

### Fase 1: Gateway + HubSpot (3 semanas — 570 horas)

| Rol | h/sem | Horas | Actividades principales |
|---|---|---|---|
| Tech Lead / Arquitecto | 40 | 120 | Diseno del contrato canonico, patron de integracion, validacion de webhooks, code reviews |
| Backend Developer 1 | 40 | 120 | Endpoint de webhooks, validacion Signature V3, procesamiento asincrono, batch read |
| Backend Developer 2 | 40 | 120 | Estado canonico en DB, distribucion push a Pantalla/Kiosko API, DLQ, reintentos |
| Frontend Developer 1 (RN) | 20 | 60 | Prototipo de navegacion del Kiosko, integracion con TanStack Query, setup de mapas nativos |
| DevOps Engineer | 20 | 60 | Configuracion de colas Celery, monitoreo basico (Prometheus), logs centralizados (Loki) |
| UX/UI Designer | 30 | 90 | Wireframes de Kiosko (mapa, detalle lote, cotizacion), wireframes de Pantalla (menu, idle) |

**Personas activas: 6 | Horas/semana promedio: 190**

---

### Fase 2: Kiosko MVP (4 semanas — 920 horas)

| Rol | h/sem | Horas | Actividades principales |
|---|---|---|---|
| Tech Lead / Arquitecto | 40 | 160 | Supervision de integracion GIS, code reviews, validacion de flujo de cotizacion end-to-end |
| Backend Developer 1 | 40 | 160 | Kiosko API (events, snapshot, quote), endpoint de cotizacion, upsert Contact + Deal en HS |
| Backend Developer 2 | 20 | 80 | Pipeline GIS (Fiona/Shapely), conversion a GeoJSON, validacion WGS84, publicacion a HS |
| Frontend Developer 1 (RN) | 40 | 160 | Mapa interactivo nativo (Mapbox), capas GIS, popup de lote, navegacion entre pantallas |
| Frontend Developer 2 (RN/Web) | 40 | 160 | Detalle de lote/casa, visor de PDF nativo, formulario de cotizacion multi-paso, filtros |
| DevOps Engineer | 10 | 40 | Mantenimiento de CI/CD, optimizacion de builds, soporte de infraestructura |
| QA Engineer | 20 | 80 | Pruebas de mapa interactivo, flujo de cotizacion, validacion de datos GIS, test plan |
| UX/UI Designer | 20 | 80 | Iteracion de UI del Kiosko basada en feedback, diseno de estados vacios/error/loading |

**Personas activas: 8 | Horas/semana promedio: 230**

---

### Fase 3: Pantalla MVP (3 semanas — 630 horas)

| Rol | h/sem | Horas | Actividades principales |
|---|---|---|---|
| Tech Lead / Arquitecto | 40 | 120 | Diseno de idle mode y playlist engine, integracion OpenTable, code reviews |
| Backend Developer 1 | 20 | 60 | Pantalla API (events, snapshot, health), endpoints de contenido desde storage |
| Backend Developer 2 | 20 | 60 | Logica de playlist (ordenamiento, fallback), servicio de calendario, validacion de assets |
| Frontend Developer 1 (RN) | 40 | 120 | Layout touch full-screen, menu dinamico, idle mode con Reanimated 3, reproductor de video |
| Frontend Developer 2 (RN/Web) | 40 | 120 | Calendario mensual navegable, secciones de contenido (Club, Nona, Desarrollo), OpenTable |
| DevOps Engineer | 10 | 30 | Soporte de infraestructura, configuracion de CDN para assets multimedia |
| QA Engineer | 20 | 60 | Pruebas de idle mode, transiciones, fallback, calendario, testing en dispositivos fisicos |
| UX/UI Designer | 20 | 60 | Validacion UX en pantalla touch real, ajustes de interaccion, diseno de fallback states |

**Personas activas: 8 | Horas/semana promedio: 210**

---

### Fase 4: Panel Administrativo (3 semanas — 630 horas)

| Rol | h/sem | Horas | Actividades principales |
|---|---|---|---|
| Tech Lead / Arquitecto | 30 | 90 | Arquitectura del panel, RBAC, diseno de GIS Manager y Sync Ops, code reviews |
| Backend Developer 1 | 40 | 120 | APIs del panel: CRUD de usuarios, endpoints de GIS Manager, Content Manager, Sync Ops |
| Backend Developer 2 | 30 | 90 | APIs de DLQ, resync, dashboard de estado, servicio de notificaciones/alertas |
| Frontend Developer 1 (RN) | 40 | 120 | GIS Manager web (carga, validacion, preview en mapa), Sync Ops dashboard |
| Frontend Developer 2 (RN/Web) | 40 | 120 | Content Manager drag & drop (dnd-kit), gestion de banners/idle/calendario/PDFs |
| DevOps Engineer | 10 | 30 | Deploy de panel admin, configuracion de acceso, SSL para subdominio admin |
| QA Engineer | 20 | 60 | Pruebas de carga de archivos GIS, drag & drop, RBAC, flujos de resync |

**Personas activas: 7 | Horas/semana promedio: 210**

---

### Fase 5: Offline & Hardening (2 semanas — 480 horas)

| Rol | h/sem | Horas | Actividades principales |
|---|---|---|---|
| Tech Lead / Arquitecto | 40 | 80 | Revision de seguridad, optimizacion de rendimiento, validacion de offline strategy |
| Backend Developer 1 | 30 | 60 | Hardening de APIs, rate limiting, validacion de presigned URLs, optimizacion de queries |
| Backend Developer 2 | 30 | 60 | Pruebas de carga, optimizacion de Celery/Redis, ajuste de reintentos y DLQ |
| Frontend Developer 1 (RN) | 40 | 80 | WatermelonDB sync para Kiosko, cola offline de cotizaciones, cache de inventario |
| Frontend Developer 2 (RN/Web) | 40 | 80 | WatermelonDB sync para Pantalla, cache de playlist/calendario, manejo de reconexion |
| DevOps Engineer | 30 | 60 | Builds iOS/Android (EAS Build), configuracion de TestFlight/Play Store, hardening de infra |
| QA Engineer | 30 | 60 | Pruebas de degradacion offline, pruebas de reconexion, testing en redes inestables |

**Personas activas: 7 | Horas/semana promedio: 240**

---

### Fase 6: QA & Deploy (2 semanas — 400 horas)

| Rol | h/sem | Horas | Actividades principales |
|---|---|---|---|
| Tech Lead / Arquitecto | 40 | 80 | Validacion final de arquitectura, documentacion tecnica, handover operativo |
| Backend Developer 1 | 20 | 40 | Correccion de bugs criticos, documentacion de APIs (OpenAPI), scripts de migracion prod |
| Backend Developer 2 | 20 | 40 | Correccion de bugs, seed data de produccion, verificacion de integracion HubSpot prod |
| Frontend Developer 1 (RN) | 20 | 40 | Correccion de bugs UI, optimizacion final de rendimiento, polish de animaciones |
| Frontend Developer 2 (RN/Web) | 20 | 40 | Correccion de bugs UI, verificacion cross-device, ajustes finales de responsive |
| DevOps Engineer | 40 | 80 | Deploy productivo, configuracion de monitoreo/alertas, backup strategy, runbook |
| QA Engineer | 40 | 80 | Testing E2E completo (Detox + Playwright), pruebas de aceptacion con cliente, regression |

**Personas activas: 7 | Horas/semana promedio: 200**

---

## 5. Distribucion de Horas por Area Funcional

| Area | Horas estimadas | % del total |
|---|---|---|
| Gateway / Integracion HubSpot | 870 | 21.8% |
| App Kiosko (React Native) | 920 | 23.1% |
| App Pantalla (React Native) | 630 | 15.8% |
| Panel Administrativo (React Web) | 630 | 15.8% |
| Infraestructura / DevOps | 380 | 9.5% |
| QA / Testing | 340 | 8.5% |
| UX/UI Design | 270 | 6.8% |
| **Total** | **3,990** | **100%** |

---

## 6. Distribucion de Horas por Disciplina

| Disciplina | Roles | Horas | % |
|---|---|---|---|
| Liderazgo tecnico | Tech Lead / Arquitecto | 730 | 18.3% |
| Desarrollo Backend (Python) | Backend Dev 1 + Backend Dev 2 | 1,130 | 28.3% |
| Desarrollo Frontend (React Native + React) | Frontend Dev 1 + Frontend Dev 2 | 1,140 | 28.6% |
| DevOps / Infraestructura | DevOps Engineer | 380 | 9.5% |
| Aseguramiento de calidad | QA Engineer | 340 | 8.5% |
| Diseno UX/UI | UX/UI Designer | 270 | 6.8% |
| **Total** | **8 personas** | **3,990** | **100%** |

---

## 7. Curva de Esfuerzo por Semana

```
Horas/semana
250 |          ████
240 |          ████
230 |          ████                          ████
220 |          ████                          ████
210 |          ████  ████████  ████████
200 |          ████  ████████  ████████      ████  ████████
190 | ████████
180 | ████████
170 |
160 |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
     F0 F0 F1 F1 F1 F2 F2 F2 F2 F3 F3 F3 F4 F4 F4 F5 F5 F6 F6
     S1 S2 S3 S4 S5 S6 S7 S8 S9 S10S11S12S13S14S15S16S17S18S19
```

**Pico de esfuerzo:** Fase 2 (Kiosko MVP) con 230 h/semana y 8 personas simultaneas.
**Fase mas ligera:** Fase 0 (Setup) con 180 h/semana y 5-6 personas.

---

## 8. Notas sobre la Asignacion

- **Tech Lead / Arquitecto:** Dedicacion completa durante todo el proyecto. Lidera definiciones de arquitectura en fases tempranas y code reviews / hardening en fases finales.

- **Backend Developers (2):** Dedicacion completa en Fases 1-2 (Gateway + APIs). En fases posteriores alternan entre soporte de API del Panel Admin y tareas de integracion. El Backend Dev 2 tiene menor carga en Fase 0 y Fase 2 porque el GIS processing es mas acotado.

- **Frontend Developer 1 (React Native):** Se incorpora parcialmente desde Fase 0 (setup del proyecto RN). Dedicacion completa desde Fase 2 en adelante para Kiosko, Pantalla y Panel Admin.

- **Frontend Developer 2 (React Native / Web):** Se incorpora en Fase 2 para el desarrollo paralelo de mapas y UI del Kiosko. Transiciona al Panel Admin web en Fase 4.

- **DevOps Engineer:** Alta dedicacion en Fase 0 (infraestructura base) y Fase 6 (deploy productivo). Dedicacion parcial el resto del proyecto para mantenimiento de CI/CD, monitoreo y builds moviles.

- **QA Engineer:** Se incorpora en Fase 2 con la primera funcionalidad testeable. Dedicacion completa en Fase 6 para pruebas de aceptacion y E2E.

- **UX/UI Designer:** Dedicacion parcial en Fases 0-3 para design system, wireframes y validacion de experiencia touch. No requerido en fases de hardening y deploy.

---

## 9. Consideraciones

- Las horas son estimaciones basadas en los requerimientos del documento de alcance. Pueden variar segun la complejidad real encontrada durante la implementacion.
- Los roles parciales pueden ser cubiertos por la misma persona si tiene las competencias necesarias (ej: DevOps parcial + Backend Dev).
- El control de cambios (seccion 13 de la propuesta tecnica principal) aplica a cualquier modificacion que impacte estas estimaciones.
- Se recomienda una reserva de contingencia del 15-20% sobre las horas totales para imprevistos.

---

*Documento preparado para: Las Riberas — Marzo 2026*
