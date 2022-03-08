import { IsOptional } from 'class-validator'

export class UpdateLabelDto {
  @IsOptional()
  name: string

  @IsOptional()
  color: string
}
