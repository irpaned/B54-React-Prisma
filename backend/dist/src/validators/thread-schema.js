"use strict";
// berfungsi untuk menentukan type data apa yang harus di isi
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThreadSchemaJoi = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createThreadSchemaJoi = joi_1.default.object({
    content: joi_1.default.string().min(1).max(255).required(),
    image: joi_1.default.any(), // Cundus : allow(null, '') : agar image boleh kosong dgn berupa string kosong
});
//# sourceMappingURL=thread-schema.js.map