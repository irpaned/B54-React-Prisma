import { UserEntity } from "./user-entity";

export type SuggestEntity = {
  id: number;
  user: UserEntity;
  createdAt: Date;
  updatedAt: Date;
};
