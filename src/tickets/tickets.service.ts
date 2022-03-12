import { Injectable, Logger, NotFoundException } from '@nestjs/common'
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

  private readonly logger = new Logger(TicketsService.name)

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { board, labels } = createTicketDto

    const [boardEntity, labelEntities] = await Promise.all([
      this.boardsService.findOne(board),
      this.labelsService.findMany(labels),
    ])

    if (boardEntity == null)
      throw new NotFoundException(null, `Board with id ${board} not found`)

    const createdTicket: TicketDocument = new this.ticketModel({
      ...createTicketDto,
      labels: labelEntities,
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

  async removeWhereBoard(id: string) {
    this.logger.debug(`Removing all tickets where Board ${id}`)
    return this.ticketModel.deleteMany({ board: id }).exec()
  }

  async addLabel(id: string, labelId: string): Promise<Ticket> {
    const label = await this.labelsService.findOne(labelId)
    if (label == null)
      throw new NotFoundException(null, `Label with id ${labelId} not found`)

    const ticket: TicketDocument = await this.ticketModel.findById(id).exec()
    const labelIndex = ticket.labels.indexOf(label)
    if (labelIndex == -1) {
      ticket.labels.push(label)
    }
    return ticket.save()
  }

  async removeLabel(id: string, labelId: string): Promise<Ticket> {
    const label = await this.labelsService.findOne(labelId)
    if (label == null)
      throw new NotFoundException(null, `Label with id ${labelId} not found`)

    const ticket: TicketDocument = await this.ticketModel.findById(id).exec()
    const labelIndex = ticket.labels.indexOf(label)
    if (labelIndex == -1)
      throw new NotFoundException(
        null,
        `Label ${labelId} was never added to ticket ${id}`,
      )

    ticket.labels.splice(labelIndex, 1)
    return ticket.save()
  }

  async removeLabelOfAll(labelId: string): Promise<Ticket[]> {
    const ticketEntities = await this.ticketModel
      .find()
      .where({ labelId: labelId })
      .exec()
    this.logger.debug(
      `Removing label ${labelId} from ${ticketEntities.length} tickets`,
    )
    ticketEntities.forEach((ticketEntity) => {
      this.removeLabel(ticketEntity.id, labelId)
    })

    return ticketEntities
  }
}
