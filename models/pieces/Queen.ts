import { PieceType, ColorType, PositionType } from '@types'
import { Piece } from '../Piece'

export class Queen extends Piece {
  constructor(player: ColorType) {
    super(PieceType.QUEEN, player)
  }
}
