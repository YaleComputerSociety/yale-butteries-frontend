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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.college.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            name: 'Berkeley',
            butteryName: "Marvin's",
            isButteryIntegrated: true,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Monday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 2,
        },
        update: {},
        create: {
            name: 'Branford',
            butteryName: 'Nuttery',
            isButteryIntegrated: true,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Tuesday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 3,
        },
        update: {},
        create: {
            name: 'Davenport',
            butteryName: 'The Dive',
            isButteryIntegrated: false,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Wednesday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 4,
        },
        update: {},
        create: {
            name: 'Franklin',
            butteryName: "Ben's Butt",
            isButteryIntegrated: false,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Thursday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 5,
        },
        update: {},
        create: {
            name: 'Hopper',
            butteryName: 'Trolley Stop',
            isButteryIntegrated: false,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Friday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 6,
        },
        update: {},
        create: {
            name: 'JE',
            butteryName: 'JE Butt',
            isButteryIntegrated: false,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Monday', 'Tuesday', 'Wednesday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 7,
        },
        update: {},
        create: {
            name: 'Morse',
            butteryName: 'The Morsel',
            isButteryIntegrated: true,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Monday', 'Tuesday', 'Wednesday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 8,
        },
        update: {},
        create: {
            name: 'Murray',
            butteryName: 'MY Butt',
            isButteryIntegrated: false,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Monday', 'Tuesday', 'Wednesday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 9,
        },
        update: {},
        create: {
            name: 'Pierson',
            butteryName: 'Knight Club',
            isButteryIntegrated: false,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Monday', 'Wednesday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 10,
        },
        update: {},
        create: {
            name: 'Saybrook',
            butteryName: 'Squiche',
            isButteryIntegrated: false,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Monday', 'Tuesday', 'Wednesday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 11,
        },
        update: {},
        create: {
            name: 'Silliman',
            butteryName: 'SilliCafe',
            isButteryIntegrated: false,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Monday', 'Tuesday', 'Wednesday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 12,
        },
        update: {},
        create: {
            name: 'Stiles',
            butteryName: 'Moose Butt',
            isButteryIntegrated: false,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Saturday', 'Tuesday', 'Thursday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 13,
        },
        update: {},
        create: {
            name: 'TD',
            butteryName: 'TD Butt',
            isButteryIntegrated: false,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Monday', 'Tuesday', 'Wednesday'],
        },
    });
    yield prisma.college.upsert({
        where: {
            id: 14,
        },
        update: {},
        create: {
            name: 'Trumbull',
            butteryName: 'Trumbutt',
            isButteryIntegrated: true,
            closeTime: '23:00',
            openTime: '21:00',
            daysOpen: ['Wednesday'],
        },
    });
    yield prisma.user.upsert({
        where: {
            id: '3',
        },
        update: {},
        create: {
            netId: 'guest',
            name: 'appletester',
            token: 'jugglemaster',
            role: 'STAFF',
            college: {
                connect: { id: 14 },
            },
        },
    });
    yield prisma.menuItem.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            name: 'Oops! Something is wrong',
            price: 156,
            college: {
                connect: { id: 7 },
            },
            description: 'help',
        },
    });
    yield prisma.menuItem.upsert({
        where: {
            id: 2,
        },
        update: {},
        create: {
            name: 'Bony Bony Burger',
            price: 348,
            college: {
                connect: { id: 1 },
            },
        },
    });
    yield prisma.menuItem.upsert({
        where: {
            id: 3,
        },
        update: {},
        create: {
            name: 'Large Bean',
            price: 555,
            college: {
                connect: { id: 1 },
            },
        },
    });
    yield prisma.menuItem.upsert({
        where: {
            id: 4,
        },
        update: {},
        create: {
            name: 'Burton',
            price: 3,
            college: {
                connect: { id: 1 },
            },
        },
    });
    yield prisma.menuItem.upsert({
        where: {
            id: 5,
        },
        update: {},
        create: {
            name: 'The Yale Butteries App',
            price: 400000,
            college: {
                connect: { id: 1 },
            },
        },
    });
    yield prisma.menuItem.upsert({
        where: {
            id: 6,
        },
        update: {},
        create: {
            name: 'Chicken Nuggets',
            price: 150,
            college: {
                connect: { id: 1 },
            },
        },
    });
    yield prisma.menuItem.upsert({
        where: {
            id: 7,
        },
        update: {},
        create: {
            name: "Stephen Slade's Microwavable Lunch",
            price: 100,
            college: {
                connect: { id: 1 },
            },
        },
    });
});
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=seed.js.map