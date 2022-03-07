import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TicketDocument = Ticket & Document

@Schema()
export class Ticket {
  @Prop()
  createdAt: Date

  @Prop({ required: true })
  title: string

  @Prop()
  description: string = null

  @Prop()
  phase: string

  // labelIds: ObjectId[]
  // boardId: ObjectId
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)
