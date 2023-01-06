/* as enum */
import { PieceType, ColorType, PositionType } from '@types'
import { IBoard } from './Board'
import { Spot } from './Spot'

type PieceNameType = `${ColorType}_${PieceType}`

type MovePositionType = {
  from: PositionType
  to: PositionType
}

export interface IPiece {
  _type: PieceType
  getPieceType: () => PieceType

  _side: ColorType
  getPieceSide: () => ColorType

  _name: PieceNameType
  getPieceName: () => PieceNameType

  getImageName: () => string

  _isKilled: boolean
  getIsKilled: () => boolean
  setIsKilled: (isKilled: boolean) => void

  moveIsForbidden: (board: IBoard, move: MovePositionType) => boolean
  newSpotIsOccupiedBySameSide: (
    board: IBoard,
    move: MovePositionType
  ) => boolean
  newSpotIsOutOfBound: (board: IBoard, move: MovePositionType) => boolean

  getPossibleSpecifPieceMovesFromPosition: (
    board: IBoard,
    position: PositionType
  ) => PositionType[]

  canMove: (board: IBoard, move: MovePositionType) => boolean
  getPossibleMovesFromPosition: (
    board: IBoard,
    position: PositionType
  ) => PositionType[]
}

export interface ISpecificPiece extends IPiece {
  getPossibleSpecifPieceMovesFromPosition: (
    board: IBoard,
    position: PositionType
  ) => PositionType[]
}

export abstract class Piece implements IPiece {
  _type: PieceType
  _side: ColorType
  _name: PieceNameType
  _isKilled: boolean
  constructor(type: PieceType, player: ColorType) {
    this._type = type
    this._side = player
    this._name = `${this._side}_${this._type}`
    this._isKilled = false
  }

  /**
   * Get the piece type
   * @returns {PieceType}
   * @example
   * PAWN
   * KING
   */
  getPieceType(): PieceType {
    return this._type
  }

  /**
   * Get the piece side (color)
   * @returns {ColorType}
   * @example
   * WHITE
   * BLACK
   */
  getPieceSide(): ColorType {
    return this._side
  }

  /**
   * Get the piece name
   * @returns {PieceNameType}
   * @example
   * WHITE_PAWN
   * BLACK_KING
   */
  getPieceName(): PieceNameType {
    return `${this._side}_${this._type}`
  }

  /**
   * Get the piece image name (svg asset)
   * @returns {string}
   * @example
   * white_pawn
   * black_king
   * white_queen
   * black_bishop
   */
  getImageName(): string {
    return `${this._side.toLowerCase()}_${this._type.toLowerCase()}`
  }

  /**
   * Get the piece killed status
   * @returns {boolean}
   * @example
   * true
   * false
   */
  getIsKilled(): boolean {
    return this._isKilled
  }

  /**
   * Set the piece killed status
   * @param {boolean} isKilled
   * @example
   * true
   * false
   */
  setIsKilled(isKilled: boolean): void {
    this._isKilled = isKilled
  }

  /**
   * Get all the possible moves for this specific piece from a position
   * @param {PositionType} position
   * @returns {PositionType[]}
   * @example
   * [
   * [0, 1],
   * [0, 2],
   * [1, 1],
   * [1, 2],
   */
  abstract getPossibleSpecifPieceMovesFromPosition(
    board: IBoard,
    position: PositionType
  ): PositionType[]

  /**
   * Check if the new spot is occupied by a piece of the same side
   * @param {IBoard} board
   * @param {MovePositionType} move
   * @example
   * {
   * from: [0, 1],
   * to: [0, 2]
   * }
   * @returns {boolean}
   * @example
   * true
   * false
   *
   */
  newSpotIsOccupiedBySameSide(board: IBoard, move: MovePositionType): boolean {
    const { to } = move
    const piece = board.getSpot(to)
    if (piece === null) return false
    if (piece.getPieceSide() !== this.getPieceSide()) return false
    return true
  }

  /**
   * Check if the new spot is out of bound
   * @param {IBoard} board
   * @param {MovePositionType} move
   * @example
   * {
   * from: [0, 1],
   * to: [0, 2]
   * }
   * @returns {boolean}
   * @example
   * true
   * false
   *
   */
  newSpotIsOutOfBound(board: IBoard, move: MovePositionType): boolean {
    const { to } = move
    const [x, y] = to
    if (x < 0 || x > board._col - 1) return true
    if (y < 0 || y > board._row - 1) return true
    return false
  }

  /**
   * Check if the move is forbidden by general pieces rules,
   * i.e. out of bound or occupied by a piece of the same side
   * @param {IBoard} board
   * @param {MovePositionType} move
   * @example
   * {
   * from: [0, 1],
   * to: [0, 2]
   * }
   * @returns {boolean}
   * @example
   * true
   * false
   */
  moveIsForbidden(board: IBoard, move: MovePositionType): boolean {
    if (this.newSpotIsOutOfBound(board, move)) return true
    if (this.newSpotIsOccupiedBySameSide(board, move)) return true
    return false
  }

  /**
   * Check if the move is valid
   * i.e. not forbidden and in the possible moves for this specific piece
   * @param {IBoard} board
   * @param {MovePositionType} move
   * @returns {boolean}
   */
  canMove(board: IBoard, move: MovePositionType): boolean {
    if (this.moveIsForbidden(board, move)) return false
    const possiblePositions = this.getPossibleSpecifPieceMovesFromPosition(
      board,
      move.from
    )
    const isAPossiblePosition = possiblePositions.some(
      (position) => position[0] === move.to[0] && position[1] === move.to[1]
    )
    if (!isAPossiblePosition) return false
    return true
  }

  /**
   * Get all the possible moves for this piece from a position
   * Check all specific piece moves and filter the forbidden ones
   * @param {IBoard} board
   * @param {PositionType} position
   */
  getPossibleMovesFromPosition(
    board: IBoard,
    position: PositionType
  ): PositionType[] {
    const specificMoves = this.getPossibleSpecifPieceMovesFromPosition(
      board,
      position
    )
    const possibleMoves = specificMoves.filter((move) => {
      const forbidden = this.moveIsForbidden(board, {
        from: position,
        to: move,
      })
      console.log(`${move} is forbidden: ${forbidden}`)

      return !forbidden
    })
    return possibleMoves
  }
}
