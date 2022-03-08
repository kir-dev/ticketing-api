import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { Phase } from '../entities/phase.enum'

export class CreateTicketDto {
  @IsNotEmpty()
  title: string

  @IsOptional()
  description: string

  @IsOptional()
  @IsEnum(Phase)
  phase: string = Phase.CREATED
}
