import { ApiProperty } from "@nestjs/swagger";
import { BookingStatus } from "@domain-shared/enums";

export class BookingOutputDto {
  @ApiProperty({ type: String, example: "rsvp-1729860000" })
  id!: string;

  @ApiProperty({ type: String, example: "ws-che-buoi" })
  workshopId!: string;

  @ApiProperty({ type: String, example: "Old-Alley Authentic Chè Bưởi Cooking" })
  workshopTitle?: string;

  @ApiProperty({ type: String, example: "slot-cb-1" })
  slotId!: string;

  @ApiProperty({ type: String, example: "user-maya" })
  travelerId!: string;

  @ApiProperty({ type: String, example: "Maya Jenkins" })
  travelerName?: string;

  @ApiProperty({ type: Number, example: 2 })
  guestsCount!: number;

  @ApiProperty({ type: Number, example: 900000, description: "Total price paid by traveler" })
  totalPrice!: number;

  @ApiProperty({ type: Number, example: 108000, description: "12% VieBee platform commission" })
  platformFee!: number;

  @ApiProperty({ type: Number, example: 792000, description: "88% Direct net payout to local host" })
  hostPayout!: number;

  @ApiProperty({ enum: BookingStatus, example: BookingStatus.CONFIRMED })
  status!: BookingStatus;

  @ApiProperty({ type: String, example: "VIEBEE-PASS-1729860000-MAY" })
  qrCodeToken!: string;

  @ApiProperty({ type: Date })
  bookedAt!: Date;

  @ApiProperty({ type: String, example: "Hẻm 242/18 Nguyễn Thiện Thuật, Phường 3, Quận 3" })
  address?: string;
}
