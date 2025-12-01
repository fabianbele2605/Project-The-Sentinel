# The Sentinel - Diseño de seguridad

## Autenticación del Agente

### Método: API Key Estática
- Cada agente tiene una API Key única
- Se envía en cada request gRPC
- El backend valida la key antes de procesar

### Generación de API Keys
- Formato: `sentinel_[8_caracteres_aleatorios]`
- Ejemplo: `sentinel_a7b9c2d4`

### Validación
- Backend mantiene lista de keys válidas
- Key inválida = rechazo inmediato


## Implementación en el Protocolo

### Modificación Necesaria
- Agregar campo `api_key` al mensaje `MetricsReport`
- El agente debe incluir su API key en cada envío

### Flujo de validación
1. Agente envía métricas + API key
2. Backend verifica si la key existe
3. Si es válida: procesa métricas
4. Si es inválida: rechaza con error