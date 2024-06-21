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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const thread_schema_1 = require("../validators/thread-schema");
const cloudinary_1 = require("cloudinary");
const prisma = new client_1.PrismaClient();
function find() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.thread.findMany({
                // include untuk membuka relasi (menggunakan relasi user step 1)
                include: {
                    user: {
                        select: {
                            fullName: true,
                            photoProfile: true,
                            userName: true,
                        }
                    }
                }
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
            ;
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
            const thread = yield prisma.thread.findMany({
                where: { userId },
            });
            if (!thread)
                throw new String("Thread not found!");
            ;
            return thread;
        }
        catch (error) {
            throw new String(error);
        }
    });
}
// 👇 bikin parameter, kenapa userId bukan pakai user? karena ada hubungannya dengan data yg ada prisma (menggunakan relasi user step 2)
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
            //   ini mksdnya di upload di folder b54circle yg ada di cloudinary
            const upload = yield cloudinary_1.v2.uploader.upload(dto.image, {
                upload_preset: "b54circle",
            });
            //   ini memasukkan datanya ke prisma di table thread
            return yield prisma.thread.create({
                //              👇parameter passing disini (relasi step 3)
                data: Object.assign(Object.assign({}, dto), { userId, image: upload.secure_url }),
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
                data: Object.assign({}, thread)
            });
        }
        catch (error) {
            throw new String(error);
        }
    });
}
;
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
exports.default = { find, findOne, create, update, remove, findManyProfile };
//# sourceMappingURL=thread-service.js.map