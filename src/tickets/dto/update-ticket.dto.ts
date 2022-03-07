import { IsEnum, IsOptional } from 'class-validator'
import { Phase } from '../entities/phase.enum'
import { Ticket } from '../entities/ticket.entity'

export class UpdateTicketDto implements Ticket {
  @IsOptional()
  createdAt: Date

  @IsOptional()
  title: string

  @IsOptional()
  description: string

  @IsOptional()
  @IsEnum(Phase)
  phase: string
}
