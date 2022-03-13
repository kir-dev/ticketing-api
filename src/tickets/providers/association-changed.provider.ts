import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { BoardDocument } from 'src/boards/entities/board.entity'
import { LabelDocument } from 'src/labels/entities/label.entity'
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

  @OnEvent('label.afterDeleted')
  handleLabelDeletedEvent(payload: LabelDocument) {
    this.logger.debug(`Initiating the label removal ${payload.id} from tickets`)
    this.ticketsService.removeLabelOfAll(payload)
  }
}
