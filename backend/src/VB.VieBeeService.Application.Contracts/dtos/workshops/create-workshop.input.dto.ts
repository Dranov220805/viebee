import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, Min } from "class-validator";

export class CreateWorkshopInputDto {
  @ApiProperty({ type: String, example: "Traditional Southern Chè Bưởi Cooking" })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ type: String, example: "Nấu Chè Bưởi Cổ Truyền Hương Hoa Bưởi" })
  @IsString()
  @IsOptional()
  titleVi?: string;

  @ApiProperty({ type: String, example: "culinary" })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ type: String, example: "District 3 (Quận 3 - Bàn Cờ)" })
  @IsString()
  @IsNotEmpty()
  district!: string;

  @ApiProperty({ type: String, example: "Hẻm 242/18 Nguyễn Thiện Thuật, Phường 3, Quận 3, TP. Hồ Chí Minh" })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({ type: Number, example: 10.7685 })
  @IsNumber()
  latitude!: number;

  @ApiProperty({ type: Number, example: 106.6804 })
  @IsNumber()
  longitude!: number;

  @ApiProperty({ type: Number, example: 450000 })
  @IsNumber()
  @Min(50000)
  price!: number;

  @ApiProperty({ type: Number, example: 90 })
  @IsNumber()
  durationMinutes: number = 90;

  @ApiProperty({ type: Number, example: 6 })
  @IsNumber()
  @Min(1)
  maxGuests: number = 6;

  @ApiProperty({ type: String, example: "Step into an authentic open-air courtyard kitchen..." })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional({ type: String, example: "Chè Bưởi is a testament to Vietnamese culinary ingenuity..." })
  @IsString()
  @IsOptional()
  culturalStory?: string;

  @ApiPropertyOptional({ type: [String], example: ["Fresh Năm Roi Pomelo Pith", "Mung beans"] })
  @IsArray()
  @IsOptional()
  ingredientsOrTools?: string[];

  @ApiPropertyOptional({ type: [String], example: ["Please remove shoes before stepping into living quarters."] })
  @IsArray()
  @IsOptional()
  etiquetteTips?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];
}
