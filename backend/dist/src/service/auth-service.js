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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const auth_1 = require("../validators/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
function login(dto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // validasi (apakah yang dimasukkan sudah benar atau tidak sesuai validasi yg kita buat) menggunakan joi
            const validate = auth_1.loginSchema.validate(dto);
            if (validate.error) {
                throw new String(validate.error.message);
            }
            //  cek apakah ada usernya ada atau tidak
            const user = yield prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            });
            // jika user verifiednya false maka tidak bisa login
            if (!user.isVerified)
                throw new Error("User is not verified");
            if (!user)
                throw new String("User not found!");
            // compare password serta cek validnya
            const isValidPassword = yield bcrypt_1.default.compare(dto.password, user.password);
            if (!isValidPassword)
                throw new Error("User not found!");
            // ini agar ketika kita find user
            delete user.password;
            const jwtSecret = process.env.JWT_SECRET;
            // jangan masukkan data2 yg sensitif di jwt
            //    membuat token dari data user
            const token = jsonwebtoken_1.default.sign(user, jwtSecret);
            return { token, user };
        }
        catch (error) {
            throw new String(error);
        }
    });
}
function register(dto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1. validasi menggunakan joi, apakah sudah sesuai dengan DTO yg kita buat
            const validate = auth_1.registerSchema.validate(dto);
            // 2. setelah itu kita hashed
            const salt = 10;
            const hashedPassword = yield bcrypt_1.default.hash(dto.password, salt);
            dto.password = hashedPassword;
            if (validate.error) {
                throw new String("User not found!");
            }
            return yield prisma.user.create({
                data: Object.assign({}, dto),
            });
        }
        catch (error) {
            throw new String(error);
        }
    });
}
function createVerification(token, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.verification.create({
                data: {
                    token,
                    type,
                },
            });
        }
        catch (error) {
            throw new Error(error.message || "Failed to retrieve users");
        }
    });
}
function verify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verification = yield prisma.verification.findUnique({
                where: { token },
            });
            const userId = jsonwebtoken_1.default.verify(verification.token, process.env.JWT_SECRET);
            if (verification.type === "FORGOT_PASSWORD") {
                return;
            }
            return yield prisma.user.update({
                data: {
                    isVerified: true,
                },
                where: {
                    id: Number(userId),
                },
            });
        }
        catch (error) {
            throw new Error(error.message || "Failed to verify email");
        }
    });
}
exports.default = { login, register, verify, createVerification };
//# sourceMappingURL=auth-service.js.map