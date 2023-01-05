import { PieceType, ColorType, PositionType } from '@types'
import { Piece } from '../Piece'

export class King extends Piece {
  constructor(player: ColorType) {
    super(PieceType.KING, player)
  }
}
