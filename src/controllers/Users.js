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
exports.verifyStaffLogin = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const prismaUtils_1 = require("../utils/prismaUtils");
const dtoConverters_1 = require("../utils/dtoConverters");
function getAllUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prismaClient_1.default.user.findMany(includeProperty);
            res.send(JSON.stringify({ users }));
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prismaClient_1.default.user.findUnique({
                include: {
                    college: true,
                    orders: true,
                },
                where: {
                    id: req.params.userId,
                },
            });
            let recentOrder = null;
            let currentOrder = null;
            if (user.orders.length > 0) {
                recentOrder = user.orders[user.orders.length - 1];
                const modifiedRecentOrder = (yield (0, dtoConverters_1.formatOrdersDto)([recentOrder], user.college.name))[0];
                if (recentOrder) {
                    const lifetime = Math.abs(new Date().getTime() - recentOrder.order_placed.getTime()) / 36e5;
                    currentOrder = lifetime < 6 ? modifiedRecentOrder : null;
                }
            }
            const frontUser = {
                college: user.college.name,
                id: user.id,
                permissions: user.role,
                token: user.token,
                name: user.name,
                email: user.email,
                currentOrder: currentOrder,
            };
            res.send(JSON.stringify(frontUser));
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.getUser = getUser;
function createUserRecord(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const collegeData = yield (0, prismaUtils_1.getCollegeFromName)(data.name);
        const userData = {
            netId: data.netid,
            name: data.name ? data.name : data.netid,
            college: {
                connect: {
                    id: collegeData.id,
                },
            },
        };
        if (data.permissions && (0, prismaUtils_1.isUserRole)(data.permissions))
            userData.role = data.permissions;
        if (data.email)
            userData.email = data.email;
        if (data.token)
            userData.token = data.token;
        return yield prismaClient_1.default.user.create({ data: userData });
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { netid } = req.body;
            if (!netid) {
                res.status(400).send('Required fields are missing');
                return;
            }
            // In case the user already exists
            const existingUser = yield (0, prismaUtils_1.findUserByNetId)(netid);
            if (existingUser) {
                res.send(JSON.stringify(yield (0, dtoConverters_1.formatUserDto)(existingUser)));
                return;
            }
            const newUser = yield createUserRecord(req.body);
            // await stripe.customers.create({
            //   email: req.body.email,
            //   name: req.body.name,
            //   metadata: { userId: newUser.id },
            // })
            res.send(JSON.stringify(yield (0, dtoConverters_1.formatUserDto)(newUser)));
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.userId) {
                res.status(400).send('Required fields are missing');
                return;
            }
            const userData = {};
            if (req.body.name)
                userData.name = req.body.name;
            if (req.body.email)
                userData.email = req.body.email;
            const user = yield prismaClient_1.default.user.update({
                where: {
                    id: req.params.userId,
                },
                data: userData,
            });
            res.send(JSON.stringify(user));
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
}
exports.updateUser = updateUser;
const includeProperty = {
    include: {
        college: true,
    },
};
function verifyStaffLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // this needs to be fixed but we also wont use this in the future
            const user = yield prismaClient_1.default.user.findUnique({
                where: {
                    id: '89839659-e7b1-4e3d-ad6e-fd30fca49a75',
                },
            });
            let ret = false;
            if (user.name === req.body.username && user.token === req.body.password) {
                ret = true;
            }
            res.send(ret);
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
}
exports.verifyStaffLogin = verifyStaffLogin;
//# sourceMappingURL=Users.js.map