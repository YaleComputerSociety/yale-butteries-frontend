// This file contains general functions relating to the prisma database

import { User, College, UserRole, MenuItemType } from '@prisma/client'
import prisma from '../prismaClient'

export async function findUserByNetId(netId: string): Promise<(User & { college: College }) | null> {
  if (!netId) {
    throw new Error('missing netId')
  }

  return await prisma.user.findFirst({
    where: { netId },
    include: { college: true },
  })
}

export const getCollegeFromName = async (name: string): Promise<College> => {
  let college: College
  if (name) {
    college = await prisma.college.findFirst({
      where: {
        name: name,
      },
    })
  }

  if (!college) {
    college = await prisma.college.findFirst({
      where: {
        id: 1,
      },
    })
  }

  return college
}

export const getCollegeNameFromId = async (id: number): Promise<string | null> => {
  const college = await prisma.college.findFirst({
    where: {
      id: id,
    },
  })
  return college ? college.name : null
}

export function isUserRole(value: string): value is UserRole {
  return Object.values(UserRole).includes(value as UserRole)
}

export function isMenuItemType(value: string): value is MenuItemType {
  return Object.values(MenuItemType).includes(value as MenuItemType)
}
