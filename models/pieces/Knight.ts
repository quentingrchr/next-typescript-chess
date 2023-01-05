import { PieceType, ColorType, PositionType } from '@types'
import { Piece } from '../Piece'

export class Knight extends Piece {
  constructor(player: ColorType) {
    super(PieceType.KNIGHT, player)
  }
}
