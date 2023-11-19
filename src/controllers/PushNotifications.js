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
exports.subscribePushNotifications = void 0;
const expo_server_sdk_1 = require("expo-server-sdk");
const Orders_1 = require("./Orders");
const prismaClient_1 = __importDefault(require("../prismaClient"));
var Status;
(function (Status) {
    Status[Status["Incomplete"] = 0] = "Incomplete";
    Status[Status["Complete"] = 1] = "Complete";
    Status[Status["Cancelled"] = 2] = "Cancelled";
    Status[Status["TimedOut"] = 3] = "TimedOut";
})(Status || (Status = {}));
// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
const environment = process.env.NODE_ENV || 'development';
// export const stripe = new Stripe(
//   environment === 'development' ? process.env.STRIPE_SECRET_KEY_DEV : process.env.STRIPE_SECRET_KEY_PROD,
//   {
//     apiVersion: '2020-08-27',
//   }
// )
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
// const getPaymentIntentIdFromId = async (id: number): Promise<string> => {
//   const res = await prisma.order.findUnique({
//     where: {
//       id: id,
//     },
//   })
//   return res.paymentIntentId
// }
const checkItems = (items, order) => {
    const orderLifetime = Math.abs(new Date().getTime() - order.createdAt.getTime()) / 36e5;
    if (items.every((i) => i.status === 'CANCELLED')) {
        console.log('Order cancelled :(');
        return Status.Cancelled;
    }
    else if (orderLifetime > 6) {
        console.log('Order timed out');
        return Status.TimedOut;
    }
    else if (items.every((i) => i.status === 'CANCELLED' || i.status === 'READY')) {
        console.log('order complete');
        return Status.Complete;
    }
    else {
        return Status.Incomplete;
    }
};
function getItems(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield getOrderFromId(parseInt(id))).orderItems;
    });
}
const sendNotification = (expoPushToken, data) => __awaiter(void 0, void 0, void 0, function* () {
    const expo = new expo_server_sdk_1.Expo({ accessToken: process.env.ACCESS_TOKEN });
    const chunks = expo.chunkPushNotifications([Object.assign({ to: expoPushToken }, data)]);
    const tickets = [];
    for (const chunk of chunks) {
        try {
            const ticketChunk = yield expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        }
        catch (error) {
            console.error(error);
        }
    }
    let response = '';
    for (const ticket of tickets) {
        if (ticket.status === 'error') {
            if (ticket.details && ticket.details.error === 'DeviceNotRegistered') {
                response = 'DeviceNotRegistered';
            }
        }
        if (ticket.status === 'ok') {
            response = ticket.id;
        }
    }
    return response;
});
function subscribePushNotifications(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.body.pushToken;
            const messageComplete = {
                to: token,
                sound: 'default',
                body: 'Your order is ready for pick up!  ' + String.fromCodePoint(0x1f601),
                data: { withSome: 'data' },
            };
            const messageCancelled = {
                to: token,
                sound: 'default',
                body: 'Your order was cancelled',
                data: { withSome: 'data' },
            };
            const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const items = yield getItems(req.body.transactionId);
                const orderStatus = checkItems(items, yield getOrderFromId(req.body.transactionId));
                if (orderStatus === Status.Complete) {
                    let price = 0;
                    items.forEach((i) => {
                        if (i.status === 'READY') {
                            price += i.price;
                        }
                    });
                    clearInterval(interval);
                    if (token) {
                        sendNotification(token, messageComplete);
                    }
                    (0, Orders_1.updateOrderInner)({
                        body: {
                            id: req.body.transactionId,
                            order_complete: new Date(),
                            status: 'READY',
                            charged_price: price,
                        },
                    });
                    // const pii = await getPaymentIntentIdFromId(req.body.transactionId)
                    // await stripe.paymentIntents.capture(pii, {
                    //   amount_to_capture: price,
                    // })
                }
                else if (orderStatus === Status.Cancelled || orderStatus === Status.TimedOut) {
                    clearInterval(interval);
                    if (orderStatus === Status.Cancelled && token) {
                        sendNotification(token, messageCancelled);
                    }
                    (0, Orders_1.updateOrderInner)({
                        body: {
                            id: req.body.transactionId,
                            order_complete: new Date(),
                            status: 'CANCELLED',
                            charged_price: 0,
                        },
                    });
                    // stripe.paymentIntents.cancel(await getPaymentIntentIdFromId(req.body.transactionId))
                }
            }), 5000);
            res.send(JSON.stringify('exited order function'));
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
}
exports.subscribePushNotifications = subscribePushNotifications;
//# sourceMappingURL=PushNotifications.js.map