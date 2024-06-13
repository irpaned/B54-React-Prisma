// menampilkan relasi user step 1

// di export untuk digunakan di thread-entity.ts dan juga kepakai di types/search
// di isi dari UserJWTPayload
export type UserEntity = {
    id: number;
    userName: string;
    fullName: string;
    email: string;
    photoProfile: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
  };