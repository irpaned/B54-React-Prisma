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
const user_service_1 = __importDefault(require("../service/user-service"));
function find(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const search = req.query.search; //  bikin const ( query string step 1)
            const users = yield user_service_1.default.find(search);
            return res.json(users);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });
}
function findOneProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield user_service_1.default.findOneProfile(Number(id));
            if (!user) {
                return res.status(404).json({ message: "User not found ya" });
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            // pengecekan
            const user = yield user_service_1.default.findOneProfile(Number(id));
            if (!user)
                res.status(404).json({
                    message: "Thread not found!"
                });
            const editedProfile = yield user_service_1.default.updateProfile(Number(id), req.body);
            res.json(editedProfile);
        }
        catch (error) {
            res.status(500).json({
                message: error
            });
        }
    });
}
exports.default = { find, updateProfile, findOneProfile };
//# sourceMappingURL=user-controller.js.map