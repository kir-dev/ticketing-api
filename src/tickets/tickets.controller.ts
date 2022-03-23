import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthenticatedGuard } from 'src/auth/authenticated.guard'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { TicketsService } from './tickets.service'

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto)
  }

  @Get()
  async findAll() {
    return this.ticketsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id, updateTicketDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ticketsService.remove(id)
  }

  @Patch(':id/labels/:labelId')
  async addLabel(@Param('id') id: string, @Param('labelId') labelId: string) {
    return this.ticketsService.addLabel(id, labelId)
  }

  @Delete(':id/labels/:labelId')
  async removeLabel(
    @Param('id') id: string,
    @Param('labelId') labelId: string,
  ) {
    return this.ticketsService.removeLabel(id, labelId)
  }
}
