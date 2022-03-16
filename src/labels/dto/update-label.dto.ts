import { IsHexColor, IsOptional } from 'class-validator'

export class UpdateLabelDto {
  @IsOptional()
  name: string

  @IsOptional()
  @IsHexColor()
  color: string
}
