import { Module } from "@nestjs/common";
import { MetricsController } from "./metrics.controller";
import { MetricsService } from "./metrics.service";
import { DatabaseService } from "../database/database.service";
import { MetricsApiController } from "./metrics-api.controller";

@Module({
    controllers: [MetricsController, MetricsApiController],
    providers: [MetricsService, DatabaseService],
})
export class MetricsModule {}
