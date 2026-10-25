import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginInputDto {
  @ApiProperty({ type: String, example: "maya.traveler@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ type: String, example: "Password123!" })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class UserOutputDto {
  @ApiProperty({ type: String, example: "user-maya" })
  id!: string;

  @ApiProperty({ type: String, example: "maya.traveler@example.com" })
  email!: string;

  @ApiProperty({ type: String, example: "Maya Jenkins" })
  name!: string;

  @ApiProperty({ type: String, example: "TRAVELER" })
  role!: string;

  @ApiProperty({ type: String })
  avatar?: string;

  @ApiProperty({ type: String })
  bio?: string;

  @ApiProperty({ type: Boolean, example: true })
  isVerified!: boolean;
}
