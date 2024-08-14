"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cloudinary_1 = require("cloudinary");
const prisma = new client_1.PrismaClient();
//  masukkan ke parameter (query string step 2)
function find(search, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.user.findMany({
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
                return Object.assign(Object.assign({}, profile), { TotalFollowers: profile.followers.length, isFollower: profile.followers.some((followers) => followers.followerId === userId) });
            });
        }
        catch (error) {
            throw new Error(error.message || "Failed to retrieve users");
        }
    });
}
function findOneProfile(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const profile = yield prisma.user.findFirst({
                where: { id },
                include: {
                    followers: true,
                    followeds: true,
                },
            });
            if (!profile) {
                throw new Error("Profile not found!");
            }
            return Object.assign(Object.assign({}, profile), { TotalFollowers: profile.followers.length, isFollower: profile.followers.some((follower) => follower.followerId === id), TotalFolloweds: profile.followeds.length, isFollowed: profile.followeds.some((followed) => followed.followedId === id) });
        }
        catch (error) {
            throw new String(error);
        }
    });
}
function updateProfile(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findFirst({
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
            cloudinary_1.v2.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            if (dto.photoProfile) {
                const upload = yield cloudinary_1.v2.uploader.upload(dto.photoProfile, {
                    upload_preset: "b54circle",
                });
                user.photoProfile = dto.photoProfile = upload.secure_url;
            }
            return yield prisma.user.update({
                where: { id: Number(id) },
                data: Object.assign({}, user),
            });
        }
        catch (error) {
            throw new String(error);
        }
    });
}
exports.default = { find, updateProfile, findOneProfile };
//# sourceMappingURL=user-service.js.map