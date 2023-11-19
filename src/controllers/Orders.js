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
exports.updateOrderItem = exports.updateOrder = exports.updateOrderInner = exports.createOrder = exports.getRecentOrdersFromCollege = exports.getAllOrdersFromCollege = exports.getOrder = void 0;
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const prismaUtils_1 = require("../utils/prismaUtils");
const dtoConverters_1 = require("../utils/dtoConverters");
function getOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield (0, prismaUtils_1.getOrderFromId)(parseInt(req.params.orderId));
            if (!order) {
                res.status(400).send('Order not found');
                return;
            }
            const college = yield (0, prismaUtils_1.getCollegeFromId)(order.collegeId);
            const user = yield (0, prismaUtils_1.getUserFromId)(order.userId);
            const orderItems = yield (0, dtoConverters_1.formatOrderItems)(order);
            const ret = {
                id: order.id,
                college: college.name,
                inProgress: order.status,
                price: order.price,
                userId: user.id,
                transactionItems: orderItems,
            };
            res.send(JSON.stringify(ret));
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    });
}
exports.getOrder = getOrder;
// returns all of the orders along with their items
// used for the staff payments screen
// will probably not be able to do this once there are enough orders...
function getAllOrdersFromCollege(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const college = yield (0, prismaUtils_1.getCollegeFromName)(req.params.collegeName);
            const validOrders = yield prismaClient_1.default.order.findMany({
                where: {
                    collegeId: college.id,
                },
                include: {
                    orderItems: true,
                },
                orderBy: {
                    id: 'asc',
                },
            });
            const frontValidOrders = yield (0, dtoConverters_1.formatOrdersDto)(validOrders, college.name);
            const ret = {
                transactionHistories: frontValidOrders,
            };
            res.send(JSON.stringify(ret));
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.getAllOrdersFromCollege = getAllOrdersFromCollege;
// returns all orders of a specific college within the last 6 hours
function getRecentOrdersFromCollege(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const college = yield (0, prismaUtils_1.getCollegeFromName)(req.params.collegeName);
            const date = new Date(Date.now() - 36e5 * 6); // select only transactions from after 6 hours before this moment
            const validOrders = yield prismaClient_1.default.order.findMany({
                where: {
                    collegeId: college.id,
                    createdAt: {
                        gte: date,
                    },
                },
                orderBy: {
                    id: 'asc',
                },
                include: {
                    orderItems: true,
                },
            });
            const frontValidOrders = yield (0, dtoConverters_1.formatOrdersDto)(validOrders, college.name);
            const ret = {
                transactionHistories: frontValidOrders,
            };
            res.send(JSON.stringify(ret));
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.getRecentOrdersFromCollege = getRecentOrdersFromCollege;
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const in_progress = req.body.inProgress
            const total_price = parseInt(req.body.price);
            const college = yield (0, prismaUtils_1.getCollegeFromName)(req.body.college);
            if (!college)
                throw "Sorry, that college doesn't work";
            const college_id = college.id;
            const inputOrderItems = req.body.transactionItems;
            const orderItems = [];
            for (const item of inputOrderItems) {
                if (item) {
                    const newItem = {
                        price: item.itemCost,
                        status: client_1.OrderItemStatus.QUEUED,
                        menuItemId: item.menuItemId,
                    };
                    orderItems.push(newItem);
                }
            }
            // store the transaction in the database
            const newOrder = yield prismaClient_1.default.order.create({
                data: {
                    status: 'QUEUED',
                    price: total_price,
                    college: {
                        connect: {
                            id: college_id,
                        },
                    },
                    user: {
                        connect: {
                            id: req.body.userId,
                        },
                    },
                    orderItems: {
                        createMany: {
                            data: orderItems,
                        },
                    },
                },
            });
            const sendOrder = {
                id: newOrder.id,
                college: req.body.college,
                inProgress: req.body.inProgress,
                price: req.body.price,
                userId: req.body.userId,
                transactionItems: orderItems,
            };
            res.send(JSON.stringify(sendOrder));
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.createOrder = createOrder;
function updateOrderInner(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield prismaClient_1.default.order.update({
                where: {
                    id: req.body.id,
                },
                data: {
                    status: req.body.status || undefined,
                    price: req.body.total_price || undefined,
                    stripeFee: req.body.stripe_fee || undefined,
                },
            });
            return order;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.updateOrderInner = updateOrderInner;
function updateOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield prismaClient_1.default.order.update({
                where: {
                    id: req.body.id,
                },
                data: {
                    status: req.body.in_progress || undefined,
                    price: req.body.total_price || undefined,
                    stripeFee: req.body.stripe_fee || undefined,
                },
            });
            res.send(JSON.stringify(order));
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
}
exports.updateOrder = updateOrder;
function updateOrderItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(0, prismaUtils_1.isOrderItemStatus)(req.body.orderStatus)) {
                res.status(400).send('malformed status');
                return;
            }
            const orderItem = yield prismaClient_1.default.orderItem.update({
                where: {
                    id: parseInt(req.params.orderItemId),
                },
                data: {
                    status: req.body.orderStatus,
                },
            });
            res.send(JSON.stringify(orderItem));
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.updateOrderItem = updateOrderItem;
//# sourceMappingURL=Orders.js.map