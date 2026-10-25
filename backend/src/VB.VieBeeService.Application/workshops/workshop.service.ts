import { Injectable, Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "@infrastructure/constants/tokens";
import { IWorkshopRepository } from "@domain/repositories";
import { WorkshopEntity } from "@domain/entities";
import { CreateWorkshopInputDto, WorkshopOutputDto } from "@application-contracts/dtos";
import { BusinessException } from "@domain-shared/errors/business.error";

@Injectable()
export class WorkshopService {
  constructor(
    @Inject(REPOSITORY_TOKENS.WORKSHOP)
    private readonly workshopRepo: IWorkshopRepository
  ) {}

  async findAll(category?: string, query?: string): Promise<WorkshopOutputDto[]> {
    const list = await this.workshopRepo.findAll(category, query);
    return list.map(this.toOutputDto);
  }

  async findById(id: string): Promise<WorkshopOutputDto> {
    const item = await this.workshopRepo.findById(id);
    if (!item) {
      throw BusinessException.workshopNotFound(id);
    }
    return this.toOutputDto(item);
  }

  async create(dto: CreateWorkshopInputDto, hostId: string): Promise<WorkshopOutputDto> {
    const created = await this.workshopRepo.create({
      title: dto.title,
      titleVi: dto.titleVi || dto.title,
      hostId,
      category: dto.category,
      district: dto.district,
      address: dto.address,
      latitude: dto.latitude,
      longitude: dto.longitude,
      price: dto.price,
      durationMinutes: dto.durationMinutes || 90,
      maxGuests: dto.maxGuests || 6,
      description: dto.description,
      culturalStory: dto.culturalStory || "",
      ingredientsOrTools: dto.ingredientsOrTools || [],
      etiquetteTips: dto.etiquetteTips || ["Vui lòng tháo giày trước khi vào nhà."],
      images: dto.images || [],
    });

    return this.toOutputDto(created);
  }

  async verify(id: string, isApproved: boolean): Promise<WorkshopOutputDto> {
    const updated = await this.workshopRepo.verifyWorkshop(id, isApproved);
    return this.toOutputDto(updated);
  }

  private toOutputDto(entity: WorkshopEntity): WorkshopOutputDto {
    return {
      id: entity.id,
      title: entity.title,
      titleVi: entity.titleVi,
      hostId: entity.hostId,
      hostName: entity.hostName,
      hostAvatar: entity.hostAvatar,
      hostBio: entity.hostBio,
      category: entity.category,
      district: entity.district,
      address: entity.address,
      latitude: entity.latitude,
      longitude: entity.longitude,
      price: entity.price,
      durationMinutes: entity.durationMinutes,
      maxGuests: entity.maxGuests,
      description: entity.description,
      culturalStory: entity.culturalStory,
      ingredientsOrTools: entity.ingredientsOrTools,
      etiquetteTips: entity.etiquetteTips,
      images: entity.images,
      rating: entity.rating,
      reviewCount: entity.reviewCount,
      qcVerified: entity.qcVerified,
      slots: entity.slots.map((s) => ({
        id: s.id,
        workshopId: s.workshopId,
        date: s.date,
        startTime: s.startTime,
        endTime: s.endTime,
        capacity: s.capacity,
        bookedCount: s.bookedCount,
      })),
      createdAt: entity.createdAt,
    };
  }
}
