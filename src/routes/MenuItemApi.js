"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MenuItems_1 = require("../controllers/MenuItems");
const router = express_1.default.Router();
router.get('/', MenuItems_1.getAllMenuItems);
router.get('/:menuItemId', MenuItems_1.getMenuItem);
router.put('/:menuItemId', MenuItems_1.updateMenuItem);
router.post('/', MenuItems_1.createMenuItem);
exports.default = router;
//# sourceMappingURL=MenuItemApi.js.map