import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type LabelDocument = Label & Document

@Schema()
export class Label {
  @Prop({ default: new Date() })
  createdAt: Date

  @Prop({ required: true })
  name: string

  @Prop({ default: 'blue' })
  color: string
}

export const LabelSchema = SchemaFactory.createForClass(Label)
