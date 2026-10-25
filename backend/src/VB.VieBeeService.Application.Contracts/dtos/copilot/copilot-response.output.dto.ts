import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CopilotMessageOutputDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  workshopId!: string;

  @ApiProperty({ type: String })
  senderId!: string;

  @ApiProperty({ type: String })
  senderName!: string;

  @ApiProperty({ type: String })
  senderRole!: string;

  @ApiProperty({ type: String })
  originalText!: string;

  @ApiProperty({ type: String })
  originalLanguage!: string;

  @ApiProperty({ type: String })
  translatedText!: string;

  @ApiPropertyOptional({ type: String })
  culturalNote?: string;

  @ApiProperty({ type: String })
  timestamp!: string;
}

export class CopilotResponseOutputDto {
  @ApiProperty({ type: () => CopilotMessageOutputDto })
  userMessage!: CopilotMessageOutputDto;

  @ApiProperty({ type: () => CopilotMessageOutputDto })
  aiReply!: CopilotMessageOutputDto;

  @ApiProperty({ type: String, example: "Grounded Ingredients Check: Only toasted peanuts are used..." })
  groundedAnswer!: string;

  @ApiPropertyOptional({ type: String, example: "Please let the host know about any dietary restrictions upon arrival." })
  etiquetteReminder?: string;

  @ApiProperty({ type: Boolean, example: true })
  verified!: boolean;
}
