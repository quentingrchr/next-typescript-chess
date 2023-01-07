import { PieceType, ColorType, PositionType } from '@types'
import { Piece, ISpecificPiece } from '../Piece'
import { IBoard } from '@models/Board'

type DirectionType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

type IteratorsType = {
  instructions: {
    x: (x: number) => number
    y: (y: number) => number
  }
  bounds: {
    x: number
    y: number
  }
}
export class Bishop extends Piece {
  constructor(player: ColorType) {
    super(PieceType.BISHOP, player)
  }

  /**
   * Returns the all the possible position for a bishop from a given position in a given direction
   * @param {IBoard} board
   * @param {PositionType} position
   * @param {ISpecificPiece} piece
   * @param {'left' | 'right' | 'up' | 'down'} direction
   */

  getTowerMoves(
    board: IBoard,
    position: PositionType,
    piece: ISpecificPiece,
    direction: DirectionType
  ) {
    const moves: PositionType[] = []
    const [xBounds, yBounds] = board.getBounds()
    const iterators: Record<DirectionType, IteratorsType> = {
      'top-right': {
        instructions: {
          x: (x: number) => x + 1,
          y: (y: number) => y - 1,
        },
        bounds: {
          x: xBounds,
          y: -1,
        },
      },
      'top-left': {
        instructions: {
          x: (x: number) => x - 1,
          y: (y: number) => y - 1,
        },
        bounds: {
          x: -1,
          y: -1,
        },
      },
      'bottom-right': {
        instructions: {
          x: (x: number) => x + 1,
          y: (y: number) => y + 1,
        },
        bounds: {
          x: xBounds,
          y: yBounds,
        },
      },
      'bottom-left': {
        instructions: {
          x: (x: number) => x - 1,
          y: (y: number) => y + 1,
        },
        bounds: {
          x: -1,
          y: yBounds,
        },
      },
    }
    const { instructions, bounds } = iterators[direction]
    for (
      let x = position[0], y = position[1];
      x !== bounds.x && y !== bounds.y;
      x = instructions.x(x), y = instructions.y(y)
    ) {
      if (x === position[0] && y === position[1]) continue
      const move = [x, y] as PositionType
      /* handle collision */
      if (piece.positionCollidesWithAlly(board, move)) break // stop before collision with same side
      moves.push(move)
    }

    return moves
  }

  getPossibleSpecifPieceMovesFromPosition(
    board: IBoard,
    position: PositionType
  ): PositionType[] {
    const [x, y] = position
    const [xBounds, yBounds] = board.getBounds()
    const possibleMovesFromPosition: PositionType[] = [
      ...this.getTowerMoves(board, position, this, 'top-right'),
      ...this.getTowerMoves(board, position, this, 'top-left'),
      ...this.getTowerMoves(board, position, this, 'bottom-right'),
      ...this.getTowerMoves(board, position, this, 'bottom-left'),
    ]

    return possibleMovesFromPosition
  }
}
