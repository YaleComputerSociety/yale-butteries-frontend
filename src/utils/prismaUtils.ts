// This file contains general functions relating to the database
import type { User, College, MenuItem, Order, OrderItem, OrderStatus } from '@prisma/client'
import { UserRole, MenuItemType, OrderItemStatus } from '@prisma/client'
import prisma from '@src/config/prismaClient'
import HTTPError from '@utils/httpError'

// user functions
export const getUserFromId = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (user === null) throw new HTTPError(`No user found with ID ${id}`, 404)

  return user
}

export async function findUserByNetId (netId: string): Promise<(User & { college: College }) | null> {
  return await prisma.user.findFirst({
    where: { netId },
    include: { college: true }
  })
}

// college functions
export const getCollegeFromId = async (id: number): Promise<College> => {
  const college = await prisma.college.findUnique({
    where: {
      id
    }
  })

  if (college === null) throw new HTTPError(`No college found with ID ${id}`, 404)
  return college
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

// menu item functinos
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

// order functions
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

interface UpdateOrderInternalBody {
  id: number
  readyAt: Date
  status: OrderStatus
  price: number
}

export const updateOrderInternal = async (order: UpdateOrderInternalBody): Promise<void> => {
  // check that the order exists
  await getOrderFromId(order.id)

  await prisma.order.update({
    where: {
      id: order.id
    },
    data: {
      status: order.status,
      price: order.price,
      readyAt: order.readyAt
    },
    include: {
      orderItems: true
    }
  })
}

// order item functions
export const getOrderItemFromId = async (id: number): Promise<OrderItem> => {
  const orderItem = await prisma.orderItem.findUnique({
    where: {
      id
    }
  })

  if (orderItem === null) throw new HTTPError(`No order item found with ID ${id}`, 404)

  return orderItem
}

// Type checkers
export function isUserRole (value: string): value is UserRole {
  return Object.values(UserRole).includes(value as UserRole)
}

export function isMenuItemType (value: string): value is MenuItemType {
  return Object.values(MenuItemType).includes(value as MenuItemType)
}

export function isOrderItemStatus (value: string): value is OrderItemStatus {
  return Object.values(OrderItemStatus).includes(value as OrderItemStatus)
}
