import { Module } from "@nestjs/common";
import { MetricsController } from "./metrics.controller";
import { MetricsService } from "./metrics.service";

@Module({
    controllers: [MetricsController],
    providers: [MetricsService],
    exports: [MetricsModule]
})
export class MetricsModule {}
