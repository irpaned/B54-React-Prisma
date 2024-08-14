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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const thread_controller_1 = __importDefault(require("./controllers/thread-controller"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
const auth_controller_1 = __importDefault(require("./controllers/auth-controller"));
const dotenv_1 = __importDefault(require("dotenv"));
const upload_file_1 = require("./middlewares/upload-file");
const authenticate_1 = require("./middlewares/authenticate");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("../swagger/swagger-output.json"));
const nodemailer_1 = require("./libs/nodemailer");
// kita eksekusi default
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const routerv1 = express_1.default.Router();
const routerv2 = express_1.default.Router();
// initializeRedisClient().then(() => {
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//   standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//   // store: new RedisStore({
//   //   sendCommand: (...args: string[]) => redisClient.sendCommand(args),
//   }) // Redis, Memcached, etc. See below.
// app.use(limiter); // ini ditaruh global jadi semua routing akan ada limitnya
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", routerv1);
app.use("/api/v2", routerv2);
app.use("/uploads", express_1.default.static("uploads"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default, {
    // ini untuk menampilkan searching
    explorer: true,
    swaggerOptions: {
        // ini agar Authorization di swagger ga hilang ketika kita refresh
        persistAuthorization: true,
        displayRequestDuration: true,
    },
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
    // redisClient.set("HELLO_WORLD", "hello")
    // CONTOH PENGGUNAAN NODMAILER
    const info = yield nodemailer_1.transporter.sendMail({
        from: '"Circle" <muhammadirfan2823@gmail.com>',
        to: "muhammadirfann6644@gmail.com",
        subject: "Kamu berhasil masuk ke halaman yang tidak berguna!",
        text: "apa ini? asdadsadaldka dadqlidqi hq",
        html: "<b>Follow instagram @irpaned</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    res.send("Hello welcome to circle");
}));
// v1
routerv1.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to v1");
}));
// THREADS
routerv1.get("/threads", authenticate_1.authenticate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // SET REDIS (STEP 1)
    // ambil data threads dari cache redis
    // const result = await redisClient.get("THREADS_DATA");
    // kalau misalkan data threadsnya ada di cache redis, maka akan langsung di return, kalau gaada masuk ke next yg ada di bawah ini
    // if (result) return res.json(JSON.parse(result));
    // Apa fungsi next? apabila data threads nya tidak ada di cache dari redis, maka akan di lanjutkan ke ThreadController.find untuk ngambil data threadsnya
    next();
}), thread_controller_1.default.find);
routerv1.get("/threads/:id", authenticate_1.authenticate, thread_controller_1.default.findOne);
routerv1.get("/threads/profile/:id", authenticate_1.authenticate, thread_controller_1.default.findManyProfile);
routerv1.delete("/threads/:id", authenticate_1.authenticate, thread_controller_1.default.remove);
routerv1.post("/threads", authenticate_1.authenticate, upload_file_1.upload.single("image"), thread_controller_1.default.create);
routerv1.patch("/threads/:id", authenticate_1.authenticate, thread_controller_1.default.update);
routerv1.post("/threads/:id", authenticate_1.authenticate, upload_file_1.upload.single("image"), thread_controller_1.default.reply);
// LIKE
routerv1.post("/like/:id", authenticate_1.authenticate, thread_controller_1.default.like);
routerv1.delete("/unlike/:id", authenticate_1.authenticate, thread_controller_1.default.unlike);
// FOLLOW
routerv1.post("/follow/:id", authenticate_1.authenticate, user_controller_1.default.follow);
// AUTH
routerv1.post("/auth/login", auth_controller_1.default.login);
routerv1.post("/auth/check", authenticate_1.authenticate, auth_controller_1.default.check);
routerv1.post("/auth/register", auth_controller_1.default.register);
routerv1.post("/auth/reset-password", auth_controller_1.default.resetPassword);
routerv1.patch("/auth/resetpassword", auth_controller_1.default.ResetPassword);
routerv1.get("/auth/verify-email", auth_controller_1.default.verifyEmail);
routerv1.get("/auth/verify-email-reset-password", auth_controller_1.default.verifyEmailForForgotPassword);
// USER
routerv1.get("/user/:id", user_controller_1.default.findOneProfile);
routerv1.get("/users", authenticate_1.authenticate, user_controller_1.default.find);
routerv1.patch("/user/:id", upload_file_1.upload.single("photoProfile"), user_controller_1.default.updateProfile);
// v2
routerv2.get("/", (req, res) => {
    res.send("Welcome to v2");
});
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});
// })
// app.listen(port, () => {
//   console.log(`Server is running on PORT ${port}`);
// })
//# sourceMappingURL=index.js.map