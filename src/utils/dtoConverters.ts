// This is where the fronttoback and backtofront functions will go
import { UserDto } from './dtos'
import { User } from '@prisma/client'
import { getCollegeNameFromId } from './prismaUtils'

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
