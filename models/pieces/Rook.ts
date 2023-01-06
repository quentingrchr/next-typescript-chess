import { PieceType, ColorType, PositionType } from '@types'
import { ISpecificPiece, Piece } from '../Piece'
import { IBoard } from '../Board'

export class Rook extends Piece {
  constructor(player: ColorType) {
    super(PieceType.ROOK, player)
  }

  /**
   * Returns the all the possible position for a tower from a given position in a given direction
   * @param {IBoard} board
   * @param {PositionType} position
   * @param {ISpecificPiece} piece
   * @param {'left' | 'right' | 'up' | 'down'} direction
   */

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

  getPossibleSpecifPieceMovesFromPosition(
    board: IBoard,
    position: PositionType
  ): PositionType[] {
    /* horizontal moves */
    const [x, y] = position
    const xMoves = [
      ...this.getTowerMoves(board, position, this, 'left'),
      ...this.getTowerMoves(board, position, this, 'right'),
    ]
    const yMoves = [
      ...this.getTowerMoves(board, position, this, 'up'),
      ...this.getTowerMoves(board, position, this, 'down'),
    ]
    return [...xMoves, ...yMoves]
  }
}
