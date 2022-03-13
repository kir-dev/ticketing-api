import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateLabelDto } from './dto/create-label.dto'
import { UpdateLabelDto } from './dto/update-label.dto'
import { Label, LabelDocument } from './entities/label.entity'

@Injectable()
export class LabelsService {
  constructor(
    @InjectModel(Label.name) private labelModel: Model<LabelDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  private readonly logger = new Logger(LabelsService.name)

  async create(createLabelDto: CreateLabelDto): Promise<LabelDocument> {
    const createdLabel: LabelDocument = new this.labelModel(createLabelDto)
    return createdLabel.save()
  }

  async findAll(): Promise<LabelDocument[]> {
    return this.labelModel.find().exec()
  }

  async findMany(ids: string[]): Promise<LabelDocument[]> {
    return this.labelModel.find().where('_id').in(ids).exec()
  }

  async findOne(id: string): Promise<LabelDocument> {
    return this.labelModel.findById(id).exec()
  }

  async update(
    id: string,
    updateLabelDto: UpdateLabelDto,
  ): Promise<LabelDocument> {
    return this.labelModel.findByIdAndUpdate(id, updateLabelDto).exec()
  }

  async remove(id: string): Promise<LabelDocument> {
    const labelEntity = await this.labelModel.findByIdAndDelete(id).exec()
    if (labelEntity == null)
      throw new NotFoundException(null, `Label with id ${id} not found`)

    this.logger.debug('Emitting in LabelsService')
    this.eventEmitter.emit('label.afterDeleted', labelEntity)

    return labelEntity
  }
}
