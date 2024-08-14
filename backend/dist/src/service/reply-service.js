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
const reply_thread_schema_1 = require("../validators/reply-thread-schema");
const cloudinary_1 = require("cloudinary");
const prisma = new client_1.PrismaClient();
function ReplyThread(threadId, userId, dto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // validate
            const validate = reply_thread_schema_1.replyThreadSchemaJoi.validate(dto);
            console.log("hit");
            if (validate.error) {
                console.log("error");
                throw new String(validate.error.message);
            }
            cloudinary_1.v2.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            if (dto.image) {
                //   ini mksdnya di upload di folder b54circle yg ada di cloudinary
                const upload = yield cloudinary_1.v2.uploader.upload(dto.image, {
                    upload_preset: "b54circle",
                });
                dto.image = upload.secure_url; // secure_url untuk apa?
            }
            // cari thread yang mau di komen
            const thread = yield prisma.thread.findFirst({
                where: {
                    id: threadId,
                },
            });
            if (!thread)
                throw new Error("Thread not found!");
            // user yang mau komen
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user)
                throw new Error("Thread not found!");
            return yield prisma.reply.create({
                data: Object.assign(Object.assign({}, dto), { threadId,
                    userId }),
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.default = { ReplyThread };
//# sourceMappingURL=reply-service.js.map