// Exportar interfaz de metricas
export interface Metric {
    id: number;
    agent_id: string;
    timestamp: string;
    cpu_usage: number;
    ram_usage: number;
    disk_usage: number;
    load_average: number;
    swap_usage: number;
    error_rate: number;
    response_time_ms: number;
    status: string;
}

// Exportar interfaz de agentes
export interface Agent {
    agent_id: string;
    last_seen: string;
    total_metrics: string;
}