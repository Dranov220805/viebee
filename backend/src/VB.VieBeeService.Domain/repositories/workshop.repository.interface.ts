import { WorkshopEntity, WorkshopSlotEntity } from "../entities/workshop.entity";

export interface IWorkshopRepository {
  findAll(category?: string, query?: string): Promise<WorkshopEntity[]>;
  findById(id: string): Promise<WorkshopEntity | null>;
  create(workshop: Partial<WorkshopEntity>): Promise<WorkshopEntity>;
  update(id: string, updates: Partial<WorkshopEntity>): Promise<WorkshopEntity>;
  updateSlotBookedCount(workshopId: string, slotId: string, incrementBy: number): Promise<WorkshopSlotEntity>;
  verifyWorkshop(id: string, isApproved: boolean): Promise<WorkshopEntity>;
}
