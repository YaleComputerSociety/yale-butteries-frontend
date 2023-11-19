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
exports.updateMenuItem = exports.createMenuItem = exports.getMenuItem = exports.getAllMenuItems = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const prismaUtils_1 = require("../utils/prismaUtils");
function getAllMenuItems(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItems = yield prismaClient_1.default.menuItem.findMany({
                include: {
                    college: true,
                },
            });
            const collegeIds = [...new Set(menuItems.map((item) => item.collegeId))];
            const colleges = yield prismaClient_1.default.college.findMany({
                where: {
                    id: {
                        in: collegeIds,
                    },
                },
            });
            const collegeMap = colleges.reduce((map, college) => {
                map[college.id] = college.name;
                return map;
            }, {});
            const frontMenuItems = menuItems.map((item) => ({
                id: item.id,
                item: item.name,
                price: item.price,
                college: collegeMap[item.collegeId],
                isActive: item.isActive,
                description: item.description,
                foodType: item.type,
            }));
            res.send(frontMenuItems);
        }
        catch (e) {
            res.status(400).send(e.message);
        }
    });
}
exports.getAllMenuItems = getAllMenuItems;
function getMenuItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItem = yield prismaClient_1.default.menuItem.findUnique({
                where: {
                    id: parseInt(req.params.menuItemId),
                },
                include: {
                    college: true,
                },
            });
            res.send(JSON.stringify(menuItem));
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
}
exports.getMenuItem = getMenuItem;
function createMenuItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.item || !req.body.price || !req.body.college) {
                res.status(400).send('Required fields are missing');
                return;
            }
            const collegeData = yield (0, prismaUtils_1.getCollegeFromName)(req.body.college);
            const menuItemData = {
                name: req.body.item,
                price: parseInt(req.body.price),
                college: {
                    connect: {
                        id: collegeData.id,
                    },
                },
            };
            if (req.body.foodType && (0, prismaUtils_1.isMenuItemType)(req.body.foodType))
                menuItemData.type = req.body.foodType;
            if (req.body.isActive)
                menuItemData.isActive = req.body.email;
            menuItemData.description = req.body.description ? req.body.description : 'No description provided';
            const newMenuItem = yield prismaClient_1.default.menuItem.create({ data: menuItemData });
            res.send(JSON.stringify(newMenuItem.id));
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.createMenuItem = createMenuItem;
function updateMenuItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (Number.isInteger(req.params.menuItemId)) {
                res.status(400).send('Invalid menu item ID');
                return;
            }
            const menuItem = yield prismaClient_1.default.menuItem.findUnique({
                where: {
                    id: parseInt(req.params.menuItemId),
                },
            });
            if (!menuItem) {
                res.status(400).send('No menu item found at specified ID');
                return;
            }
            const menuItemInput = Object.assign({}, req.body);
            const menuItemData = {};
            if (menuItemInput.item)
                menuItemData.name = menuItemInput.item;
            if (menuItemInput.price && Number.isInteger(menuItemInput.price))
                menuItemData.price = menuItemInput.price;
            if (menuItemInput.isActive != null)
                menuItemData.isActive = menuItemInput.isActive !== false;
            if (menuItemInput.description)
                menuItemData.description = menuItemInput.description;
            if (menuItemInput.foodType && (0, prismaUtils_1.isMenuItemType)(menuItemInput.foodType))
                menuItemData.type = menuItemInput.foodType;
            const newMenuItem = yield prismaClient_1.default.menuItem.update({
                where: {
                    id: parseInt(req.params.menuItemId),
                },
                data: menuItemData,
            });
            res.send(JSON.stringify(newMenuItem));
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });
}
exports.updateMenuItem = updateMenuItem;
//# sourceMappingURL=MenuItems.js.map