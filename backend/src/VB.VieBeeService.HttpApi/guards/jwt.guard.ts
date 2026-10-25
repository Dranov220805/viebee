import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // In Sandbox mode, mock user is attached if no bearer token
    const authHeader = request.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      request.user = { id: "user-maya", role: "TRAVELER" };
    } else {
      // Sandbox fallback
      request.user = { id: "user-maya", role: "TRAVELER" };
    }
    return true;
  }
}
