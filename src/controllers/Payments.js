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
exports.createPaymentIntent = exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const prismaUtils_1 = require("../utils/prismaUtils");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const environment = process.env.NODE_ENV || 'development';
exports.stripe = new stripe_1.default(environment === 'development' ? process.env.STRIPE_SECRET_KEY_DEV : process.env.STRIPE_SECRET_KEY_PROD, {
    apiVersion: '2020-08-27',
});
function createPaymentIntent(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // basic parameter checking
            if (!req.body.price) {
                res.status(400).json({ message: 'Please enter a price' });
                return;
            }
            if (!req.body.userId) {
                res.status(400).json({ message: "You aren't logged in. No user found" });
                return;
            }
            // check if the customer exists in stripe, their account is created when they first login to CAS
            const customerQuery = yield exports.stripe.customers.search({
                query: "metadata['userId']:'" + req.body.userId + "'",
            });
            console.log(customerQuery);
            if (!((_a = customerQuery.data[0]) === null || _a === void 0 ? void 0 : _a.id)) {
                res.status(403).json({
                    message: "Invalid user: you might have created a user and then ordered too fast, please wait 10 seconds. If that doesn't work, try reloading the app",
                });
                return;
            }
            const customer = yield exports.stripe.customers.retrieve(customerQuery.data[0].id);
            const price = req.body.price;
            // verify that backend data matches frontend order:
            // verify all the prices match
            // verify all the items are enabled
            // console.log(req.body.items)
            const college = yield (0, prismaUtils_1.getCollegeFromName)(req.body.college);
            const backendItems = yield prismaClient_1.default.menuItem.findMany({
                where: {
                    collegeId: college.id,
                    isActive: true,
                },
            });
            let validOrder = true;
            req.body.items.forEach((item) => {
                const backendItem = backendItems.find((i) => i.id === item.orderItem.id);
                if (!backendItem || backendItem.price != item.orderItem.price) {
                    validOrder = false;
                }
            });
            if (!validOrder) {
                res.status(400).json({ message: 'Transaction failed' });
                return;
            }
            // card saving; will use later
            // const paymentMethods = await stripe.customers.listPaymentMethods(customer.id, { type: 'card' })
            // console.log(paymentMethods.data[0]?.id)
            // if (paymentMethods.data[0]?.id) {
            //   console.log('customer has PM')
            //   const paymentIntent = await stripe.paymentIntents.create({
            //     amount: price,
            //     currency: 'usd',
            //     customer: customer.id,
            //     payment_method: paymentMethods.data[0].id,
            //     off_session: true,
            //     confirm: true,
            //   })
            //   const clientSecret = paymentIntent.client_secret
            //   res.json({ message: 'Automatic payment initiated', clientSecret })
            // } else {
            // customer doesn't have a payment method
            const paymentIntent = yield exports.stripe.paymentIntents.create({
                amount: price,
                currency: 'USD',
                customer: customer.id,
                // setup_future_usage: 'off_session', for card saving
                payment_method_types: ['card'],
                capture_method: 'manual', // don't charge the user right now, but we'll need to save the paymentIntent's id to charge later.
            });
            res.json({ message: 'Payment initiated', paymentIntent });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    });
}
exports.createPaymentIntent = createPaymentIntent;
//# sourceMappingURL=Payments.js.map