// This file contains a bunch of type definitions

import type { StackScreenProps } from '@react-navigation/stack'
import type { MainStackParamList } from '../routes/mainStackNavigator'

// Props that carry navigation and route data, for the main stack (e.g. everything but the staff side)
export type MainStackScreenProps<Screen extends keyof MainStackParamList> = StackScreenProps<MainStackParamList, Screen>

// Make sure to keep these in sync with the backend!
export type UserRole = 'CUSTOMER' | 'STAFF'
export type MenuItemType = 'FOOD' | 'DRINK' | 'DESSERT'
export type OrderStatus = 'QUEUED' | 'ONGOING' | 'READY' | 'PAID' | 'CANCELLED' | 'TIMEOUT'
export type OrderItemStatus = 'QUEUED' | 'ONGOING' | 'READY' | 'CANCELLED'

export interface NewUser {
  netId: string
  collegeId: number
  role: UserRole
}

export interface User {
  id: string
  netId: string
  name: string
  collegeId: number
  role: UserRole
  email?: string
  currentOrder?: OrderItem
}

export interface UserUpdate {
  name?: string
  email?: string
}

export interface NewOrderItem {
  price: number
  menuItemId: number
}

export interface OrderItem {
  id: number
  price: number
  status: OrderItemStatus
  menuItemId: number
  name: string
  userId: string
}

export interface Order {
  id: number
  collegeId: number
  status: OrderStatus
  price: number
  userId: string
  paymentIntentId: string
  orderItems: OrderItem[]
  createdAt: string
}

export interface OrderCartItem {
  orderItem: MenuItem
  index: number
}

export interface NewMenuItem {
  name: string
  collegeId: number
  price: number
  foodType: MenuItemType
  description?: string
}

export interface MenuItem {
  id: number
  name: string
  collegeId: number
  price: number
  foodType: MenuItemType
  description: string
  isActive: boolean
}

export interface College {
  id: number
  name: string
  isButteryIntegrated: boolean
  daysOpen: string[]
  isOpen: boolean
  openTime: string
  closeTime: string
  isAcceptingOrders: boolean
}

export interface CollegeUpdate {
  id: number
  daysOpen?: string[]
  isOpen?: boolean
  openTime?: string
  closeTime?: string
  isAcceptingOrders?: boolean
}
