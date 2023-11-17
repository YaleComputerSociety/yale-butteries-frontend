// This file contains general functions relating to the prisma database

import { User, College, UserRole, MenuItemType, MenuItem, Order, OrderItem, OrderItemStatus } from '@prisma/client'
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
        name: {
          equals: name.toLowerCase(),
          mode: 'insensitive',
        },
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

export const getCollegeFromId = async (id: number): Promise<College> => {
  const college = await prisma.college.findUnique({
    where: {
      id: id,
    },
  })
  return college
}

export function isUserRole(value: string): value is UserRole {
  return Object.values(UserRole).includes(value as UserRole)
}

export function isMenuItemType(value: string): value is MenuItemType {
  return Object.values(MenuItemType).includes(value as MenuItemType)
}

export function isOrderItemStatus(value: string): value is OrderItemStatus {
  return Object.values(OrderItemStatus).includes(value as OrderItemStatus)
}

export const getUserFromId = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  return user
}

export const getMenuItemFromId = async (id: number): Promise<MenuItem> => {
  const item = await prisma.menuItem.findUnique({
    where: {
      id: id,
    },
  })
  return item
}

export const getOrderFromId = async (id: number): Promise<Order & { orderItems: OrderItem[] }> => {
  const res = await prisma.order.findUnique({
    include: {
      orderItems: true,
    },
    where: {
      id: id,
    },
  })
  return res
}
