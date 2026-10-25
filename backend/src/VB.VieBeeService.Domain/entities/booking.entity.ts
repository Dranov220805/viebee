import { BaseEntity } from "./base.entity";
import { BookingStatus } from "@domain-shared/enums";

export class BookingEntity extends BaseEntity {
  workshopId!: string;
  workshopTitle?: string;
  slotId!: string;
  travelerId!: string;
  travelerName?: string;
  travelerEmail?: string;
  guestsCount: number = 1;
  totalPrice!: number;
  platformFee!: number; // 12% VieBee take rate
  hostPayout!: number;  // 88% Host direct payout
  status: BookingStatus = BookingStatus.CONFIRMED;
  qrCodeToken!: string;
  bookedAt!: Date;
  address?: string;
}
