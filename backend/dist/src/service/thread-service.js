"use strict";
// disini adalah kumpulan logic, bukan tempat mengembalikan respon
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const thread_schema_1 = require("../validators/thread-schema");
const cloudinary_1 = require("cloudinary");
const thread_controller_1 = __importDefault(require("../controllers/thread-controller"));
const prisma = new client_1.PrismaClient();
function find(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.thread.findMany({
                include: {
                    user: {
                        select: {
                            fullName: true,
                            photoProfile: true,
                            userName: true,
                        },
                    },
                    likes: true,
                    replies: true,
                },
            });
            return data.map((thread) => {
                return Object.assign(Object.assign({}, thread), { TotalLikes: thread.likes.length, isLiked: thread.likes.some((like) => like.userId === userId), TotalReplies: thread.replies.length, isReplied: thread.replies.some((replies) => replies.userId === userId) });
            });
        }
        catch (error) {
            return error;
        }
    });
}
function findOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const thread = yield prisma.thread.findFirst({
                where: { id },
            });
            if (!thread)
                throw new String("Thread not found!");
            return thread;
        }
        catch (error) {
            throw new String(error);
        }
    });
}
function findManyProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.thread.findMany({
                where: { userId },
                include: {
                    user: true,
                    likes: true,
                    replies: true,
                },
            });
            if (!thread_controller_1.default)
                throw new String("Thread not found!");
            return data.map((thread) => {
                return Object.assign(Object.assign({}, thread), { TotalLikes: thread.likes.length, isLiked: thread.likes.some((like) => like.userId === userId), TotalReplies: thread.replies.length, isReplied: thread.replies.some((replies) => replies.userId === userId) });
            });
        }
        catch (error) {
            throw new String(error);
        }
    });
}
// async function findCardImage(userId: number, image: string) {
//   try {
//     const data = await prisma.thread.findMany({
//       where: { userId, image },
//       include: {
//         user: true,
//         likes: true,
//         replies: true,
//       },
//     });
//     if (!thread) throw new String("Thread not found!");
//     return data.map((thread) => {
//       return {
//         ...thread,
//         TotalLikes: thread.likes.length,
//         isLiked: thread.likes.some((like) => like.userId === userId),
//         TotalReplies: thread.replies.length,
//         isReplied: thread.replies.some((replies) => replies.userId === userId),
//       };
//     });
//   } catch (error) {
//     throw new String(error);
//   }
// }
function create(dto, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //   validasi menggunakan joi
            const validate = thread_schema_1.createThreadSchemaJoi.validate(dto);
            if (validate.error) {
                throw new String(validate.error.message);
            }
            cloudinary_1.v2.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            if (dto.image) {
                const upload = yield cloudinary_1.v2.uploader.upload(dto.image, {
                    upload_preset: "b54circle",
                });
                dto.image = upload.secure_url; // secure_url untuk apa?
            }
            return yield prisma.thread.create({
                data: Object.assign(Object.assign({}, dto), { userId: userId }),
            });
        }
        catch (error) {
            throw new String(error);
        }
    });
}
function update(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const thread = yield prisma.thread.findFirst({
                where: { id: Number(id) },
            });
            // ini 👇 cara bacanya : kalau misalkan gaada berarti gausah di update, kalau ada baru diupdate
            if (dto.content) {
                thread.content = dto.content;
            }
            if (dto.image) {
                thread.image = dto.image;
            }
            return yield prisma.thread.update({
                where: { id: Number(id) },
                data: Object.assign({}, thread),
            });
        }
        catch (error) {
            throw new String(error);
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.thread.delete({
                where: { id: Number(id) },
            });
        }
        catch (error) {
            throw new String(error);
        }
    });
}
exports.default = {
    find,
    findOne,
    create,
    update,
    remove,
    findManyProfile,
};
//# sourceMappingURL=thread-service.js.map