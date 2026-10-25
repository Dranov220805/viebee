import { Injectable } from "@nestjs/common";
import { IWorkshopRepository } from "@domain/repositories";
import { WorkshopEntity, WorkshopSlotEntity } from "@domain/entities";
import { BusinessException } from "@domain-shared/errors/business.error";
import { INITIAL_WORKSHOPS } from "../../data/seed-workshops";

@Injectable()
export class WorkshopInMemoryRepository implements IWorkshopRepository {
  private workshops: WorkshopEntity[] = [...INITIAL_WORKSHOPS];

  async findAll(category?: string, query?: string): Promise<WorkshopEntity[]> {
    let result = [...this.workshops];
    if (category && category !== "all") {
      result = result.filter((w) => w.category === category);
    }
    if (query && query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.titleVi.toLowerCase().includes(q) ||
          w.district.toLowerCase().includes(q) ||
          (w.hostName && w.hostName.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async findById(id: string): Promise<WorkshopEntity | null> {
    const item = this.workshops.find((w) => w.id === id);
    return item ? { ...item } : null;
  }

  async create(workshop: Partial<WorkshopEntity>): Promise<WorkshopEntity> {
    const newWorkshop: WorkshopEntity = {
      id: workshop.id || `ws-${Date.now()}`,
      title: workshop.title || "Traditional Community Workshop",
      titleVi: workshop.titleVi || workshop.title || "Trải Nghiệm Văn Hóa Bản Địa",
      hostId: workshop.hostId || "user-baba",
      hostName: workshop.hostName || "Nghệ nhân bản địa",
      hostAvatar: workshop.hostAvatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      hostBio: workshop.hostBio || "Nghệ nhân lưu giữ di sản văn hóa truyền thống.",
      category: workshop.category || "culinary",
      district: workshop.district || "District 3",
      address: workshop.address || "TP. Hồ Chí Minh",
      latitude: workshop.latitude || 10.7769,
      longitude: workshop.longitude || 106.7009,
      price: workshop.price || 450000,
      durationMinutes: workshop.durationMinutes || 90,
      maxGuests: workshop.maxGuests || 6,
      description: workshop.description || "",
      culturalStory: workshop.culturalStory || "",
      ingredientsOrTools: workshop.ingredientsOrTools || [],
      etiquetteTips: workshop.etiquetteTips || ["Vui lòng tháo giày trước khi vào nhà."],
      images: workshop.images?.length ? workshop.images : ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"],
      rating: 5.0,
      reviewCount: 0,
      qcVerified: false,
      slots: workshop.slots?.length ? workshop.slots : [
        {
          id: `slot-${Date.now()}-1`,
          workshopId: workshop.id || `ws-${Date.now()}`,
          date: "2026-11-02",
          startTime: "09:30",
          endTime: "11:00",
          capacity: workshop.maxGuests || 6,
          bookedCount: 0,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.workshops.unshift(newWorkshop);
    return newWorkshop;
  }

  async update(id: string, updates: Partial<WorkshopEntity>): Promise<WorkshopEntity> {
    const index = this.workshops.findIndex((w) => w.id === id);
    if (index === -1) {
      throw BusinessException.workshopNotFound(id);
    }
    this.workshops[index] = { ...this.workshops[index], ...updates, updatedAt: new Date() };
    return this.workshops[index];
  }

  async updateSlotBookedCount(workshopId: string, slotId: string, incrementBy: number): Promise<WorkshopSlotEntity> {
    const workshop = this.workshops.find((w) => w.id === workshopId);
    if (!workshop) {
      throw BusinessException.workshopNotFound(workshopId);
    }
    const slot = workshop.slots.find((s) => s.id === slotId);
    if (!slot) {
      throw BusinessException.slotNotFound(slotId);
    }

    const availableSeats = slot.capacity - (slot.bookedCount || 0);
    if (incrementBy > availableSeats) {
      throw BusinessException.slotFull(availableSeats, incrementBy);
    }

    slot.bookedCount = (slot.bookedCount || 0) + incrementBy;
    return slot;
  }

  async verifyWorkshop(id: string, isApproved: boolean): Promise<WorkshopEntity> {
    const workshop = await this.update(id, { qcVerified: isApproved });
    return workshop;
  }
}
