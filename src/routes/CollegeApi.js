"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Colleges_1 = require("../controllers/Colleges");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = express_1.default.Router();
router.get('/', Colleges_1.getAllColleges);
router.get('/:collegeId', (0, asyncHandler_1.default)(Colleges_1.getCollege));
router.put('/:collegeId', Colleges_1.updateCollege);
exports.default = router;
//# sourceMappingURL=CollegeApi.js.map