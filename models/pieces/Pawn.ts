import { PieceType, ColorType, PositionType } from '@types'
import { Piece, ISpecificPiece } from '../Piece'
import { IBoard } from '../Board'

export class Pawn extends Piece implements ISpecificPiece {
  constructor(player: ColorType) {
    super(PieceType.BISHOP, player)
  }

  getPossibleSpecifPieceMovesFromPosition(
    board: IBoard,
    position: PositionType
  ): PositionType[] {
    const [x, y] = position
    const moves: PositionType[] = []
    const turnNb = board.getTurnNb()
    console.log('this.getPieceSide()', this.getPieceSide())
    if (this.getPieceSide() === ColorType.WHITE) {
      if (board.getSideOnSpot([x, y + 1]) !== ColorType.BLACK) {
        moves.push([x, y + 1] as PositionType)
      }
      if (board.getSideOnSpot([x + 1, y + 1]) === ColorType.BLACK) {
        moves.push([x + 1, y + 1] as PositionType)
      }
      if (board.getSideOnSpot([x - 1, y + 1]) === ColorType.BLACK) {
        moves.push([x - 1, y + 1] as PositionType)
      }
      if (this.getHasNotMoved()) {
        moves.push([x, y + 2] as PositionType)
      }
    } else {
      if (board.getSideOnSpot([x, y - 1]) !== ColorType.WHITE) {
        moves.push([x, y - 1] as PositionType)
      }
      if (board.getSideOnSpot([x + 1, y + 1]) === ColorType.WHITE) {
        moves.push([x + 1, y - 1] as PositionType)
      }
      if (board.getSideOnSpot([x - 1, y + 1]) === ColorType.WHITE) {
        moves.push([x - 1, y - 1] as PositionType)
      }
      if (this.getHasNotMoved()) {
        moves.push([x, y - 2] as PositionType)
      }
    }
    return moves
  }
}
