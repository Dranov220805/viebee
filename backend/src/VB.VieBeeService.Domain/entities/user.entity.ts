import { BaseEntity } from "./base.entity";
import { UserRole } from "@domain-shared/enums";

export class UserEntity extends BaseEntity {
  email!: string;
  passwordHash?: string;
  name!: string;
  role!: UserRole;
  avatar?: string;
  bio?: string;
  phone?: string;
  isVerified: boolean = false;
}
