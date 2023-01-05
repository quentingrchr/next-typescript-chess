import { PieceType, ColorType, PositionType } from '@types'
import { Piece } from '../Piece'

export class Bishop extends Piece {
  constructor(player: ColorType) {
    super(PieceType.BISHOP, player)
  }
}
