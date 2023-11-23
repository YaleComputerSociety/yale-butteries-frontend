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
