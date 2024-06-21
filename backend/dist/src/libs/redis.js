"use strict";
// ini adalah client
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
exports.initializeRedisClient = exports.redisClient = void 0;
const redis_1 = require("redis");
function initializeRedisClient() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.redisClient = yield (0, redis_1.createClient)({
            // url: `${process.env.REDIS_URL}`,
            url: `redis://${process.env.REDIS_URL}`,
        })
            .on("error", (err) => {
            throw new Error("Redis client error!");
        })
            .connect();
        console.log("Redis connected!");
    });
}
exports.initializeRedisClient = initializeRedisClient;
//# sourceMappingURL=redis.js.map