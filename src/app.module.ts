import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { BoardsModule } from './boards/boards.module'
import { LabelsModule } from './labels/labels.module'
import { TicketsModule } from './tickets/tickets.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://' +
        process.env.DATABASE_USERNAME +
        ':' +
        process.env.DATABASE_PASSWORD +
        '@' +
        process.env.DATABASE_HOST +
        '/' +
        process.env.DATABASE_NAME +
        '?retryWrites=true&w=majority',
    ),
    TicketsModule,
    BoardsModule,
    LabelsModule,
    EventEmitterModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
