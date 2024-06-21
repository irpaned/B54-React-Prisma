import { PrismaClient } from "@prisma/client";
import { UserJWTPayload } from "../types/auth";
import { editProfileDTO } from "../dto/auth-dto";

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

async function findOneProfile( id : number ) {
  try {
     const user = await prisma.user.findFirst({
          where: { id },
      });

      if(!user) throw new String("User not found!");;

      return user;
  }   catch (error) {
      throw new String(error);
      }
  }

async function updateProfile(id : number, dto : editProfileDTO) {
  try {
   
   const user = await prisma.user.findFirst({
    where: { id : Number (id) },
});

   if (dto.fullName) { 
    user.fullName = dto.fullName;
}

if (dto.userName) { 
    user.userName = dto.userName;
}

if (dto.bio) { 
  user.bio = dto.bio;
}
  return await prisma.user.update({
    where : { id : Number(id) },
    data : { ...user }
}); 

  } catch (error) {
       throw new String(error);
  }

};  

export default { find, updateProfile, findOneProfile };