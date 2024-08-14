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
exports.redisCheck = exports.redisMiddleware = void 0;
const redis_1 = require("../libs/redis");
function redisMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return function (redisKey) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield redis_1.redisClient.get(redisKey);
                if (result)
                    return res.json(JSON.parse(result));
                next();
            });
        };
    });
}
exports.redisMiddleware = redisMiddleware;
exports.redisCheck = redisMiddleware;
//# sourceMappingURL=redis.js.map