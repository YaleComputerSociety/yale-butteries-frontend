"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PushNotifications_1 = require("../controllers/PushNotifications");
const router = express_1.default.Router();
router.post('/', PushNotifications_1.subscribePushNotifications);
exports.default = router;
//# sourceMappingURL=PushNotificationsApi.js.map