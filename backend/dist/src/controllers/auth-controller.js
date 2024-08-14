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
const auth_service_1 = __importDefault(require("../service/auth-service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = require("../libs/nodemailer");
const auth_service_2 = __importDefault(require("../service/auth-service"));
// import { transporter } from "../libs/nodemailer";
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /*  #swagger.requestBody = {
                  required: true,
                  content: {
                      "application/json": {
                          schema: {
                             $ref: "#/components/schemas/LoginDTO"
                          }
                      }
                  }
              }
          */
        try {
            const user = yield auth_service_1.default.login(req.body);
            res.json(user);
        }
        catch (error) {
            res.json({
                message: error,
            });
        }
    });
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // day 15
        /*  #swagger.requestBody = {
                  required: true,
                  content: {
                      "application/json": {
                          schema: {
                             $ref: "#/components/schemas/RegisterDTO"
                          }
                      }
                  }
              }
          */
        try {
            const user = yield auth_service_1.default.register(req.body);
            const token = jsonwebtoken_1.default.sign(user.id.toString(), process.env.JWT_SECRET); // : eyskjfnskjfnskf
            const fullUrl = req.protocol + "://" + req.get("host");
            const info = yield nodemailer_1.transporter.sendMail({
                from: '"Circle" <muhammadirfan2823@gmail.com>',
                to: user.email,
                subject: "Verification Link",
                html: `<a href="${fullUrl}/api/v1/auth/verify-email?token=${token}">Klik untuk verifikasi email!</a>`, // html body a
            });
            console.log("Message sent: %s", info.messageId);
            yield auth_service_1.default.createVerification(token, "EMAIL");
            res.status(201).json(user);
        }
        catch (error) {
            res.json({
                message: error,
            });
        }
    });
}
function verifyEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.query.token;
            yield auth_service_1.default.verify(token);
            const frontendUrl = process.env.FRONTEND_URL;
            res.redirect(`${frontendUrl}/auth/login`);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });
}
function check(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(res.locals.user);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });
}
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const getUser = yield auth_service_1.default.reset(req.body);
            const token = jsonwebtoken_1.default.sign(getUser.id.toString(), process.env.JWT_SECRET);
            const fullUrl = req.protocol + "://" + req.get("host");
            const info = yield nodemailer_1.transporter.sendMail({
                from: '"Circle" <muhammadirfan2823@gmail.com>',
                to: getUser.email,
                subject: "Verification Link",
                html: `<a href="${fullUrl}/api/v1/auth/verify-email-reset-password?token=${token}">Klik untuk verifikasi email!</a>`,
            });
            console.log("Message sent: %s", info.messageId);
            yield auth_service_1.default.createVerification(token, "FORGOT_PASSWORD");
            const user = yield auth_service_2.default.reset(body);
            res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function ResetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reset = yield auth_service_1.default.reset(req.body);
            res.status(200).json(reset);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function verifyEmailForForgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.query.token;
            yield auth_service_1.default.verifyEmailForForgotPassword(token);
            const frontendUrl = process.env.FRONTEND_URL;
            res.redirect(`${frontendUrl}/auth/reset-password`);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });
}
exports.default = {
    login,
    register,
    check,
    verifyEmail,
    resetPassword,
    ResetPassword,
    verifyEmailForForgotPassword,
};
//# sourceMappingURL=auth-controller.js.map