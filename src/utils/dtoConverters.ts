// This is where the fronttoback and backtofront functions will go
import { CollegeDto, OrderDto, OrderItemDto, UserDto } from './dtos'
import { College, Order, OrderItem, User } from '@prisma/client'
import { getUserFromId, getOrderFromId, getCollegeNameFromId, getMenuItemFromId } from './prismaUtils'

export async function formatUserDto(user: User): Promise<UserDto> {
  const collegeName = await getCollegeNameFromId(user.collegeId)

  return {
    email: user.email,
    netid: user.netId,
    name: user.name,
    permissions: user.role,
    college: collegeName,
    id: user.id,
  }
}
export const formatOrdersDto = async (orders: Order[], college: string): Promise<OrderDto[]> => {
  const res: OrderDto[] = []
  for (const item of orders) {
    const user: User = await getUserFromId(item.userId)
    const th: Order & { orderItems: OrderItem[] } = await getOrderFromId(item.id)
    const tis: OrderItemDto[] = await formatOrderItems(th)
    if (item) {
      const newItem: OrderDto = {
        id: item.id,
        college: college,
        inProgress: item.status,
        price: item.price,
        userId: user.id,
        paymentIntentId: item.paymentIntentId,
        creationTime: item.createdAt,
        transactionItems: tis,
      }
      res.push(newItem)
    }
  }
  return res
}

export const formatOrderItems = async (order: Order & { orderItems: OrderItem[] }): Promise<OrderItemDto[]> => {
  const orderItems: OrderItemDto[] = []
  for (const item of order.orderItems) {
    const menuItem = await getMenuItemFromId(item.menuItemId)
    const user = await getUserFromId(order.userId)
    if (item) {
      const newItem: OrderItemDto = {
        itemCost: item.price,
        orderStatus: item.status,
        menuItemId: item.menuItemId,
        name: menuItem.name,
        id: item.id,
        user: user.name,
      }
      orderItems.push(newItem)
    }
  }
  return orderItems
}

export const formatCollege = (college: College): CollegeDto => {
  const res: CollegeDto = {
    id: college.id,
    college: college.name,
    buttery_activated: college.isButteryIntegrated,
    daysOpen: college.daysOpen,
    openTime: college.openTime,
    closeTime: college.closeTime,
    isOpen: college.isOpen,
  }

  return res
}
