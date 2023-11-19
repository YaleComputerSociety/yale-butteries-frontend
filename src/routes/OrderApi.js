"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Orders_1 = require("../controllers/Orders");
const router = express_1.default.Router();
router.get('/:orderId', Orders_1.getOrder);
router.get('/college/:collegeName', Orders_1.getAllOrdersFromCollege);
router.get('/college/recent/:collegeName', Orders_1.getRecentOrdersFromCollege);
router.post('/', Orders_1.createOrder);
router.put('/:orderId', Orders_1.updateOrder); // unused
router.put('/item/:orderItemId', Orders_1.updateOrderItem);
exports.default = router;
//# sourceMappingURL=OrderApi.js.map