import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateLabelDto } from './dto/create-label.dto'
import { UpdateLabelDto } from './dto/update-label.dto'
import { LabelsService } from './labels.service'

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  async create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelsService.create(createLabelDto)
  }

  @Get()
  async findAll() {
    return this.labelsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.labelsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLabelDto: UpdateLabelDto,
  ) {
    return this.labelsService.update(id, updateLabelDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.labelsService.remove(id)
  }
}
