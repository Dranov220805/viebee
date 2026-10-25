import { Injectable } from "@nestjs/common";
import { IUserRepository } from "@domain/repositories";
import { UserEntity } from "@domain/entities";
import { UserRole } from "@domain-shared/enums";

@Injectable()
export class UserInMemoryRepository implements IUserRepository {
  private users: UserEntity[] = [
    {
      id: "user-maya",
      email: "maya.traveler@example.com",
      name: "Maya Jenkins",
      role: UserRole.TRAVELER,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Independent cultural explorer from Melbourne. Passionate about authentic grassroots cooking.",
      phone: "+61 400 123 456",
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "user-baba",
      email: "baba.che@viebee.vn",
      name: "Bà Ba (Nguyễn Thị Mai)",
      role: UserRole.HOST,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      bio: "3rd-generation Southern dessert cook in Bàn Cờ alley.",
      phone: "+84 903 888 123",
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "user-admin",
      email: "qc@viebee.vn",
      name: "VieBee QC & Community Team",
      role: UserRole.ADMIN,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      bio: "UEH UII Sandbox 2026 incubation team.",
      phone: "+84 28 3829 5601",
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findById(id: string): Promise<UserEntity | null> {
    const user = this.users.find((u) => u.id === id);
    return user ? { ...user } : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return user ? { ...user } : null;
  }

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const newUser: UserEntity = {
      id: user.id || `user-${Date.now()}`,
      email: user.email!,
      name: user.name || "VieBee Member",
      role: user.role || UserRole.TRAVELER,
      avatar: user.avatar,
      bio: user.bio,
      phone: user.phone,
      isVerified: user.isVerified || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, updates: Partial<UserEntity>): Promise<UserEntity> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error(`User with ID ${id} not found.`);
    }
    this.users[index] = { ...this.users[index], ...updates, updatedAt: new Date() };
    return this.users[index];
  }
}
