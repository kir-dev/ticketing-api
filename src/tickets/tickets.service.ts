import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Board, BoardDocument } from 'src/boards/entities/board.entity'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { Ticket, TicketDocument } from './entities/ticket.entity'

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    // validate board's existence
    const board: BoardDocument = await this.boardModel.findById(
      createTicketDto.boardId,
    )
    if (board == null) return null

    const createdTicket: TicketDocument = new this.ticketModel({
      ...createTicketDto,
      board: createTicketDto.boardId,
    })
    return createdTicket.save()
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec()
  }

  async findOne(id: string): Promise<Ticket> {
    return this.ticketModel.findById(id).exec()
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    return this.ticketModel.findByIdAndUpdate(id, updateTicketDto).exec()
  }

  async remove(id: string): Promise<Ticket> {
    return this.ticketModel.findByIdAndDelete(id).exec()
  }

  async removeLabel(id: string, labelId: string): Promise<Ticket> {
    const ticket: TicketDocument = await this.ticketModel.findById(id)
    // TODO: implement label removal
    return ticket.save()
  }
}
