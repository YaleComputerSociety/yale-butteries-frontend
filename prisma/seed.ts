import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.college.upsert({
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
  })
  await prisma.user.upsert({
    where: {
      id: '3',
    },
    update: {},
    create: {
      netId: 'awg32',
      name: 'Trumbullman',
      token: 'jugglemaster',
      role: 'STAFF',
      college: {
        connect: { id: 7 },
      },
    },
  })
  await prisma.menuItem.upsert({
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
  })
  await prisma.menuItem.upsert({
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
  })
  await prisma.menuItem.upsert({
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
  })
  await prisma.menuItem.upsert({
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
  })
  await prisma.menuItem.upsert({
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
  })
  await prisma.menuItem.upsert({
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
  })
  await prisma.menuItem.upsert({
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
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
