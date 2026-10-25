import { Injectable, Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "@infrastructure/constants/tokens";
import { IWorkshopRepository } from "@domain/repositories";
import { WorkshopOutputDto } from "@application-contracts/dtos";

@Injectable()
export class QcService {
  constructor(
    @Inject(REPOSITORY_TOKENS.WORKSHOP)
    private readonly workshopRepo: IWorkshopRepository
  ) {}

  async verifyWorkshop(workshopId: string, isApproved: boolean): Promise<WorkshopOutputDto> {
    const updated = await this.workshopRepo.verifyWorkshop(workshopId, isApproved);
    return {
      id: updated.id,
      title: updated.title,
      titleVi: updated.titleVi,
      hostId: updated.hostId,
      category: updated.category,
      district: updated.district,
      address: updated.address,
      latitude: updated.latitude,
      longitude: updated.longitude,
      price: updated.price,
      durationMinutes: updated.durationMinutes,
      maxGuests: updated.maxGuests,
      description: updated.description,
      ingredientsOrTools: updated.ingredientsOrTools,
      etiquetteTips: updated.etiquetteTips,
      images: updated.images,
      rating: updated.rating,
      reviewCount: updated.reviewCount,
      qcVerified: updated.qcVerified,
      slots: updated.slots,
      createdAt: updated.createdAt,
    };
  }
}
