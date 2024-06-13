import { UserEntity } from "../../home/entities/user-entity";

//                       👇 pick untuk milih data apa aja yg mau kita ambil di UserEntity
export type UserSearch = Pick<
  UserEntity,
  "photoProfile" | "fullName" | "userName" | "bio"
> & {
  isFollowed: true;
};