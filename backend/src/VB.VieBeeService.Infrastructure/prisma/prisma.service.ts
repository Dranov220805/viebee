import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    if (process.env.DATABASE_URL) {
      try {
        await this.$connect();
        console.log("[VieBee Prisma] Successfully connected to database.");
      } catch (e) {
        console.warn("[VieBee Prisma] Database connection skipped or offline. Falling back gracefully to in-memory repositories.");
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
