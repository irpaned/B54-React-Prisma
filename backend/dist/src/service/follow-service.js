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
const prisma = new client_1.PrismaClient();
function follow(followedId, followerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const targetUser = yield prisma.user.findUnique({
                where: {
                    id: followedId,
                },
            });
            const myUser = yield prisma.user.findUnique({
                where: {
                    id: followerId,
                },
            });
            if (targetUser === myUser)
                throw new Error("You can't follow yourself!");
            if (!targetUser || !myUser)
                throw new Error("User not found!");
            const isFollowing = yield prisma.follow.findFirst({
                where: {
                    followedId: targetUser.id,
                    followerId: myUser.id,
                },
            });
            if (isFollowing) {
                return yield prisma.follow.deleteMany({
                    where: {
                        followerId,
                        followedId,
                    },
                });
            }
            else {
                return yield prisma.follow.create({
                    data: {
                        followedId,
                        followerId,
                    },
                });
            }
        }
        catch (error) {
            throw Error;
        }
    });
}
exports.default = { follow };
//# sourceMappingURL=follow-service.js.map