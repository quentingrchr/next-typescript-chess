import { PieceType, ColorType, PositionType } from '@types'
import { Piece } from '../Piece'
import { IBoard } from '@models/Board'

export class King extends Piece {
  constructor(player: ColorType) {
    super(PieceType.KING, player)
  }
  getPossibleSpecifPieceMovesFromPosition(
    board: IBoard,
    position: PositionType
  ): PositionType[] {
    /* todo implement */

    return [[0, 1]]
  }
}
