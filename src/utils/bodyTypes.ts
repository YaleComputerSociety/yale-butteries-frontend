// This file contains class-validator types for the request bodies of every endpiont that uses a body
// class-validator uses these type classes to automatically check that the body inputted is correct and deal with errors

import { MenuItemType, OrderItemStatus, OrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator'

// convert prisma enums into lists of strings for class-validator to use
const orderStatusValues = Object.values(OrderStatus) as string[]
const orderItemStatusValues = Object.values(OrderItemStatus) as string[]
const menuItemTypeValues = Object.values(MenuItemType) as string[]

export class UpdateCollegeBody {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
    daysOpen: string[]

  @IsOptional()
  @IsBoolean()
    isOpen: boolean

  @IsOptional()
  @IsString()
    openTime: string

  @IsOptional()
  @IsString()
    closeTime: string
}

export class CreateMenuItemBody {
  @IsString()
    item: string

  @IsString()
    college: string

  @IsInt()
  @Min(50)
  @Max(2000)
    price: number

  @IsOptional()
  @IsString()
    description: string

  @IsOptional()
  @IsBoolean()
    isActive: boolean

  @IsOptional()
  @IsIn(menuItemTypeValues)
    foodType: string
}

export class UpdateMenuItemBody {
  @IsOptional()
  @IsString()
    item: string

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(2000)
    price: number

  @IsOptional()
  @IsString()
    description: string

  @IsOptional()
  @IsBoolean()
    isActive: boolean

  @IsOptional()
  @IsIn(menuItemTypeValues)
    foodType: string
}

export class CreateOrderBody {
  @IsString()
    userId: string

  @IsInt()
    price: number

  @IsString()
    college: string

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemBody)
    transactionItems: CreateOrderItemBody[]
}

export class CreateOrderItemBody {
  @IsInt()
  @Min(50)
  @Max(2000)
    itemCost: number

  @IsInt()
    menuItemId: number
}

export class UpdateOrderItemBody {
  @IsIn(orderItemStatusValues)
    orderStatus: string
}

export class UpdateOrderBody {
  @IsOptional()
  @IsIn(orderStatusValues)
    in_progress: string

  @IsOptional()
  @IsInt()
    total_price: number

  @IsOptional()
  @IsInt()
    stripe_fee: number
}

export class CreateUserBody {
  @IsString()
    netid: string

  @IsString()
    college: string

  @IsOptional()
  @IsString()
    name: string

  @IsOptional()
  @IsString()
    email: string

  @IsOptional()
  @IsString()
    token: string
}

export class UpdateUserBody {
  @IsOptional()
  @IsString()
    name: string

  @IsOptional()
  @IsString()
    email: string
}

export class VerifyStaffLoginBody {
  @IsString()
    username: string

  @IsString()
    password: string
}

// what the actual fuck why is the frontend written like this
export class CreatePaymentIntentItemItemBody {
  @IsInt()
  @Min(50)
  @Max(2000)
    price: number

  @IsInt()
    id: number
}

export class CreatePaymentIntentItemBody {
  @ValidateNested()
  @Type(() => CreatePaymentIntentItemItemBody)
    orderItem: CreatePaymentIntentItemItemBody
}

export class CreatePaymentIntentBody {
  @IsString()
    userId: string

  @IsInt()
    price: number

  @IsString()
    college: string

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentIntentItemBody)
    items: CreatePaymentIntentItemBody[]
}

export class SubscribePushNotificationsBody {
  @IsOptional()
  @IsString()
    pushToken: string

  @IsInt()
    transactionId: number
}
