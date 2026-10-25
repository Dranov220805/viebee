import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateBookingInputDto {
  @ApiProperty({ type: String, example: "ws-che-buoi" })
  @IsString()
  @IsNotEmpty()
  workshopId!: string;

  @ApiProperty({ type: String, example: "slot-cb-1" })
  @IsString()
  @IsNotEmpty()
  slotId!: string;

  @ApiProperty({ type: Number, example: 2, description: "Number of guests attending" })
  @IsNumber()
  @Min(1)
  guestsCount: number = 1;
}
