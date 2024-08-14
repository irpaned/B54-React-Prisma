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
const follow_service_1 = __importDefault(require("../service/follow-service"));
function find(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userLogged = res.locals.user;
        try {
            const user = res.locals.user;
            const search = req.query.search; //  bikin const ( query string step 1)
            const users = yield user_service_1.default.find(search, user.id);
            const newUser = users.map((user) => {
                const followers = user.followers;
                const followeds = user.followeds;
                return Object.assign(Object.assign({}, user), { isFollowed: followeds.some((followed) => followed.followerId == userLogged.id), isFollower: followers.some((follower) => follower.followerId == userLogged.id) });
            });
            console.log(newUser);
            return res.json(newUser);
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
            const body = Object.assign(Object.assign({}, req.body), { photoProfile: req.file ? req.file.path : "" });
            // pengecekan
            const user = yield user_service_1.default.findOneProfile(Number(id));
            if (!user)
                res.status(404).json({
                    message: "Thread not found!",
                });
            // cundus
            const editedProfile = yield user_service_1.default.updateProfile(Number(id), body);
            res.json(editedProfile);
        }
        catch (error) {
            res.status(500).json({
                message: error,
            });
        }
    });
}
function follow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = res.locals.user;
            const follow = yield follow_service_1.default.follow(parseInt(id), user.id);
            return res.status(200).json(follow);
        }
        catch (error) {
            res.status(500).json({
                message: error,
            });
        }
    });
}
// async function unfollow(req: Request, res: Response) {
//   try {
//     const user = res.locals.user;
//     const { id } = req.params;
//     const unfollow = await FollowService.follow(parseInt(id), user.id);
//     res.status(200).json(unfollow);
//   } catch (error) {
//     res.status(500).json({
//       messahe: error,
//     });
//   }
// }
exports.default = { find, updateProfile, findOneProfile, follow };
//# sourceMappingURL=user-controller.js.map