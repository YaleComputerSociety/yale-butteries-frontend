import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator'

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
  @IsIn(['FOOD', 'DESSERT', 'DRINK'])
    foodType: 'FOOD' | 'DRINK' | 'DESSERT'
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
  @IsIn(['FOOD', 'DESSERT', 'DRINK'])
    foodType: 'FOOD' | 'DRINK' | 'DESSERT'
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
