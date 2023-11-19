"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = require("../controllers/Users");
const router = express_1.default.Router();
router.get('/', Users_1.getAllUsers);
router.get('/:userId', Users_1.getUser);
router.post('/', Users_1.createUser);
router.put('/:userId', Users_1.updateUser);
router.post('/staffLogin', Users_1.verifyStaffLogin);
exports.default = router;
//# sourceMappingURL=UserApi.js.map