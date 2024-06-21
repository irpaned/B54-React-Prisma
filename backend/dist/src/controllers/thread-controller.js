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
const thread_service_1 = __importDefault(require("../service/thread-service"));
function find(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const threads = yield thread_service_1.default.find();
            // SET REDIS (STEP 2)
            // ini untuk memasukkan data threads ke redis
            // await redisClient.set("THREADS_DATA", JSON.stringify(threads));
            return res.json(threads);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
function findOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const threads = yield thread_service_1.default.findOne(Number(id));
            if (!threads) {
                return res.status(404).json({ message: "Thread not found" });
            }
            res.json(threads);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
function findManyProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const threads = yield thread_service_1.default.findManyProfile(Number(id));
            if (!threads) {
                return res.status(404).json({ message: "Thread not found" });
            }
            res.json(threads);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // "multipart/form-data" : ini agar file gambar bisa menjadi file upload
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                        $ref: "#/components/schemas/CreateThreadDTO"
                        }
                    }
                }
            }
        */
        try {
            //              👇 ambil data dari authenticate ( menggunakan relasi user step 4)
            const user = res.locals.user;
            const body = Object.assign(Object.assign({}, req.body), { image: req.file ? req.file.path : "" });
            // ini berfungsi untuk menghapus keys THREADS_DATA setiap ada yang post, bertujuan agar cache redis lebih update dengan data yg baru di post
            // await redisClient.del("THREADS_DATA");
            //                                                      👇passing datanya disini(menggunakan relasi user step 5)         
            const createdThread = yield thread_service_1.default.create(body, user.id);
            res.status(201).json(createdThread);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            // pengecekan
            const thread = yield thread_service_1.default.findOne(Number(id));
            if (!thread)
                res.status(404).json({
                    message: "Thread not found!"
                });
            // pengecekan
            const updatedThread = yield thread_service_1.default.update(Number(id), req.body);
            res.json(updatedThread);
        }
        catch (error) {
            res.status(500).json({
                message: error
            });
        }
    });
}
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            // pengecekan
            const thread = yield thread_service_1.default.findOne(Number(id));
            if (!thread)
                res.status(404).json({
                    message: "Thread not found!"
                });
            // pengecekan
            const DeleteThreads = yield thread_service_1.default.remove(Number(id));
            res.json(DeleteThreads);
        }
        catch (error) {
            res.status(500).json({
                message: error
            });
        }
    });
}
// di export untuk di panggil di index.ts (routing)
exports.default = { find, findOne, create, update, remove, findManyProfile };
//# sourceMappingURL=thread-controller.js.map