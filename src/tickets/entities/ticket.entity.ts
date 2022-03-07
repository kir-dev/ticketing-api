import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Phase } from './phase.enum'

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
  phase: string = Phase.CREATED

  // labelIds: ObjectId[]
  // boardId: ObjectId
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)
