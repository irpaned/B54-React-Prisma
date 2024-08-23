import { UserEntity } from "./user-entity";

export type FollowEntity = {
  id: number;
  followedId: number;
  followerId: number;
  user: UserEntity;
  TotalLikes: number;
  isFollowed: boolean;
};

export type followers = {
  id: number;
  followed: {
    id: number;
    fullName: string;
    userName: string;
    photoProfile: string;
  };
};

export type FollowingsEntity = {
  followers: followers[];
};

export type followeds = {
  id: number;
  follower: {
    id: number;
    fullName: string;
    userName: string;
    photoProfile: string;
  };
};

export type FollowersEntity = {
  followeds: followeds[];
};

export type countFollowEntity = {
  TotalFollower: number;
  TotalFollowing: number;
  userName: string;
  id: number;
};
