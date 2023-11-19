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
exports.formatCollege = exports.formatOrderItems = exports.formatOrdersDto = exports.formatUserDto = void 0;
const prismaUtils_1 = require("./prismaUtils");
function formatUserDto(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const collegeName = yield (0, prismaUtils_1.getCollegeNameFromId)(user.collegeId);
        return {
            email: user.email,
            netid: user.netId,
            name: user.name,
            permissions: user.role,
            college: collegeName,
            id: user.id,
        };
    });
}
exports.formatUserDto = formatUserDto;
const formatOrdersDto = (orders, college) => __awaiter(void 0, void 0, void 0, function* () {
    const res = [];
    for (const item of orders) {
        const user = yield (0, prismaUtils_1.getUserFromId)(item.userId);
        const th = yield (0, prismaUtils_1.getOrderFromId)(item.id);
        const tis = yield (0, exports.formatOrderItems)(th);
        if (item) {
            const newItem = {
                id: item.id,
                college: college,
                inProgress: item.status,
                price: item.price,
                userId: user.id,
                paymentIntentId: item.paymentIntentId,
                creationTime: item.createdAt,
                transactionItems: tis,
            };
            res.push(newItem);
        }
    }
    return res;
});
exports.formatOrdersDto = formatOrdersDto;
const formatOrderItems = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItems = [];
    for (const item of order.orderItems) {
        const menuItem = yield (0, prismaUtils_1.getMenuItemFromId)(item.menuItemId);
        const user = yield (0, prismaUtils_1.getUserFromId)(order.userId);
        if (item) {
            const newItem = {
                itemCost: item.price,
                orderStatus: item.status,
                menuItemId: item.menuItemId,
                name: menuItem.name,
                id: item.id,
                user: user.name,
            };
            orderItems.push(newItem);
        }
    }
    return orderItems;
});
exports.formatOrderItems = formatOrderItems;
const formatCollege = (college) => {
    const res = {
        id: college.id,
        college: college.name,
        buttery_activated: college.isButteryIntegrated,
        daysOpen: college.daysOpen,
        openTime: college.openTime,
        closeTime: college.closeTime,
        isOpen: college.isOpen,
    };
    return res;
};
exports.formatCollege = formatCollege;
//# sourceMappingURL=dtoConverters.js.map