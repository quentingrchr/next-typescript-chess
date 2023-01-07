import { PieceType, ColorType, PositionType } from '@types'
import { Piece } from '../Piece'
import { ISpecificPiece } from '../Piece'
import { IBoard } from '../Board'

export class Knight extends Piece {
  constructor(player: ColorType) {
    super(PieceType.KNIGHT, player)
  }
  getPossibleSpecifPieceMovesFromPosition(
    board: IBoard,
    position: PositionType
  ): PositionType[] {
    const [x, y] = position
    const possibleMovesFromPosition: PositionType[] = [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
    ]

    return possibleMovesFromPosition
  }

  getTowerMoves(
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
      if (piece.positionCollidesWithAlly(board, move)) break // stop before collision with same side
      moves.push(move)
      if (piece.positionCollidesWithEnemy(board, move)) break // stop after collision with other side
    }

    return moves
  }
}
