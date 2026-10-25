import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CopilotChatInputDto {
  @ApiProperty({ type: String, example: "ws-che-buoi", description: "Workshop context ID" })
  @IsString()
  @IsNotEmpty()
  workshopId!: string;

  @ApiProperty({ type: String, example: "Are cashews used in this dessert? I have a mild nut allergy." })
  @IsString()
  @IsNotEmpty()
  message!: string;

  @ApiPropertyOptional({ type: String, example: "TRAVELER" })
  @IsString()
  @IsOptional()
  senderRole?: string;
}

export class TranslateInputDto {
  @ApiProperty({ type: String, example: "Could we arrive 15 minutes early to help prepare?" })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiPropertyOptional({ type: String, example: "en" })
  @IsString()
  @IsOptional()
  sourceLanguage?: string;

  @ApiPropertyOptional({ type: String, example: "vi" })
  @IsString()
  @IsOptional()
  targetLanguage?: string;
}
