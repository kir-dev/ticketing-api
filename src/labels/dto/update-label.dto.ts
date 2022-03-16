import { IsOptional, IsString } from 'class-validator'

export class UpdateLabelDto {
  @IsOptional()
  name: string

  @IsOptional()
  @IsString()
  color: string
}
