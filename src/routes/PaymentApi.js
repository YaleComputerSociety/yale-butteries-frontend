"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Payments_1 = require("../controllers/Payments");
const router = express_1.default.Router();
router.post('/paymentIntent', Payments_1.createPaymentIntent);
exports.default = router;
//# sourceMappingURL=PaymentApi.js.map