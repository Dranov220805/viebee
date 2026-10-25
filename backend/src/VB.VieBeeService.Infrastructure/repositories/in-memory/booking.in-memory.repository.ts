import { Injectable } from "@nestjs/common";
import { IBookingRepository } from "@domain/repositories";
import { BookingEntity } from "@domain/entities";
import { BookingStatus } from "@domain-shared/enums";

@Injectable()
export class BookingInMemoryRepository implements IBookingRepository {
  private bookings: BookingEntity[] = [
    {
      id: "rsvp-seed-1",
      workshopId: "ws-che-buoi",
      workshopTitle: "Old-Alley Authentic Chè Bưởi Cooking",
      slotId: "slot-cb-1",
      travelerId: "user-maya",
      travelerName: "Maya Jenkins",
      travelerEmail: "maya.traveler@example.com",
      guestsCount: 2,
      totalPrice: 900000,
      platformFee: 108000,
      hostPayout: 792000,
      status: BookingStatus.CONFIRMED,
      qrCodeToken: "VIEBEE-PASS-20261025-MAYA",
      bookedAt: new Date("2026-10-24T10:00:00Z"),
      address: "Hẻm 242/18 Nguyễn Thiện Thuật, Phường 3, Quận 3",
      createdAt: new Date("2026-10-24T10:00:00Z"),
      updatedAt: new Date("2026-10-24T10:00:00Z"),
    },
  ];

  async findById(id: string): Promise<BookingEntity | null> {
    const item = this.bookings.find((b) => b.id === id);
    return item ? { ...item } : null;
  }

  async findByTravelerId(travelerId: string): Promise<BookingEntity[]> {
    return this.bookings.filter((b) => b.travelerId === travelerId);
  }

  async findByHostId(hostId: string): Promise<BookingEntity[]> {
    // Return all bookings for workshops hosted by hostId
    return [...this.bookings];
  }

  async create(booking: Partial<BookingEntity>): Promise<BookingEntity> {
    const newBooking: BookingEntity = {
      id: booking.id || `rsvp-${Date.now()}`,
      workshopId: booking.workshopId!,
      workshopTitle: booking.workshopTitle || "Living Heritage Workshop",
      slotId: booking.slotId!,
      travelerId: booking.travelerId || "user-maya",
      travelerName: booking.travelerName || "Maya Jenkins",
      travelerEmail: booking.travelerEmail || "maya.traveler@example.com",
      guestsCount: booking.guestsCount || 1,
      totalPrice: booking.totalPrice!,
      platformFee: booking.platformFee!,
      hostPayout: booking.hostPayout!,
      status: booking.status || BookingStatus.CONFIRMED,
      qrCodeToken: booking.qrCodeToken || `VIEBEE-PASS-${Date.now()}-TOKEN`,
      bookedAt: new Date(),
      address: booking.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.bookings.unshift(newBooking);
    return newBooking;
  }
}
