import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { BoardDocument } from 'src/boards/entities/board.entity'
import { TicketsService } from '../tickets.service'

@Injectable()
export class AssociationChangedProvider {
  constructor(private ticketsService: TicketsService) {}

  private readonly logger = new Logger(AssociationChangedProvider.name)

  @OnEvent('board.afterDeleted')
  handleBoardDeletedEvent(payload: BoardDocument) {
    this.logger.debug(`Initiating the ticket removal of board ${payload.id}`)
    this.ticketsService.removeWhereBoard(payload.id)
  }
}
