# The Sentinel - Diseño de Métricas

## 1. Estados del servidor
- **Saludable:** < 600 ms, < 70% cpu, <80% ram
- **Lento:** > 800 ms, < 75% cpu, <85% ram
- **Caído:** Timeout por intento: 2 s, 6 segundos sin respuesta 

## 2. Métrica Esenciales
- **1**: Latencia / Tiempo de respuesta del servicio principal
- **2**: Disponibilidad del health-check (HTTP/TCP/ICMP)
- **3**: CPU Usage (%)
- **4**: RAM Usage (%) y Swap (%)
- **5**: Espacio en disco (%)
- **6**: Load Average normalizado por número de cores
- **7**: Tasa de errores 5xx / fallos del servicio


## 3. Umbrales de Alerta
- **CPU**: > 90% por 30 s
- **RAM**: > 90% o swap > 20%
- **Disco**: > 95%
- **Latencia**: > 1500 ms
- **Errores**: 5xx > 5%
- **3 timeouts**: consecutivos de 2 s cada uno → DOWN
- **Load average**: > núcleos × 2 durante 1 min