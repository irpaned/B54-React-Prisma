"use strict";
// // Halaman ini berfungsi seperti membuat batas bagi orang yang tidak login, jadi mereka tidak bisa melihat thread, membuat post, update dan delete post
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    /*
    #swagger.security = [{
              "bearerAuth": []
      }]
    */
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        return res.status(401).json({
            error: "Unauthorized!",
        });
    }
    const token = authorizationHeader.split(" ")[1];
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            error: "Unauthorized!",
        });
    }
}
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map