import { PieceType, ColorType, PositionType } from '@types'
import { Piece } from '../Piece'
import { IBoard } from '@models/Board'

export class Queen extends Piece {
  constructor(player: ColorType) {
    super(PieceType.QUEEN, player)
  }
  getPossibleSpecifPieceMovesFromPosition(
    board: IBoard,
    position: PositionType
  ): PositionType[] {
    /* todo implement */

    return [[0, 1]]
  }
}
