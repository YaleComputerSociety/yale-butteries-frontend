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
exports.updateCollege = exports.getCollege = exports.getAllColleges = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const dtoConverters_1 = require("@src/utils/dtoConverters");
function getAllColleges(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const colleges = yield prismaClient_1.default.college.findMany(includeProperty);
            const frontendColleges = colleges.map((college) => (0, dtoConverters_1.formatCollege)(college));
            res.json(frontendColleges);
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.getAllColleges = getAllColleges;
function getCollege(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const college = yield prismaClient_1.default.college.findUnique(Object.assign(Object.assign({}, includeProperty), { where: {
                    id: parseInt(req.params.collegeId),
                } }));
            res.json(college);
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.getCollege = getCollege;
function updateCollege(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const result = yield prismaClient_1.default.college.update({
                where: {
                    id: parseInt(req.params.collegeId),
                },
                data: {
                    daysOpen: req.body.daysOpen,
                    isOpen: req.body.isOpen,
                    openTime: req.body.openTime,
                    closeTime: req.body.closeTime,
                },
            });
            console.log(result);
            res.send(JSON.stringify(result));
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.updateCollege = updateCollege;
const includeProperty = {
    include: {
        menuItems: true,
    },
};
//# sourceMappingURL=Colleges.js.map