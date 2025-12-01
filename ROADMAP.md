# 🛡️ Project: The Sentinel
**Distributed Infrastructure Monitoring System**

> **Concepto:** Sistema de monitoreo de alto rendimiento compuesto por agentes ligeros (escritos en lenguajes de sistema) y un núcleo centralizado de procesamiento y visualización en tiempo real.

---

## 🎯 Objetivos del Proyecto
1.  **Dominio Full-Stack:** Integración de System Programming (Agente) con Web Development moderno (Backend/Frontend).
2.  **Rendimiento:** Manejo de datos en tiempo real y optimización de recursos.
3.  **Seguridad:** Implementación de autenticación segura entre servicios (M2M).

## 🛠️ Stack Tecnológico Sugerido

| Componente | Tecnología Principal | Propósito |
| :--- | :--- | :--- |
| **Agente (Cliente)** | **Rust** o **Go** | Recolección de métricas a bajo nivel (Zero dependencies). |
| **Transporte** | **gRPC** (Protobuf) | Comunicación binaria de alta velocidad Agente ↔ Servidor. |
| **Core (Backend)** | **NestJS** (Node.js) | Orquestación, validación y API Gateway. |
| **Base de Datos** | **PostgreSQL** (+ TimescaleDB) | Almacenamiento de series de tiempo (Time-Series). |
| **Frontend** | **React** o **Angular** | Dashboard de visualización en tiempo real. |
| **Infraestructura** | **Docker** | Containerización del entorno. |

---

## 🗺️ Hoja de Ruta (Roadmap)

### 🔹 Fase 1: Arquitectura y Diseño
*Definición de las reglas del juego antes de escribir código.*

- [ ] **Diseño del Esquema de Datos:** Definir qué métricas exactas se enviarán (CPU %, RAM Usage, Disk I/O, Network Packets).
- [ ] **Definición del Protocolo (.proto):** Si usas gRPC, definir los mensajes y servicios. Si usas WebSockets, definir la estructura de los eventos JSON.
- [ ] **Diseño de Seguridad:** Definir cómo se identifica el agente (Token rotativo, API Key estática, o mTLS).

### 🔹 Fase 2: El Agente "Vigilante" (System Programming)
*El componente que vive en el servidor objetivo. Debe ser un binario compilado ligero.*

- [ ] **Acceso al Hardware:** Investigar e implementar lectura nativa de recursos del sistema (Linux `/proc` filesystem o librerías `sysinfo`).
- [ ] **Loop de Recolección:** Implementar un bucle eficiente que capture datos cada `N` segundos sin bloquear el hilo principal.
- [ ] **Cliente de Red:** Implementar la conexión persistente hacia el Backend.
- [ ] **Manejo de Errores:** Lógica de "Retry" (reintento) si el servidor central se cae. El agente no debe crashear, debe esperar.

### 🔹 Fase 3: El Núcleo (NestJS Backend)
*El cerebro que procesa la información entrante.*

- [ ] **Ingestión de Datos:** Servicio dedicado (Microservicio o Módulo) para recibir streams de datos de múltiples agentes simultáneos.
- [ ] **Pipeline de Validación:** Verificar integridad de datos y autenticidad del agente antes de procesar.
- [ ] **Motor de Alertas (Business Logic):** Implementar reglas (ej: `IF cpu_usage > 90% FOR 2 min THEN create_alert()`).
- [ ] **API REST/GraphQL:** Exponer endpoints para que el Frontend consuma el historial y estado actual.

### 🔹 Fase 4: Persistencia (Time-Series Data)
*Almacenamiento optimizado para escrituras masivas.*

- [ ] **Modelado de Tabla:** Crear tablas optimizadas para series temporales (Partitioning por tiempo).
- [ ] **Escritura Eficiente:** Implementar "Batch Inserts" si el tráfico es muy alto, o escritura directa optimizada.
- [ ] **Retention Policy:** Script o función para purgar/archivar datos antiguos (ej: borrar detalles de segundos después de 30 días).

### 🔹 Fase 5: Visualización (Frontend)
*Dashboard profesional para administradores.*

- [ ] **Conexión en Tiempo Real:** Implementar WebSockets (Socket.io) o Server-Sent Events (SSE) para recibir actualizaciones sin F5.
- [ ] **Gráficas Dinámicas:** Implementar librería de charts (Chart.js / Recharts) mostrando líneas de tiempo.
- [ ] **Gestión de Inventario:** UI para listar servidores activos, inactivos y generar nuevas API Keys para nuevos agentes.

### 🔹 Fase 6: DevOps & Delivery
*Preparación para producción.*

- [ ] **Cross-Compilation:** Compilar el Agente para diferentes arquitecturas (Linux x64, ARM, tal vez Windows).
- [ ] **Docker Compose:** Orquestar Backend + DB + Frontend.
- [ ] **Documentación:** Crear un `README.md` explicando cómo instalar el agente en un servidor Linux nuevo con un solo comando.

---

## 🚀 Retos "Bonus" (Nivel Senior)
*Si terminas lo anterior y quieres destacar aún más:*

1.  **Seguridad Avanzada:** Implementar cifrado End-to-End en el payload de las métricas.
2.  **Modo "Offline":** Si el agente pierde internet, guarda las métricas en memoria RAM y las envía en lote cuando recupera la conexión.
3.  **Control Remoto:** Capacidad de enviar comandos desde el Dashboard al Agente (ej: "Reiniciar servicio Apache").