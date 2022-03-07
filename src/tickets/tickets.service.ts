import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { Ticket, TicketDocument } from './entities/ticket.entity'

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const createdTicket = new this.ticketModel(createTicketDto)
    return createdTicket.save()
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec()
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`
  }
}
