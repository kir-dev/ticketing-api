import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { Board } from 'src/boards/entities/board.entity'
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  board: Board
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)
