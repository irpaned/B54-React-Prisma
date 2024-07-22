import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// async function followUser(followedId: number, followerId: number) {
//   try {
//     // 1. cek user yang mau di follow
//     const user = await prisma.user.findUnique({
//       where: {
//         id: followedId,
//       },
//     });

//     if (!user) throw new Error("User not found!");

//     // 2. cek user yang mau di nge-follow
//     const myUser = await prisma.user.findUnique({
//       where: {
//         id: followerId,
//       },
//     });

//     if (!myUser) throw new Error("User not found!");

//     // 3. return
//     return await prisma.follow.create({
//       data: {
//         followedId,
//         followerId,
//       },
//     });
//   } catch (error) {
//     throw Error;
//   }
// }

// async function unfollowUser(followedId: number, followerId: number) {
//   try {
//     const targetUser = await prisma.user.findUnique({
//       where: {
//         id: followedId,
//       },
//     });

//     // if (!user) throw new Error("User not found!");

//     const myUser = await prisma.user.findUnique({
//       where: {
//         id: followerId,
//       },
//     });
//     // if (!myUser) throw new Error("User not found!");
//     // return await prisma.follow.deleteMany({
//     //   where: {
//     //     followedId,
//     //     followerId,
//     //   },
//     // });
//   } catch (error) {
//     throw Error;
//   }
// }

async function follow(followedId: number, followerId: number) {
  try {
    const targetUser = await prisma.user.findUnique({
      where: {
        id: followedId,
      },
    });

    const myUser = await prisma.user.findUnique({
      where: {
        id: followerId,
      },
    });

    if (targetUser === myUser) throw new Error("You can't follow yourself!");

    if (!targetUser || !myUser) throw new Error("User not found!");

    const isFollowing = await prisma.follow.findFirst({
      where: {
        followedId: targetUser.id,
        followerId: myUser.id,
      },
    });
    if (isFollowing) {
      return await prisma.follow.deleteMany({
        where: {
          followedId,
          followerId,
        },
      });
    } else {
      return await prisma.follow.create({
        data: {
          followedId,
          followerId,
        },
      });
    }
  } catch (error) {
    throw Error;
  }
}

export default { follow };
