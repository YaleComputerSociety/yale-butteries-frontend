import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator'

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
