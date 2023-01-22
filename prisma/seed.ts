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

  await prisma.position.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      position: 'manager',
    },
  })
  await prisma.position.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      position: 'customer',
    },
  })
  await prisma.user.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      netid: 'testmctester1',
      email: 'testmctester1@yale.edu',
      credit_card_hash: 'yalecampushub',
      name: 'Testing McTester',
      position: {
        connect: { id: 1 },
      },
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
      netid: 'testmctester12',
      email: 'testmctester12@yale.edu',
      credit_card_hash: 'yalecampushub',
      name: 'Testing McTester II',
      position: {
        connect: { id: 2 },
      },
      college: {
        connect: { id: 1 },
      },
    },
  })
  await prisma.menuItem.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      item: 'Americano',
      price: 1.5,
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
