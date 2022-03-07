import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { TicketsModule } from './tickets/tickets.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@ticketcluster.ssxvz.mongodb.net/ticketing?retryWrites=true&w=majority`,
    ),
    TicketsModule,
  ],
})
export class AppModule {}
