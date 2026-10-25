import { Module } from "@nestjs/common";
import { WorkshopService } from "./workshops/workshop.service";
import { BookingService } from "./bookings/booking.service";
import { CopilotService } from "./copilot/copilot.service";
import { AuthService } from "./auth/auth.service";
import { QcService } from "./qc/qc.service";

@Module({
  providers: [
    WorkshopService,
    BookingService,
    CopilotService,
    AuthService,
    QcService,
  ],
  exports: [
    WorkshopService,
    BookingService,
    CopilotService,
    AuthService,
    QcService,
  ],
})
export class ApplicationModule {}
