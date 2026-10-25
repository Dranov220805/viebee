import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { WorkshopsController } from "./controllers/workshops.controller";
import { BookingsController } from "./controllers/bookings.controller";
import { CopilotController } from "./controllers/copilot.controller";
import { QcController } from "./controllers/qc.controller";
import { AuthController } from "./controllers/auth.controller";
import { JwtGuard } from "./guards/jwt.guard";

@Module({
  imports: [ApplicationModule],
  controllers: [
    WorkshopsController,
    BookingsController,
    CopilotController,
    QcController,
    AuthController,
  ],
  providers: [JwtGuard],
})
export class HttpApiModule {}
