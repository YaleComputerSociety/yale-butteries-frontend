"use strict";
// This file contains general functions relating to the prisma database
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
exports.getOrderFromId = exports.getMenuItemFromId = exports.getUserFromId = exports.isOrderItemStatus = exports.isMenuItemType = exports.isUserRole = exports.getCollegeFromId = exports.getCollegeNameFromId = exports.getCollegeFromName = exports.findUserByNetId = void 0;
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../prismaClient"));
function findUserByNetId(netId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!netId) {
            throw new Error('missing netId');
        }
        return yield prismaClient_1.default.user.findFirst({
            where: { netId },
            include: { college: true },
        });
    });
}
exports.findUserByNetId = findUserByNetId;
const getCollegeFromName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    let college;
    if (name) {
        college = yield prismaClient_1.default.college.findFirst({
            where: {
                name: {
                    equals: name.toLowerCase(),
                    mode: 'insensitive',
                },
            },
        });
    }
    if (!college) {
        college = yield prismaClient_1.default.college.findFirst({
            where: {
                id: 1,
            },
        });
    }
    return college;
});
exports.getCollegeFromName = getCollegeFromName;
const getCollegeNameFromId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const college = yield prismaClient_1.default.college.findFirst({
        where: {
            id: id,
        },
    });
    return college ? college.name : null;
});
exports.getCollegeNameFromId = getCollegeNameFromId;
const getCollegeFromId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const college = yield prismaClient_1.default.college.findUnique({
        where: {
            id: id,
        },
    });
    return college;
});
exports.getCollegeFromId = getCollegeFromId;
function isUserRole(value) {
    return Object.values(client_1.UserRole).includes(value);
}
exports.isUserRole = isUserRole;
function isMenuItemType(value) {
    return Object.values(client_1.MenuItemType).includes(value);
}
exports.isMenuItemType = isMenuItemType;
function isOrderItemStatus(value) {
    return Object.values(client_1.OrderItemStatus).includes(value);
}
exports.isOrderItemStatus = isOrderItemStatus;
const getUserFromId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.default.user.findUnique({
        where: {
            id: id,
        },
    });
    return user;
});
exports.getUserFromId = getUserFromId;
const getMenuItemFromId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield prismaClient_1.default.menuItem.findUnique({
        where: {
            id: id,
        },
    });
    return item;
});
exports.getMenuItemFromId = getMenuItemFromId;
const getOrderFromId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prismaClient_1.default.order.findUnique({
        include: {
            orderItems: true,
        },
        where: {
            id: id,
        },
    });
    return res;
});
exports.getOrderFromId = getOrderFromId;
//# sourceMappingURL=prismaUtils.js.map