import { PrismaClient } from "@prisma/client";
import { UserJWTPayload } from "../types/auth";

const prisma = new PrismaClient();

            //  masukkan ke parameter (query string step 2)
async function find(search: string) {
  try {
    return await prisma.user.findMany({
     //  masukkan bagian yg mau dijadikan untuk pencarian (query string step 3)
      where: {
        userName: {
          contains: search, // contains disini berfungsi untuk mencari semua user yang memiliki nama yg sama/mirip
          mode: "insensitive", // ini berfungsi agar ukuran font besar kecilnya ga ngaruh, jadi misalkan carinya pakai huruf besar semua, contoh : IRFAN, ini ga masalah
        }
      },
    });
  } catch (error) {
    throw new Error(error.message || "Failed to retrieve users");
  }
}

// async function find(user: UserJWTPayload, search: string) {
//   try {
//     const users = await prisma.user.findMany();

//     const follows = await prisma.follow.findMany({
//       where: {
//         followerId: user.id,
//       },
//     });

//     return users.map((u) => {
//       const isFollowed = follows.some((follow) => follow.followedId === u.id);
//       return { ...u, isFollowed };
//     });
//   } catch (error) {
//     throw new Error(error.message || "Failed to retrieve users");
//   }
// }

export default { find };