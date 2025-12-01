# 🛡️ The Sentinel
**Distributed Infrastructure Monitoring System**

> Sistema de monitoreo de alto rendimiento compuesto por agentes ligeros y un núcleo centralizado de procesamiento en tiempo real.

## 🎯 Descripción

The Sentinel es un sistema de monitoreo distribuido que combina:
- **Agente ligero** en Go para captura de métricas del sistema
- **Backend centralizado** en NestJS para procesamiento y validación
- **Comunicación gRPC** de alta velocidad entre componentes
- **Autenticación segura** con API Keys

## 🏗️ Arquitectura

```
┌─────────────────┐    gRPC     ┌─────────────────┐
│   Agent (Go)    │ ──────────► │ Backend (NestJS)│
│                 │             │                 │
│ • Metrics       │             │ • Validation    │
│ • gRPC Client   │             │ • Processing    │
│ • System Info   │             │ • API Gateway   │
└─────────────────┘             └─────────────────┘
```

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Propósito |
|------------|------------|-----------|
| **Agente** | Go + gRPC | Captura de métricas del sistema |
| **Backend** | NestJS + TypeScript | Procesamiento y validación |
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
- Protocol Buffers Compiler

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd The_Sentinel
```

### 2. Configurar el Backend

```bash
cd backend
npm install
npm run build
```

### 3. Compilar el Agente

```bash
cd agent
go mod tidy
go build -o sentinel-agent
```

### 4. Ejecutar el Sistema

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Agente:**
```bash
cd agent
./sentinel-agent
```

## 📁 Estructura del Proyecto

```
The_Sentinel/
├── agent/                  # Agente en Go
│   ├── internal/
│   │   ├── metrics/       # Captura de métricas
│   │   ├── client/        # Cliente gRPC
│   │   └── config/        # Configuración
│   ├── proto/             # Archivos generados
│   ├── main.go           # Punto de entrada
│   └── go.mod            # Dependencias Go
├── backend/               # Backend en NestJS
│   ├── src/
│   │   ├── metrics/      # Módulo de métricas
│   │   ├── proto/        # Definición Protocol Buffers
│   │   ├── main.ts       # Servidor gRPC
│   │   └── app.module.ts # Módulo principal
│   ├── package.json      # Dependencias Node.js
│   └── tsconfig.json     # Configuración TypeScript
├── protocol/             # Definición del protocolo
│   └── protocol.proto    # Schema gRPC
├── docs/                 # Documentación
│   ├── DESING.md        # Diseño de métricas
│   └── SECURITY.md      # Diseño de seguridad
└── ROADMAP.md           # Hoja de ruta del proyecto
```

## 🔧 Configuración

### Agente (Go)
- **Servidor:** `localhost:50051`
- **API Key:** `sentinel_demo123`
- **Intervalo:** 30 segundos

### Backend (NestJS)
- **Puerto gRPC:** `50051`
- **Protocolo:** `sentinel`
- **Validación:** API Key requerida

## 📈 Estado del Proyecto

### ✅ Completado (Fases 1-3)
- [x] Arquitectura y diseño del sistema
- [x] Agente de captura de métricas (Go)
- [x] Backend de procesamiento (NestJS)
- [x] Comunicación gRPC funcional
- [x] Autenticación con API Keys
- [x] Sistema funcionando end-to-end

### 🔄 En Desarrollo (Próximas Fases)
- [ ] Persistencia en base de datos (PostgreSQL + TimescaleDB)
- [ ] Frontend de visualización (React/Angular)
- [ ] Sistema de alertas
- [ ] Dashboard en tiempo real
- [ ] Containerización con Docker

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

## 🔐 Seguridad

- **API Keys estáticas** para autenticación de agentes
- **Validación de integridad** de datos en el backend
- **Comunicación gRPC** con posibilidad de TLS
- **Rechazo automático** de requests no autenticados

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Fabian** - Desarrollador Full Stack en transición Junior → Senior

---

⭐ **¡Dale una estrella si este proyecto te ayudó!**