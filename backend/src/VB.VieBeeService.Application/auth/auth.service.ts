import { Injectable, Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "@infrastructure/constants/tokens";
import { IUserRepository } from "@domain/repositories";
import { LoginInputDto, UserOutputDto } from "@application-contracts/dtos";
import { BusinessException } from "@domain-shared/errors/business.error";

@Injectable()
export class AuthService {
  constructor(
    @Inject(REPOSITORY_TOKENS.USER)
    private readonly userRepo: IUserRepository
  ) {}

  async login(dto: LoginInputDto): Promise<{ user: UserOutputDto; token: string }> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) {
      throw BusinessException.invalidCredentials();
    }

    const token = `mock-jwt-token-for-${user.id}`;
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        isVerified: user.isVerified,
      },
      token,
    };
  }

  async getProfile(userId: string): Promise<UserOutputDto> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw BusinessException.notFound("Không tìm thấy thông tin tài khoản.");
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      isVerified: user.isVerified,
    };
  }
}
