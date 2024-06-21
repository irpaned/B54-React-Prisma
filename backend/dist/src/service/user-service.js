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
//  masukkan ke parameter (query string step 2)
function find(search) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.user.findMany({
                //  masukkan bagian yg mau dijadikan untuk pencarian (query string step 3)
                where: {
                    userName: {
                        contains: search,
                        mode: "insensitive", // ini berfungsi agar ukuran font besar kecilnya ga ngaruh, jadi misalkan carinya pakai huruf besar semua, contoh : IRFAN, ini ga masalah
                    }
                },
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
            const user = yield prisma.user.findFirst({
                where: { id },
            });
            if (!user)
                throw new String("User not found!");
            ;
            return user;
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
            return yield prisma.user.update({
                where: { id: Number(id) },
                data: Object.assign({}, user)
            });
        }
        catch (error) {
            throw new String(error);
        }
    });
}
;
exports.default = { find, updateProfile, findOneProfile };
//# sourceMappingURL=user-service.js.map