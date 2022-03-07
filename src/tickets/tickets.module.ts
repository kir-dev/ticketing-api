import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Ticket, TicketSchema } from './entities/ticket.entity'
import { TicketsController } from './tickets.controller'
import { TicketsService } from './tickets.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
