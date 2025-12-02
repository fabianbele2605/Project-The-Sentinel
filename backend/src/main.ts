import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {

    // Crear aplicacion HTTP normal
    const appHttp = await NestFactory.create(AppModule);

    // Crear microservicio gRPC
    appHttp.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: 'sentinel',
            protoPath: join(__dirname, 'proto/protocol.proto'),
            url: 'localhost:50051',
        },
    });

    console.log('🛡️ Sentinel Backend starting...');
    console.log('🛡️ Sentinel gRPC Server on localhost:50051 starting...');
    console.log('🛡️ Sentinel HTTP API on localhost:3000 starting...');

    // Habilitar CORS
    appHttp.enableCors({
        origin: 'http://localhost:3001',
        credentials: true
    });

    // Iniciar ambos microservicios
    await appHttp.startAllMicroservices();
    await appHttp.listen(3000); // Puedes cambiar el puerto si es necesario
    
    
}

bootstrap();
