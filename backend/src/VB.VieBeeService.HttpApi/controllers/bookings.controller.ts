import { Controller, Get, Post, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { BookingService } from "@application/bookings/booking.service";
import { CreateBookingInputDto, BookingOutputDto } from "@application-contracts/dtos";

@ApiTags("Bookings & RSVP")
@Controller("bookings")
export class BookingsController {
  constructor(
    @Inject(BookingService)
    private readonly bookingService: BookingService
  ) {}

  @Post()
  @ApiOperation({ summary: "Create an instant workshop RSVP booking (12% platform take rate applied)" })
  @ApiResponse({ status: 201, type: BookingOutputDto })
  async createBooking(@Body() dto: CreateBookingInputDto): Promise<BookingOutputDto> {
    // In production, travelerId is extracted from JWT
    const travelerId = "user-maya";
    return this.bookingService.create(dto, travelerId);
  }

  @Get("my-passes")
  @ApiOperation({ summary: "List active electronic tickets and QR passes for current traveler" })
  @ApiResponse({ status: 200, type: [BookingOutputDto] })
  async getMyPasses(): Promise<BookingOutputDto[]> {
    return this.bookingService.findByTraveler("user-maya");
  }

  @Get("host-reservations")
  @ApiOperation({ summary: "List incoming workshop reservations for host dashboard" })
  @ApiResponse({ status: 200, type: [BookingOutputDto] })
  async getHostReservations(): Promise<BookingOutputDto[]> {
    return this.bookingService.findByHost("user-baba");
  }
}
