import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { Phase } from '../entities/phase.enum'
import { Ticket } from '../entities/ticket.entity'

export class CreateTicketDto implements Ticket {
  @IsOptional()
  createdAt: Date = new Date()

  @IsNotEmpty()
  title: string

  @IsOptional()
  description: string = null

  @IsOptional()
  @IsEnum(Phase)
  phase: string = Phase.CREATED
}
