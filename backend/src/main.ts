import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { TransformResponseInterceptor } from "@http-api/interceptors/transform-response.interceptor";
import { HttpExceptionFilter } from "@http-api/filters/http-exception.filter";
import { env } from "./config/env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.enableCors({ origin: true, credentials: true });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    })
  );

  // Global Response Envelopes & Filters (Clean Architecture standard)
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Interactive OpenAPI 3.0 Documentation
  const config = new DocumentBuilder()
    .setTitle("VieBee Living Heritage Main API")
    .setDescription(
      "RESTful Backend API for VieBee (UEH UII Sandbox 2026). Handles P2P cultural workshop bookings, GIS cultural map discovery, host verification, and proxies AI requests to the Python FastAPI AI Service."
    )
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(env.port);
  console.log(`[VieBee Main Backend] Running on http://localhost:${env.port}/api`);
  console.log(`[VieBee Swagger] Docs available at http://localhost:${env.port}/api-docs`);
  console.log(`[VieBee AI Proxy] Pointing to FastAPI AI Service at ${env.aiServiceUrl}`);
}

bootstrap();
