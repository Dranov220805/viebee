import { Module, Global } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "./constants/tokens";
import { WorkshopInMemoryRepository } from "./repositories/in-memory/workshop.in-memory.repository";
import { BookingInMemoryRepository } from "./repositories/in-memory/booking.in-memory.repository";
import { UserInMemoryRepository } from "./repositories/in-memory/user.in-memory.repository";
import { PrismaService } from "./prisma/prisma.service";

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: REPOSITORY_TOKENS.WORKSHOP,
      useClass: WorkshopInMemoryRepository,
    },
    {
      provide: REPOSITORY_TOKENS.BOOKING,
      useClass: BookingInMemoryRepository,
    },
    {
      provide: REPOSITORY_TOKENS.USER,
      useClass: UserInMemoryRepository,
    },
  ],
  exports: [
    PrismaService,
    REPOSITORY_TOKENS.WORKSHOP,
    REPOSITORY_TOKENS.BOOKING,
    REPOSITORY_TOKENS.USER,
  ],
})
export class InfrastructureModule {}
