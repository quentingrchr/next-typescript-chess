import { PieceType, ColorType, PositionType } from '@types'
import { Piece } from '../Piece'

export class Rook extends Piece {
  constructor(player: ColorType) {
    super(PieceType.ROOK, player)
  }
}
