import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateLabelDto {
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  color: string
}
