import * as dotenv from "dotenv";

dotenv.config();

export const env = {
  port: parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  directUrl: process.env.DIRECT_URL || "",
  aiServiceUrl: process.env.AI_SERVICE_URL || "http://localhost:8000/api/v1",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "viebee-super-secret-jwt-key-2026",
  jwtAccessTtl: process.env.JWT_ACCESS_TTL || "15m",
  platformFeeRate: parseFloat(process.env.PLATFORM_FEE_RATE || "0.12"), // 12% VieBee take rate
};
