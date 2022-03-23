import { IsNotEmpty, IsString } from 'class-validator'
import { OAuthUser } from 'src/auth/oauthuser'
import { User } from '../entities/user.entity'

export class CreateUserDto implements User {
  constructor(oauthUser: OAuthUser) {
    this.name = oauthUser.displayName
    this.email = oauthUser.mail
    this.authSchId = oauthUser.internal_id
  }

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
