import { BaseEntity } from "./base.entity";

export class ReviewEntity extends BaseEntity {
  workshopId!: string;
  userId!: string;
  userName?: string;
  userAvatar?: string;
  rating!: number;
  comment!: string;
}
