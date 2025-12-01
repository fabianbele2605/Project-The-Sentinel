import { Injectable } from "@nestjs/common";

interface MetricsReport {
    agentId: string;
    timestamp: number;
    status: number;
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;
    responseTimeMs: number;
    loadAverage: number;
    errorRate: number;
    swapUsage: number;
    apiKey: string;
}

interface MetricsResponse {
    success: boolean;
    message: string;
}

@Injectable()
export class MetricsService {

    processMetrics(data: MetricsReport): MetricsResponse {
        // Debug: mostrar que API key recibimos
        console.log('🔍 Full data received:', JSON.stringify(data, null, 2));
        console.log(`🔑 Received API key: ${data.apiKey}`);
        console.log(`🔑 Expected API keys: ["sentinel_demo123"]`);
        // Validar API key
        if (!this.isValidApiKey(data.apiKey)) {
            return {
                success: false,
                message: "Invalid API key"
            };
        }

        // Log de las metricas recibidas
        console.log(`📊 Metrics from ${data.agentId}:`);
        console.log(`   CPU: ${data.cpuUsage}%`);
        console.log(`   RAM: ${data.ramUsage}%`);
        console.log(`   Disk: ${data.diskUsage}%`);
        console.log(`   Load: ${data.loadAverage}`);


        // Aqui ira la logica de almacenamiento de DB
        // Por ahora solo loggeamos

        return {
            success: true,
            message: "Metrics received successfully"
        };
    }

    private isValidApiKey(apiKey: string): boolean {
        // Aqui iria la logica de validacion de API key
        // Por ahora solo validamos que no este vacia
        const validApiKey = ['sentinel_demo123'];
        return validApiKey.includes(apiKey);
    }
}