import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type BoardDocument = Board & Document

@Schema()
export class Board {
  @Prop({ default: new Date() })
  createdAt: Date

  @Prop({ required: true })
  title: string
}

export const BoardSchema = SchemaFactory.createForClass(Board)
