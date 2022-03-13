import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { Board, BoardDocument } from './entities/board.entity'

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  private readonly logger = new Logger(BoardsService.name)

  async create(createBoardDto: CreateBoardDto): Promise<BoardDocument> {
    const createdBoard: BoardDocument = new this.boardModel(createBoardDto)
    return createdBoard.save()
  }

  async findAll(): Promise<BoardDocument[]> {
    return this.boardModel.find().exec()
  }

  async findOne(id: string): Promise<BoardDocument> {
    return this.boardModel.findById(id).exec()
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<BoardDocument> {
    return this.boardModel.findByIdAndUpdate(id, updateBoardDto).exec()
  }

  async remove(id: string): Promise<BoardDocument> {
    const boardEntity: BoardDocument = await this.boardModel
      .findByIdAndDelete(id)
      .exec()

    this.logger.debug('Emitting in BoardsService')
    this.eventEmitter.emit('board.afterDeleted', boardEntity)

    return boardEntity
  }
}
