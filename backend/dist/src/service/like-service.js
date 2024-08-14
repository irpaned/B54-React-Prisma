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
function like(threadId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1. cek dulu ada ga threadnya
            const thread = yield prisma.thread.findUnique({
                where: {
                    id: threadId,
                },
            });
            if (!thread)
                throw new Error("Thread not found");
            // 2. cek ada atau ngga user yang ngelike
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user)
                throw new Error("User not found");
            const isLike = yield prisma.like.findFirst({
                where: {
                    threadId: thread.id,
                    userId: user.id,
                },
            });
            if (isLike) {
                return yield prisma.like.deleteMany({
                    where: {
                        threadId,
                        userId,
                    },
                });
            }
            else {
                return yield prisma.like.create({
                    data: {
                        threadId,
                        userId,
                    },
                });
            }
        }
        catch (error) {
            throw Error;
        }
    });
}
function unlike(threadId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // cek dulu ada ga threadnya
            const thread = yield prisma.thread.findUnique({
                where: {
                    id: threadId,
                },
            });
            if (!thread)
                throw new Error("Thread not found");
            // cek ada atau ngga user yang ngelike
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user)
                throw new Error("User not found");
            // return
            return yield prisma.like.deleteMany({
                where: {
                    threadId,
                    userId,
                },
            });
        }
        catch (error) {
            throw Error;
        }
    });
}
// async function GetLike
exports.default = { like, unlike };
//# sourceMappingURL=like-service.js.map