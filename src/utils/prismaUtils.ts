// This file contains general functions relating to the database

import type { User, College, MenuItem, Order, OrderItem } from '@prisma/client'
import { UserRole, MenuItemType, OrderItemStatus } from '@prisma/client'
import prisma from '@src/prismaClient'
import HTTPError from '@src/utils/httpError'

export async function findUserByNetId (netId: string): Promise<(User & { college: College }) | null> {
  return await prisma.user.findFirst({
    where: { netId },
    include: { college: true }
  })
}

export const getCollegeFromName = async (name: string): Promise<College> => {
  const college = await prisma.college.findFirst({
    where: {
      name: {
        equals: name.toLowerCase(),
        mode: 'insensitive'
      }
    }
  })

  if (college === null) throw new HTTPError(`No college found with name ${name}`, 404)

  return college
}

export const getCollegeNameFromId = async (id: number): Promise<string> => {
  const college = await prisma.college.findFirst({
    where: {
      id
    }
  })

  if (college === null) throw new HTTPError(`No college found with ID ${id}`, 404)

  return college.name
}

export const getCollegeFromId = async (id: number): Promise<College> => {
  const college = await prisma.college.findUnique({
    where: {
      id
    }
  })

  if (college === null) throw new HTTPError(`No college found with ID ${id}`, 404)

  return college
}

export function isUserRole (value: string): value is UserRole {
  return Object.values(UserRole).includes(value as UserRole)
}

export function isMenuItemType (value: string): value is MenuItemType {
  return Object.values(MenuItemType).includes(value as MenuItemType)
}

export function isOrderItemStatus (value: string): value is OrderItemStatus {
  return Object.values(OrderItemStatus).includes(value as OrderItemStatus)
}

export const getUserFromId = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (user === null) throw new HTTPError(`No user found with ID ${id}`, 404)

  return user
}

export const getMenuItemFromId = async (id: number): Promise<MenuItem & { college: College }> => {
  const item = await prisma.menuItem.findUnique({
    where: {
      id
    },
    include: {
      college: true
    }
  })

  if (item === null) throw new HTTPError(`No menu item found with ID ${id}`, 404)

  return item
}

export const getOrderFromId = async (id: number): Promise<Order & { orderItems: OrderItem[] }> => {
  const order = await prisma.order.findUnique({
    include: {
      orderItems: true
    },
    where: {
      id
    }
  })

  if (order === null) throw new HTTPError(`No order found with ID ${id}`, 404)

  return order
}
