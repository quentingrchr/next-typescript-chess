import { PieceType, ColorType, PositionType } from '@types'
import { ISpecificPiece, Piece } from '../Piece'
import { IBoard } from '../Board'

function collidesWithSameSide(
  board: IBoard,
  position: PositionType,
  piece: ISpecificPiece
) {
  const hasPiece = board.getSideOnSpot(position)
  if (!hasPiece) return false
  return board.getSideOnSpot(position) === piece.getPieceSide()
}

function collidesWithOtherSide(
  board: IBoard,
  position: PositionType,
  piece: ISpecificPiece
) {
  const hasPiece = board.getSideOnSpot(position)
  if (!hasPiece) return false
  return board.getSideOnSpot(position) !== piece.getPieceSide()
}

function getTowerMoves(
  board: IBoard,
  position: PositionType,
  piece: ISpecificPiece,
  direction: 'left' | 'right' | 'up' | 'down'
) {
  const moves: PositionType[] = []
  const [xBounds, yBounds] = board.getBounds()
  const iterators = {
    left: {
      instructions: (x: number) => x - 1,
      bound: -1,
      positionIndex: 0,
    },
    right: {
      instructions: (x: number) => x + 1,
      bound: xBounds,
      positionIndex: 0,
    },
    up: {
      instructions: (y: number) => y - 1,
      bound: -1,
      positionIndex: 1,
    },
    down: {
      instructions: (y: number) => y + 1,
      bound: yBounds,
      positionIndex: 1,
    },
  }
  const { instructions, bound } = iterators[direction]
  for (
    let cursor = position[iterators[direction].positionIndex];
    cursor !== bound;
    cursor = instructions(cursor)
  ) {
    if (cursor === position[iterators[direction].positionIndex]) continue
    const move = [...position] as PositionType
    move[iterators[direction].positionIndex] = cursor
    moves.push(move)
    /* handle collision */
    if (collidesWithSameSide(board, move, piece)) break // stop before collision with same side
    moves.push(move)
    if (collidesWithOtherSide(board, move, piece)) break // stop after collision with other side
  }

  return moves
}

export class Rook extends Piece {
  constructor(player: ColorType) {
    super(PieceType.ROOK, player)
  }

  getPossibleSpecifPieceMovesFromPosition(
    board: IBoard,
    position: PositionType
  ): PositionType[] {
    /* horizontal moves */
    const [x, y] = position
    const moves: PositionType[] = [...getVerticalMoves(board, position, this)]
    const xMoves = [
      ...getTowerMoves(board, position, this, 'left'),
      ...getTowerMoves(board, position, this, 'right'),
    ]
    const yMoves = [
      ...getTowerMoves(board, position, this, 'up'),
      ...getTowerMoves(board, position, this, 'down'),
    ]
    moves.push(...xMoves, ...yMoves)
    return moves
  }
}
