import { Controller, Get, Param } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Controller('/api/metrics')
export class MetricsApiController {
    constructor(private readonly databaseService: DatabaseService) {}

    // Endpoint para obtener métricas de un agente 
    @Get(':agentId')
    async getMetrics(@Param('agentId') agentId: string) {
        const metrics = await this.databaseService.getRecentMetrics(agentId);
        return metrics;
    }

    // Endpoint para listar todos los agentes
    @Get()
    async getAgents() {
        const agents = await this.databaseService.getAgents();
        return agents;
    }
}