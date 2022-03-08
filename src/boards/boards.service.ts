import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { Board, BoardDocument } from './entities/board.entity'

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard: BoardDocument = new this.boardModel(createBoardDto)
    return createdBoard.save()
  }

  async findAll(): Promise<Board[]> {
    return this.boardModel.find().exec()
  }

  async findOne(id: string): Promise<Board> {
    return this.boardModel.findById(id).exec()
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    return this.boardModel.findByIdAndUpdate(id, updateBoardDto).exec()
  }

  async remove(id: string): Promise<Board> {
    return this.boardModel.findByIdAndDelete(id).exec()

    // TODO: delete my tickets too
  }
}
