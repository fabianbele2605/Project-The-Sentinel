# 🛡️ The Sentinel
**Distributed Infrastructure Monitoring System**

> Sistema de monitoreo de alto rendimiento compuesto por agentes ligeros y un núcleo centralizado de procesamiento en tiempo real con dashboard profesional.

## 🎯 Descripción

The Sentinel es un sistema de monitoreo distribuido completo que combina:
- **Agente ligero** en Go para captura de métricas del sistema
- **Backend centralizado** en NestJS para procesamiento y validación
- **Base de datos PostgreSQL** optimizada para series temporales
- **Frontend React** con dashboard profesional en tiempo real
- **Comunicación gRPC** de alta velocidad entre componentes
- **API REST** para consultas históricas
- **Autenticación segura** con API Keys

## 🏗️ Arquitectura

```
┌─────────────┐    gRPC    ┌─────────────┐    HTTP    ┌─────────────┐
│ Agent (Go)  │ ────────► │Backend(NestJS)│ ◄────────► │Frontend     │
│             │           │             │             │ (React)     │
│ • Metrics   │           │ • gRPC      │             │ • Dashboard │
│ • gRPC      │           │ • REST API  │             │ • Charts    │
│ • Auth      │           │ • Validation│             │ • Real-time │
└─────────────┘           └─────────────┘             └─────────────┘
                                  │                           
                                  ▼                           
                          ┌─────────────┐             
                          │PostgreSQL + │             
                          │ TimescaleDB │             
                          │ • Metrics   │
                          │ • Indexes   │
                          │ • History   │
                          └─────────────┘             
```

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Propósito |
|------------|------------|-----------|
| **Agente** | Go + gRPC | Captura de métricas del sistema |
| **Backend** | NestJS + TypeScript | Procesamiento, validación y API |
| **Base de Datos** | PostgreSQL + TimescaleDB | Almacenamiento optimizado de series temporales |
| **Frontend** | React + TypeScript | Dashboard profesional en tiempo real |
| **Gráficas** | Recharts | Visualización interactiva de métricas |
| **Protocolo** | Protocol Buffers | Comunicación binaria eficiente |
| **Autenticación** | API Keys | Seguridad entre servicios |

## 📊 Métricas Capturadas

- **CPU Usage** - Porcentaje de uso del procesador
- **RAM Usage** - Porcentaje de memoria utilizada
- **Disk Usage** - Porcentaje de espacio en disco usado
- **Load Average** - Carga promedio del sistema
- **Swap Usage** - Uso de memoria swap
- **Response Time** - Tiempo de respuesta del servicio
- **Error Rate** - Tasa de errores del sistema

## 🚀 Instalación y Uso

### Prerrequisitos

- Go 1.21+
- Node.js 18+
- PostgreSQL 12+
- Protocol Buffers Compiler

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd The_Sentinel
```

### 2. Configurar PostgreSQL

```bash
# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Crear base de datos
sudo -u postgres psql
CREATE DATABASE sentinel_db;
CREATE USER sentinel_user WITH PASSWORD 'sentinel_pass';
GRANT ALL PRIVILEGES ON DATABASE sentinel_db TO sentinel_user;
\q
```

### 3. Configurar el Backend

```bash
cd backend
npm install
npm run build
```

### 4. Configurar el Frontend

```bash
cd frontend
npm install
```

### 5. Compilar el Agente

```bash
cd agent
go mod tidy
go build -o sentinel-agent
```

### 6. Ejecutar el Sistema Completo

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Servidor gRPC: localhost:50051
# API REST: localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Dashboard: http://localhost:3001
```

**Terminal 3 - Agente:**
```bash
cd agent
./sentinel-agent
# Envía métricas cada 30 segundos
```

## 📁 Estructura del Proyecto

```
The_Sentinel/
├── agent/                  # Agente en Go
│   ├── internal/
│   │   ├── metrics/       # Captura de métricas del sistema
│   │   ├── client/        # Cliente gRPC
│   │   └── config/        # Configuración del agente
│   ├── proto/             # Archivos generados de protobuf
│   ├── main.go           # Punto de entrada del agente
│   └── go.mod            # Dependencias Go
├── backend/               # Backend en NestJS
│   ├── src/
│   │   ├── metrics/      # Módulo de métricas (gRPC + REST)
│   │   ├── database/     # Servicio de base de datos
│   │   ├── proto/        # Definición Protocol Buffers
│   │   ├── main.ts       # Servidor dual (gRPC + HTTP)
│   │   └── app.module.ts # Módulo principal
│   ├── package.json      # Dependencias Node.js
│   └── tsconfig.json     # Configuración TypeScript
├── frontend/              # Frontend en React
│   ├── src/
│   │   ├── components/   # Componentes React (Dashboard, Charts, Cards)
│   │   ├── services/     # API client (axios)
│   │   ├── types/        # Tipos TypeScript
│   │   └── App.tsx       # Aplicación principal
│   ├── package.json      # Dependencias React
│   └── .env              # Configuración (PORT=3001)
├── protocol/             # Definición del protocolo
│   └── protocol.proto    # Schema gRPC compartido
├── docs/                 # Documentación
│   ├── DESING.md        # Diseño de métricas
│   └── SECURITY.md      # Diseño de seguridad
└── ROADMAP.md           # Hoja de ruta del proyecto
```

