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
    const createdTicket: TicketDocument = new this.ticketModel(createTicketDto)
    return createdTicket.save()
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec()
  }

  findOne(id: number): Promise<Ticket> {
    return this.ticketModel.findById(id).exec()
  }

  update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    return this.ticketModel.findByIdAndUpdate(id, updateTicketDto).exec()
  }

  remove(id: number): Promise<Ticket> {
    return this.ticketModel.findByIdAndDelete(id).exec()
  }

  async removeLabel(id: number, labelId: number): Promise<Ticket> {
    const ticket: TicketDocument = await this.ticketModel.findById(id)
    // TODO: implement label removal
    return ticket.save()
  }
}
