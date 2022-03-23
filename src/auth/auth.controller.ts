import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthenticatedGuard } from './authenticated.guard'

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('authsch'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

  @Get('callback')
  @UseGuards(AuthGuard('authsch'))
  async callbackRedirect(@Request() req) {
    return { message: `Successfully logged in with user!`, user: req.user }
  }

  @Get('protected')
  @UseGuards(new AuthenticatedGuard())
  async protected(@Request() req) {
    return req.user
  }
}
