"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    userName: joi_1.default.string().regex(/^\S+$/).required(),
    fullName: joi_1.default.string().required().min(3).max(20),
});
// export const resetSchema = joi.object<ResetDTO>({
//   email: joi.string().email().required(),
//   password: joi.string().required(),
// });
//# sourceMappingURL=auth.js.map