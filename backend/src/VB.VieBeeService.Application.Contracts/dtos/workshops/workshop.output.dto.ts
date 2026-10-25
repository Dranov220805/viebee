import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class WorkshopSlotOutputDto {
  @ApiProperty({ type: String, example: "slot-1" })
  id!: string;

  @ApiProperty({ type: String, example: "ws-1" })
  workshopId!: string;

  @ApiProperty({ type: String, example: "2026-10-30" })
  date!: string;

  @ApiProperty({ type: String, example: "09:30" })
  startTime!: string;

  @ApiProperty({ type: String, example: "11:00" })
  endTime!: string;

  @ApiProperty({ type: Number, example: 6 })
  capacity!: number;

  @ApiProperty({ type: Number, example: 2 })
  bookedCount!: number;
}

export class WorkshopOutputDto {
  @ApiProperty({ type: String, example: "ws-che-buoi" })
  id!: string;

  @ApiProperty({ type: String, example: "Old-Alley Authentic Chè Bưởi Cooking" })
  title!: string;

  @ApiProperty({ type: String, example: "Nấu Chè Bưởi Cổ Truyền Bàn Cờ" })
  titleVi!: string;

  @ApiProperty({ type: String, example: "user-baba" })
  hostId!: string;

  @ApiPropertyOptional({ type: String, example: "Bà Ba" })
  hostName?: string;

  @ApiPropertyOptional({ type: String })
  hostAvatar?: string;

  @ApiPropertyOptional({ type: String })
  hostBio?: string;

  @ApiProperty({ type: String, example: "culinary" })
  category!: string;

  @ApiProperty({ type: String, example: "District 3" })
  district!: string;

  @ApiProperty({ type: String, example: "Hẻm 242/18 Nguyễn Thiện Thuật" })
  address!: string;

  @ApiProperty({ type: Number, example: 10.7685 })
  latitude!: number;

  @ApiProperty({ type: Number, example: 106.6804 })
  longitude!: number;

  @ApiProperty({ type: Number, example: 450000 })
  price!: number;

  @ApiProperty({ type: Number, example: 90 })
  durationMinutes!: number;

  @ApiProperty({ type: Number, example: 6 })
  maxGuests!: number;

  @ApiProperty({ type: String })
  description!: string;

  @ApiPropertyOptional({ type: String })
  culturalStory?: string;

  @ApiProperty({ type: [String] })
  ingredientsOrTools!: string[];

  @ApiProperty({ type: [String] })
  etiquetteTips!: string[];

  @ApiProperty({ type: [String] })
  images!: string[];

  @ApiProperty({ type: Number, example: 4.95 })
  rating!: number;

  @ApiProperty({ type: Number, example: 38 })
  reviewCount!: number;

  @ApiProperty({ type: Boolean, example: true })
  qcVerified!: boolean;

  @ApiProperty({ type: () => [WorkshopSlotOutputDto] })
  slots!: WorkshopSlotOutputDto[];

  @ApiProperty({ type: Date })
  createdAt!: Date;
}
