import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateLabelDto {
  @IsNotEmpty()
  name: string

  @IsOptional()
  color: string
}
