import { IsEnum, IsOptional } from 'class-validator'
import { Phase } from '../entities/phase.enum'

export class UpdateTicketDto {
  @IsOptional()
  title: string

  @IsOptional()
  description: string

  @IsOptional()
  @IsEnum(Phase)
  phase: string

  @IsOptional()
  boardId: string

  @IsOptional()
  labelIds: string[]
}
