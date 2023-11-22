// This is where the fronttoback and backtofront functions will go
import type { CollegeDto, MenuItemDto, OrderDto, OrderItemDto, UserDto } from './dtos'
import type { College, MenuItem, Order, OrderItem, User } from '@prisma/client'
import { getUserFromId, getOrderFromId, getMenuItemFromId, getCollegeFromId } from './prismaUtils'

export async function formatUser (user: User): Promise<UserDto> {
  const college = await getCollegeFromId(user.collegeId)

  return {
    email: user.email ?? 'noemail',
    netid: user.netId,
    name: user.name,
    permissions: user.role,
    college: college.name,
    id: user.id
  }
}

export const formatUsers = async (users: Array<User & { college: College }>): Promise<UserDto[]> => {
  const formattedUsers: UserDto[] = []
  for (const user of users) {
    formattedUsers.push({
      email: user.email ?? 'noemail',
      netid: user.netId,
      name: user.name,
      permissions: user.role,
      college: user.college.name,
      id: user.id
    })
  }
  return formattedUsers
}

// TODO: make this function more efficient by reducing database calls
// (user, th, tis are fetched for every order, should be fetched at beginning and put in a map)
export const formatOrders = async (orders: Array<Order & { orderItems: OrderItem[] }>, college: string): Promise<OrderDto[]> => {
  const formattedOrders: OrderDto[] = []

  for (const order of orders) {
    const user: User = await getUserFromId(order.userId)
    const orderItems: OrderItemDto[] = await formatOrderItems(order.orderItems)

    formattedOrders.push({
      id: order.id,
      college,
      inProgress: order.status,
      price: order.price,
      userId: user.id,
      paymentIntentId: order.paymentIntentId ?? '',
      creationTime: order.createdAt,
      transactionItems: orderItems
    })
  }

  return formattedOrders
}

export const formatOrder = async (order: Order & { orderItems: OrderItem[] }): Promise<OrderDto> => {
  const college = await getCollegeFromId(order.collegeId)
  const user = await getUserFromId(order.userId)
  const orderItems = await formatOrderItems(order.orderItems)

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

export const formatOrderItems = async (orderItems: OrderItem[]): Promise<OrderItemDto[]> => {
  const formattedOrderItems: OrderItemDto[] = []

  // user is the same for every order item
  const user = await getUserFromId(orderItems[0].userId)

  for (const item of orderItems) {
    const menuItem = await getMenuItemFromId(item.menuItemId)

    formattedOrderItems.push({
      itemCost: item.price,
      orderStatus: item.status,
      menuItemId: item.menuItemId,
      name: menuItem.name,
      id: item.id,
      user: user.name
    })
  }

  return formattedOrderItems
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
