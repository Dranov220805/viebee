import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { ApplicationModule } from "@application/application.module";
import { HttpApiModule } from "@http-api/http-api.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.localDevelopment", ".env"],
    }),
    InfrastructureModule,
    ApplicationModule,
    HttpApiModule,
  ],
})
export class AppModule {}
