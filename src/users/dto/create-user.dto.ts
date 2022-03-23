import { IsNotEmpty, IsString } from 'class-validator'
import { User } from '../entities/user.entity'

export class CreateUserDto implements User {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  authSchId: string
}
