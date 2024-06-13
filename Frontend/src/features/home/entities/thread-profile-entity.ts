// menampilkan relasi user step 2

import { UserEntity } from "./user-entity";


export type ThreadProfileEntity = {
  id: number;
  content: string;
  image: string;
  // 👇 UserEntity di import dari user-entity
  user: UserEntity;
  createdAt: Date;
  updatedAt: Date;
  // userId : number;


  
};