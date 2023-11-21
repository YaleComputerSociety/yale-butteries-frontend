// This is where the fronttoback and backtofront functions will go
import type { CollegeDto, MenuItemDto, OrderDto, OrderItemDto, UserDto } from './dtos'
import type { College, MenuItem, Order, OrderItem, User } from '@prisma/client'
import { getUserFromId, getOrderFromId, getCollegeNameFromId, getMenuItemFromId, getCollegeFromId } from './prismaUtils'

export async function formatUserDto (user: User): Promise<UserDto> {
  const collegeName = await getCollegeNameFromId(user.collegeId)

  return {
    email: user.email ?? 'noemail',
    netid: user.netId,
    name: user.name,
    permissions: user.role,
    college: collegeName,
    id: user.id
  }
}

// TODO: make this function more efficient by reducing database calls
// (user, th, tis are fetched for every order, should be fetched at beginning and put in a map)
export const formatOrders = async (orders: Order[], college: string): Promise<OrderDto[]> => {
  const res: OrderDto[] = []
  for (const item of orders) {
    const user: User = await getUserFromId(item.userId)
    const th: Order & { orderItems: OrderItem[] } = await getOrderFromId(item.id)
    const tis: OrderItemDto[] = await formatOrderItems(th)

    const newItem: OrderDto = {
      id: item.id,
      college,
      inProgress: item.status,
      price: item.price,
      userId: user.id,
      paymentIntentId: item.paymentIntentId ?? '',
      creationTime: item.createdAt,
      transactionItems: tis
    }
    res.push(newItem)
  }
  return res
}

export const formatOrder = async (order: Order & { orderItems: OrderItem[] }): Promise<OrderDto> => {
  const college = await getCollegeFromId(order.collegeId)
  const user = await getUserFromId(order.userId)
  const orderItems = await formatOrderItems(order)

  const formattedOrder: OrderDto = {
    id: order.id,
    college: college.name,
    inProgress: order.status,
    price: order.price,
    userId: user.id,
    transactionItems: orderItems,
    creationTime: order.createdAt,
    paymentIntentId: ''
  }

  return formattedOrder
}

// TODO make more database-call efficient
export const formatOrderItems = async (order: Order & { orderItems: OrderItem[] }): Promise<OrderItemDto[]> => {
  const orderItems: OrderItemDto[] = []
  for (const item of order.orderItems) {
    const menuItem = await getMenuItemFromId(item.menuItemId)
    const user = await getUserFromId(order.userId)

    const newItem: OrderItemDto = {
      itemCost: item.price,
      orderStatus: item.status,
      menuItemId: item.menuItemId,
      name: menuItem.name,
      id: item.id,
      user: user.name
    }
    orderItems.push(newItem)
  }

  return orderItems
}

export const formatOrderItem = async (orderItem: OrderItem): Promise<OrderItemDto> => {
  const menuItem = await getMenuItemFromId(orderItem.menuItemId)

  return {
    itemCost: orderItem.price,
    orderStatus: orderItem.status,
    menuItemId: orderItem.menuItemId,
    name: menuItem.name,
    id: orderItem.id,
    user: orderItem.userId
  }
}

export const formatCollege = (college: College): CollegeDto => {
  const res: CollegeDto = {
    id: college.id,
    college: college.name,
    buttery_activated: college.isButteryIntegrated,
    daysOpen: college.daysOpen,
    openTime: college.openTime,
    closeTime: college.closeTime,
    isOpen: college.isOpen
  }

  return res
}

export const formatMenuItem = (menuItem: MenuItem & { college: College }): MenuItemDto => {
  const formattedMenuItem = {
    id: menuItem.id,
    item: menuItem.name,
    price: menuItem.price,
    college: menuItem.college.name,
    isActive: menuItem.isActive,
    description: menuItem.description,
    foodType: menuItem.type
  }
  return formattedMenuItem
}
