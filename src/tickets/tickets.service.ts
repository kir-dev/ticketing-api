import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BoardsService } from 'src/boards/boards.service'
import { LabelDocument } from 'src/labels/entities/label.entity'
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

  async create(createTicketDto: CreateTicketDto): Promise<TicketDocument> {
    const { board, labels } = createTicketDto

    const [boardEntity, labelEntities] = await Promise.all([
      this.boardsService.findOne(board),
      this.labelsService.findMany(labels),
    ])

    if (boardEntity == null)
      throw new NotFoundException(null, `Board with id ${board} not found`)

    const createdTicket: TicketDocument = new this.ticketModel({
      ...createTicketDto,
      board: boardEntity,
      labels: labelEntities,
    })
    return createdTicket.save()
  }

  async findAll(): Promise<TicketDocument[]> {
    return this.ticketModel.find().exec()
  }

  async findOne(id: string): Promise<TicketDocument> {
    return this.ticketModel.findById(id).exec()
  }

  async update(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<TicketDocument> {
    return this.ticketModel.findByIdAndUpdate(id, updateTicketDto).exec()
  }

  async remove(id: string): Promise<TicketDocument> {
    return this.ticketModel.findByIdAndDelete(id).exec()
  }

  async removeWhereBoard(id: string) {
    this.logger.debug(`Removing all tickets where Board ${id}`)
    return this.ticketModel.deleteMany({ board: id }).exec()
  }

  async addLabel(id: string, labelId: string): Promise<TicketDocument> {
    const labelEntity = await this.labelsService.findOne(labelId)
    if (labelEntity == null)
      throw new BadRequestException(null, `Label with id ${labelId} not found`)

    const ticketEntity: TicketDocument = await this.ticketModel
      .findById(id)
      .exec()
    if (ticketEntity == null)
      throw new NotFoundException(null, `Ticket with id ${id} not found`)

    const labelIndex = ticketEntity.labels.indexOf(labelEntity.id)
    if (labelIndex == -1) {
      ticketEntity.labels.push(labelEntity.id)
    }

    return ticketEntity.save()
  }

  private spliceTicketLabels(
    ticketEntity: TicketDocument,
    labelEntity: LabelDocument,
  ): void {
    const labelIndex = ticketEntity.labels.indexOf(labelEntity.id)
    if (labelIndex == -1)
      throw new NotFoundException(
        null,
        `Label ${labelEntity.id} was never added to ticket ${ticketEntity.id}`,
      )
    ticketEntity.labels.splice(labelIndex, 1)
  }

  async removeLabel(id: string, labelId: string): Promise<TicketDocument> {
    const labelEntity: LabelDocument = await this.labelsService.findOne(labelId)
    if (labelEntity == null)
      throw new NotFoundException(null, `Label with id ${labelId} not found`)

    const ticketEntity: TicketDocument = await this.ticketModel
      .findById(id)
      .exec()

    this.spliceTicketLabels(ticketEntity, labelEntity)
    return ticketEntity.save()
  }

  async removeLabelOfAll(
    labelEntity: LabelDocument,
  ): Promise<TicketDocument[]> {
    const ticketEntities = await this.ticketModel
      .find()
      .where({ labels: labelEntity.id })
      .exec()

    this.logger.debug(
      `Removing label ${labelEntity.id} from ${ticketEntities.length} tickets`,
    )

    ticketEntities.forEach((ticketEntity) => {
      this.spliceTicketLabels(ticketEntity, labelEntity)
      ticketEntity.save()
    })

    return ticketEntities
  }
}
