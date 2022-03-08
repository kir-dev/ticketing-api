import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Phase } from './phase.enum'

export type TicketDocument = Ticket & Document

@Schema()
export class Ticket {
  @Prop({ default: new Date() })
  createdAt: Date

  @Prop({ required: true })
  title: string

  @Prop({ default: null })
  description: string

  @Prop({ default: Phase.CREATED })
  phase: string

  // labelIds: ObjectId[]
  // boardId: ObjectId
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)
