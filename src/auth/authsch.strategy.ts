import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-oauth2'
import { lastValueFrom, map } from 'rxjs'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UserDocument } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { OAuthUser } from './oauthuser'

const AUTH_SCH_URL = 'https://auth.sch.bme.hu'

@Injectable()
export class AuthschStrategy extends PassportStrategy(Strategy, 'authsch') {
  constructor(
    private usersService: UsersService,
    private httpService: HttpService,
  ) {
    super({
      authorizationURL: `${AUTH_SCH_URL}/site/login`,
      tokenURL: `${AUTH_SCH_URL}/oauth2/token`,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/oauth/callback',
      scope: ['basic', 'displayName', 'mail'],
    })
  }

  async validate(accessToken: string): Promise<UserDocument> {
    const responseUser: OAuthUser = await lastValueFrom(
      this.httpService
        .get(`${AUTH_SCH_URL}/api/profile?access_token=${accessToken}`)
        .pipe(map((response) => response.data)),
    )

    const user = await this.usersService.findByAuthSchId(
      responseUser.internal_id,
    )

    if (user) {
      return user
    }

    const newUser = await this.usersService.create(
      new CreateUserDto(responseUser),
    )
    return newUser
  }
}
