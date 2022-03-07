import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TicketDocument = Ticket & Document

@Schema()
export class Ticket {
  @Prop()
  createdAt: Date = new Date()

  @Prop({ required: true })
  title: string

  @Prop()
  description: string

  @Prop()
  phase = 'CREATED'

  // labelIds: ObjectId[]
  // boardId: ObjectId
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)
