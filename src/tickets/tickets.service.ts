import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BoardsService } from 'src/boards/boards.service'
import { LabelsService } from 'src/labels/labels.service'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { Ticket, TicketDocument } from './entities/ticket.entity'

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    private readonly boardsService: BoardsService,
    private readonly labelsService: LabelsService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const board = await this.boardsService.findOne(createTicketDto.boardId)
    if (board == null) return null // wtf?

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
    const label = await this.labelsService.findOne(labelId)
    if (label == null) return null // wtf?

    const ticket: TicketDocument = await this.ticketModel.findById(id)
    const labelIndex = ticket.labels.indexOf(label)
    if (labelIndex == -1) return null // wtf?
    ticket.labels.splice(labelIndex, 1)

    return ticket.save()
  }
}
