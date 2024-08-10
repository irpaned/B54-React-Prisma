import { UserEntity } from "./user-entity";

export type ThreadEntity = {
  id: number;
  content: string;
  image: string;
  user: UserEntity;
  createdAt: Date;
  updatedAt: Date;
  TotalLikes: number;
  TotalReplies: number;
  isLiked: boolean;
};
