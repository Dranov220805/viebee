import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class VerifyWorkshopInputDto {
  @ApiProperty({ type: Boolean, example: true, description: "Whether workshop meets QC standards" })
  @IsBoolean()
  isApproved!: boolean;
}
