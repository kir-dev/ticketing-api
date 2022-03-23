import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthenticatedGuard } from './authenticated.guard'
import { AuthschStrategy } from './authsch.strategy'
import { SessionSerializer } from './session.serializer'

@Module({
  imports: [
    UsersModule,
    HttpModule,
    PassportModule.register({ session: true }),
  ],
  providers: [AuthschStrategy, SessionSerializer, AuthenticatedGuard],
  controllers: [AuthController],
})
export class AuthModule {}
