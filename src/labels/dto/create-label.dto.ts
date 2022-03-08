import { IsHexColor, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateLabelDto {
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsHexColor()
  color: string
}
