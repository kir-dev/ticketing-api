import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateLabelDto } from './dto/create-label.dto'
import { UpdateLabelDto } from './dto/update-label.dto'
import { Label, LabelDocument } from './entities/label.entity'

@Injectable()
export class LabelsService {
  constructor(
    @InjectModel(Label.name) private labelModel: Model<LabelDocument>,
  ) {}

  async create(createLabelDto: CreateLabelDto): Promise<Label> {
    const createdLabel: LabelDocument = new this.labelModel(createLabelDto)
    return createdLabel.save()
  }

  async findAll(): Promise<Label[]> {
    return this.labelModel.find().exec()
  }

  async findOne(id: string): Promise<Label> {
    return this.labelModel.findById(id).exec()
  }

  async update(id: string, updateLabelDto: UpdateLabelDto): Promise<Label> {
    return this.labelModel.findByIdAndUpdate(id, updateLabelDto).exec()
  }

  async remove(id: string): Promise<Label> {
    return this.labelModel.findByIdAndDelete(id).exec()
  }
}
