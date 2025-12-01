import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {
    // Crear aplicacion gRPC
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                package: 'sentinel',
                protoPath: join(__dirname, 'proto/protocol.proto'),
                url: 'localhost:50051'
            },
        },
    );

    console.log('🛡️ Sentinel Backend starting...');
    console.log('📡 gRPC Server listening on localhost:50051');

    await app.listen();
}

bootstrap();
