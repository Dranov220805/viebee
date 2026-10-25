import { BookingEntity } from "../entities/booking.entity";

export interface IBookingRepository {
  findById(id: string): Promise<BookingEntity | null>;
  findByTravelerId(travelerId: string): Promise<BookingEntity[]>;
  findByHostId(hostId: string): Promise<BookingEntity[]>;
  create(booking: Partial<BookingEntity>): Promise<BookingEntity>;
}
