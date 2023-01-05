import { PieceType, ColorType, PositionType } from '@types'
import { Piece, IPiece, ISpecificPiece } from '../Piece'

export class Pawn extends Piece implements ISpecificPiece {
  constructor(player: ColorType) {
    super(PieceType.BISHOP, player)
  }

  validPieceMovesFromPosition(position: PositionType): PositionType[] {
    const [x, y] = position
    const moves: PositionType[] = []
    console.log('this.getPieceSide()', this.getPieceSide())
    if (this.getPieceSide() === ColorType.WHITE) {
      const movePossible = [x, y + 1] as PositionType
      moves.push(movePossible)
    } else {
      const movePossible = [x, y - 1] as PositionType
      moves.push(movePossible)
    }
    return moves
  }
}
