import { Injectable, Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "@infrastructure/constants/tokens";
import { IBookingRepository, IWorkshopRepository, IUserRepository } from "@domain/repositories";
import { BookingEntity } from "@domain/entities";
import { CreateBookingInputDto, BookingOutputDto } from "@application-contracts/dtos";
import { BookingStatus } from "@domain-shared/enums";
import { BusinessException } from "@domain-shared/errors/business.error";
import { env } from "../../config/env";

@Injectable()
export class BookingService {
  constructor(
    @Inject(REPOSITORY_TOKENS.BOOKING)
    private readonly bookingRepo: IBookingRepository,
    @Inject(REPOSITORY_TOKENS.WORKSHOP)
    private readonly workshopRepo: IWorkshopRepository,
    @Inject(REPOSITORY_TOKENS.USER)
    private readonly userRepo: IUserRepository
  ) {}

  async create(dto: CreateBookingInputDto, travelerId: string): Promise<BookingOutputDto> {
    // 1. Fetch authentic workshop details and real price
    const workshop = await this.workshopRepo.findById(dto.workshopId);
    if (!workshop) {
      throw BusinessException.workshopNotFound(dto.workshopId);
    }

    // 2. Fetch authenticated traveler profile
    const traveler = await this.userRepo.findById(travelerId);

    // 3. Increment booked count and validate capacity (Fixes Audit Finding 1)
    await this.workshopRepo.updateSlotBookedCount(dto.workshopId, dto.slotId, dto.guestsCount);

    // 4. Financial Calculations: 12% Platform Take Rate, 88% Host Direct Payout
    const totalPrice = workshop.price * dto.guestsCount;
    const platformFee = Math.round(totalPrice * env.platformFeeRate);
    const hostPayout = totalPrice - platformFee;

    // 5. Generate QR Electronic Pass Token
    const travelerNameSlug = (traveler?.name || "GUEST").slice(0, 3).toUpperCase();
    const qrCodeToken = `VIEBEE-PASS-${Date.now()}-${travelerNameSlug}`;

    // 6. Persist booking
    const created = await this.bookingRepo.create({
      workshopId: workshop.id,
      workshopTitle: workshop.title,
      slotId: dto.slotId,
      travelerId,
      travelerName: traveler?.name || "Maya Jenkins",
      travelerEmail: traveler?.email || "maya.traveler@example.com",
      guestsCount: dto.guestsCount,
      totalPrice,
      platformFee,
      hostPayout,
      status: BookingStatus.CONFIRMED,
      qrCodeToken,
      bookedAt: new Date(),
      address: workshop.address,
    });

    return this.toOutputDto(created);
  }

  async findByTraveler(travelerId: string): Promise<BookingOutputDto[]> {
    const list = await this.bookingRepo.findByTravelerId(travelerId);
    return list.map(this.toOutputDto);
  }

  async findByHost(hostId: string): Promise<BookingOutputDto[]> {
    const list = await this.bookingRepo.findByHostId(hostId);
    return list.map(this.toOutputDto);
  }

  private toOutputDto(entity: BookingEntity): BookingOutputDto {
    return {
      id: entity.id,
      workshopId: entity.workshopId,
      workshopTitle: entity.workshopTitle,
      slotId: entity.slotId,
      travelerId: entity.travelerId,
      travelerName: entity.travelerName,
      guestsCount: entity.guestsCount,
      totalPrice: entity.totalPrice,
      platformFee: entity.platformFee,
      hostPayout: entity.hostPayout,
      status: entity.status,
      qrCodeToken: entity.qrCodeToken,
      bookedAt: entity.bookedAt,
      address: entity.address,
    };
  }
}
