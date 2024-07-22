import { PrismaClient } from "@prisma/client";
import { UserJWTPayload } from "../types/auth";
import { editProfileDTO } from "../dto/auth-dto";

const prisma = new PrismaClient();

//  masukkan ke parameter (query string step 2)
async function find(search: string, userId: number) {
  try {
    const data = await prisma.user.findMany({
      where: {
        userName: {
          contains: search,
          mode: "insensitive",
        },
      },
      include: {
        followers: true,
        followeds: true,
      },
    });

    return data.map((profile) => {
      return {
        ...profile,
        TotalFollowers: profile.followers.length,
        isFollower: profile.followers.some(
          (followers) => followers.followerId === userId
        ),
      };
    });
  } catch (error) {
    throw new Error(error.message || "Failed to retrieve users");
  }
}

async function findOneProfile(id: number) {
  try {
    const profile = await prisma.user.findFirst({
      where: { id },
      include: {
        followers: true,
        followeds: true,
      },
    });

    if (!profile) {
      throw new Error("Profile not found!");
    }

    return {
      ...profile,
      TotalFollowers: profile.followers.length,
      isFollower: profile.followers.some(
        (follower) => follower.followerId === id
      ),
      TotalFolloweds: profile.followeds.length,
      isFollowed: profile.followeds.some(
        (followed) => followed.followedId === id
      ),
    };
  } catch (error) {
    throw new String(error);
  }
}

async function updateProfile(id: number, dto: editProfileDTO) {
  try {
    const user = await prisma.user.findFirst({
      where: { id: Number(id) },
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
      where: { id: Number(id) },
      data: { ...user },
    });
  } catch (error) {
    throw new String(error);
  }
}

export default { find, updateProfile, findOneProfile };
