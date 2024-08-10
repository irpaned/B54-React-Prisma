import { UserEntity } from "./user-entity";

export type FollowEntity = {
  id: number;
  followedId: number;
  followerId: number;
  user: UserEntity;
  TotalLikes: number;
  isFollowed: boolean;
};
