import { Injectable } from "@nestjs/common";
import { DatabaseService } from '../database/database.service';

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
    constructor(private readonly databaseService: DatabaseService) {}

    async processMetrics(data: MetricsReport): Promise<MetricsResponse> {
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


        // Guardar métricas en la base de datos
        try {
            await this.databaseService.saveMetrics({
                agentId: data.agentId,
                cpuUsage: data.cpuUsage,
                ramUsage: data.ramUsage,
                diskUsage: data.diskUsage,
                loadAverage: data.loadAverage,
                swapUsage: data.swapUsage,
                errorRate: data.errorRate,
                responseTimeMs: data.responseTimeMs,
                status: 'HEALTHY'
            });
            console.log('✅ Metrics saved to database');
        } catch (error) {
            console.error('❌ Error saving metrics:', error);
            // No fallar el request por error de DB
        }

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