import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BoardsModule } from 'src/boards/boards.module'
import { LabelsModule } from 'src/labels/labels.module'
import { Ticket, TicketSchema } from './entities/ticket.entity'
import { TicketsController } from './tickets.controller'
import { TicketsService } from './tickets.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    BoardsModule,
    LabelsModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
