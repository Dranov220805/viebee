import { Controller, Post, Get, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "@application/auth/auth.service";
import { LoginInputDto, UserOutputDto } from "@application-contracts/dtos";

@ApiTags("Authentication & Sandbox Personas")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService
  ) {}

  @Post("login")
  @ApiOperation({ summary: "Sign in with email and password" })
  async login(@Body() dto: LoginInputDto) {
    return this.authService.login(dto);
  }

  @Get("me")
  @ApiOperation({ summary: "Get current authenticated profile" })
  @ApiResponse({ status: 200, type: UserOutputDto })
  async me(): Promise<UserOutputDto> {
    return this.authService.getProfile("user-maya");
  }
}
