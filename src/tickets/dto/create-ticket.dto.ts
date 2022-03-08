import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { IsObjectId, IsObjectIdArray } from 'src/validators/object-id.validator'
import { Phase } from '../entities/phase.enum'

export class CreateTicketDto {
  @IsNotEmpty()
  title: string

  @IsOptional()
  description: string

  @IsOptional()
  @IsEnum(Phase)
  phase: string

  @IsNotEmpty()
  @IsObjectId()
  board: string

  @IsOptional()
  @IsObjectIdArray()
  labels: string[]
}
