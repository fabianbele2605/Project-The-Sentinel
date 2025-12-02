import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

interface MetricData {
    agentId: string;
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;
    loadAverage: number;
    swapUsage?: number;
    errorRate?: number;
    responseTimeMs?: number;
    status: string;
}

@Injectable()
export class DatabaseService {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: 'localhost',
            port: 5432,
            database: 'sentinel_db',
            user: 'sentinel_user',
            password: 'sentinel_pass',
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        });
    }

    async saveMetrics(data: MetricData): Promise<void> {
        const query = `
          INSERT INTO metrics (
            agent_id, cpu_usage, ram_usage, disk_usage,
            load_average, swap_usage, error_rate, response_time_ms, status
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9
        )`;

        const values = [
            data.agentId,
            data.cpuUsage,
            data.ramUsage,
            data.diskUsage,
            data.loadAverage,
            data.swapUsage || 0,
            data.errorRate || 0,
            data.responseTimeMs || 0,
            data.status || 'HEALTHY'
        ];

        await this.pool.query(query, values);
    }

    async getRecentMetrics(agent_id: string, limit: number = 100) {
        const query = `
            SELECT * FROM metrics
            WHERE agent_id = $1
            ORDER BY timestamp DESC
            LIMIT $2
        `;

        const result = await this.pool.query(query, [agent_id, limit]);
        return result.rows;
    }

    async onModuleDestroy() {
        await this.pool.end();
    }

    async getAgents() {
        const query = `
            SELECT DISTINCT agent_id, 
                    MAX(timestamp) as last_seen,
                    COUNT(*) as total_metrics
            FROM metrics
            GROUP BY agent_id
            ORDER BY last_seen DESC
        `;

        const result = await this.pool.query(query);
        return result.rows;
    }
}