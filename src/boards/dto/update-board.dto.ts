import { IsOptional } from 'class-validator'

export class UpdateBoardDto {
  @IsOptional()
  title: string
}
