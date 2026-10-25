import { BaseEntity } from "./base.entity";

export class WorkshopSlotEntity {
  id!: string;
  workshopId!: string;
  date!: string;
  startTime!: string;
  endTime!: string;
  capacity!: number;
  bookedCount!: number;
}

export class WorkshopEntity extends BaseEntity {
  title!: string;
  titleVi!: string;
  hostId!: string;
  hostName?: string;
  hostAvatar?: string;
  hostBio?: string;
  category!: string;
  district!: string;
  address!: string;
  latitude!: number;
  longitude!: number;
  price!: number;
  durationMinutes!: number;
  maxGuests!: number;
  description!: string;
  culturalStory!: string;
  ingredientsOrTools!: string[];
  etiquetteTips!: string[];
  images!: string[];
  rating: number = 5.0;
  reviewCount: number = 0;
  qcVerified: boolean = false;
  slots: WorkshopSlotEntity[] = [];
  ragKnowledgeDoc?: Record<string, any>;
}
