import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super()
  }

  serializeUser(user: any, done: (err: Error, payload: any) => void) {
    done(null, user)
  }

  async deserializeUser(payload: any, done: (err: Error, user: any) => void) {
    done(null, payload)
  }
}