## 🔧 Configuración

### Agente (Go)
- **Servidor gRPC:** `localhost:50051`
- **API Key:** `sentinel_demo123`
- **Intervalo de envío:** 30 segundos

### Backend (NestJS)
- **Puerto gRPC:** `50051`
- **Puerto HTTP:** `3000`
- **Base de datos:** `postgresql://sentinel_user:sentinel_pass@localhost/sentinel_db`
- **Validación:** API Key requerida

### Frontend (React)
- **Puerto:** `3001`
- **API Backend:** `http://localhost:3000`
- **Auto-refresh:** Cada 30 segundos (sincronizado con agente)

## 📈 Estado del Proyecto

### ✅ Completado (Sistema Completo)
- [x] **Fase 1:** Arquitectura y diseño del sistema
- [x] **Fase 2:** Agente de captura de métricas (Go)
- [x] **Fase 3:** Backend de procesamiento (NestJS)
- [x] **Fase 4:** Persistencia en base de datos (PostgreSQL)
- [x] **Fase 5:** API REST para consultas históricas
- [x] **Fase 6:** Frontend de visualización (React)
- [x] **Fase 7:** Dashboard en tiempo real con auto-refresh
- [x] Comunicación gRPC funcional
- [x] Autenticación con API Keys
- [x] Sistema funcionando end-to-end
- [x] Sincronización en tiempo real

### 🔄 Próximas Mejoras (Opcionales)
- [ ] WebSockets para actualizaciones instantáneas
- [ ] Sistema de alertas por email/SMS
- [ ] Múltiples agentes simultáneos
- [ ] Containerización con Docker
- [ ] Despliegue en Kubernetes
- [ ] Métricas adicionales (Network, Processes)

## 🎨 Características del Dashboard

- **Diseño NASA/Sci-fi** con efectos glassmorphism
- **Gráficas interactivas** con Recharts
- **Auto-refresh** sincronizado cada 30 segundos
- **Responsive design** adaptable a diferentes pantallas
- **Indicadores de estado** en tiempo real
- **Navegación intuitiva** entre agentes
- **Botón de refresh manual** para control inmediato

## 🧪 Testing

### Probar captura de métricas:
```bash
cd agent
go run test_metrics.go
```

### Resultado esperado:
```
🧪 Testing metrics collection...
✅ CPU: 15.23%
✅ Memory: 67.45%
✅ Disk: 42.10%
✅ Load: 1.25
🎉 Metrics collection working!
```

### Probar API REST:
```bash
# Listar agentes
curl http://localhost:3000/api/metrics

# Métricas de un agente
curl http://localhost:3000/api/metrics/agent-001
```

## 🔐 Seguridad

- **API Keys estáticas** para autenticación de agentes
- **Validación de integridad** de datos en el backend
- **Comunicación gRPC** con posibilidad de TLS
- **CORS configurado** para frontend seguro
- **Rechazo automático** de requests no autenticados
- **Sanitización** de datos de entrada

## 🚀 Características Técnicas

### Performance
- **gRPC binario** para comunicación de alta velocidad
- **Índices PostgreSQL** optimizados para consultas temporales
- **Pool de conexiones** para manejo eficiente de BD
- **Componentes React** optimizados con hooks

### Escalabilidad
- **Arquitectura distribuida** preparada para múltiples agentes
- **Base de datos** optimizada para series temporales
- **API REST** stateless para balanceadores de carga
- **Frontend** con lazy loading y componentes reutilizables

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨💻 Autor

**Fabian** - Desarrollador Full Stack en transición Junior → Senior

---

⭐ **¡Dale una estrella si este proyecto te ayudó!**

## 🏆 Logros del Proyecto

- ✅ Sistema de monitoreo completo y funcional
- ✅ Arquitectura distribuida profesional
- ✅ Dashboard en tiempo real con diseño moderno
- ✅ Código limpio y bien documentado
- ✅ Tecnologías modernas y mejores prácticas
- ✅ Sistema escalable y mantenible