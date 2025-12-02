import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { MetricsService } from "./metrics.service";

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

@Controller()
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @GrpcMethod("SentinelService", "SendMetrics")
    async sendMetrics(data: MetricsReport): Promise<MetricsResponse> {
        console.log('🔍 Raw data in controller', data);
        return await this.metricsService.processMetrics(data);
    }
}