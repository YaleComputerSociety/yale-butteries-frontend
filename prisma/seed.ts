import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.college.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      college: 'berkeley',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      college: 'branford',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      college: 'davenport',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 4,
    },
    update: {},
    create: {
      college: 'franklin',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 5,
    },
    update: {},
    create: {
      college: 'hopper',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 6,
    },
    update: {},
    create: {
      college: 'JE',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 7,
    },
    update: {},
    create: {
      college: 'morse',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 8,
    },
    update: {},
    create: {
      college: 'murray',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 9,
    },
    update: {},
    create: {
      college: 'pierson',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 10,
    },
    update: {},
    create: {
      college: 'saybrook',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 11,
    },
    update: {},
    create: {
      college: 'silliman',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 12,
    },
    update: {},
    create: {
      college: 'stiles',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 13,
    },
    update: {},
    create: {
      college: 'TD',
      buttery_activated: true,
    },
  })
  await prisma.college.upsert({
    where: {
      id: 14,
    },
    update: {},
    create: {
      college: 'trumbull',
      buttery_activated: true,
    },
  })

  await prisma.user.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      netid: 'awg32',
      email: 'addison.goolsbee@yale.edu',
      name: 'Addison',
      permissions: 'staff',
      token: 'abcd',
      college: {
        connect: { id: 1 },
      },
    },
  })
  await prisma.user.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      netid: 'app43',
      email: 'aidan.palmer@yale.edu',
      name: 'Aidan',
      token: 'abdc',
      permissions: 'customer',
      college: {
        connect: { id: 1 },
      },
    },
  })
  await prisma.user.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      netid: 'staff',
      email: 'addison.goolsbee@yale.edu',
      name: 'MorselChef',
      token: 'itswalrustime',
      permissions: 'staff',
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
      item: 'Oops! Something is wrong',
      price: 156,
      limited_time: false,
      is_active: true,
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
      item: 'Bony Bony Burger',
      price: 348,
      limited_time: false,
      is_active: true,
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
      item: 'Large Bean',
      price: 555,
      limited_time: false,
      is_active: true,
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
      item: 'Burton',
      price: 3,
      limited_time: false,
      is_active: true,
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
      item: 'The Yale Butteries App',
      price: 40000,
      limited_time: false,
      is_active: true,
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
      item: 'Chicken Nuggets',
      price: 150,
      limited_time: false,
      is_active: false,
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
      item: "Stephen Slade's Microwavable Lunch",
      price: 100,
      limited_time: false,
      is_active: true,
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
