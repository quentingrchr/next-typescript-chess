/* as enum */
import { PieceType, ColorType, PositionType } from '@types'
import { IBoard } from './Board'

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

  movePiece: (board: IBoard, move: MovePositionType) => void
}

export interface ISpecificPiece extends IPiece {
  validPieceMovesFromPosition: (position: PositionType) => PositionType[]
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
  getPieceType(): PieceType {
    return this._type
  }

  getPieceSide(): ColorType {
    return this._side
  }

  getPieceName(): PieceNameType {
    return `${this._side}_${this._type}`
  }

  getImageName(): string {
    return `${this._side.toLowerCase()}_${this._type.toLowerCase()}`
  }

  getIsKilled(): boolean {
    return this._isKilled
  }

  setIsKilled(isKilled: boolean): void {
    this._isKilled = isKilled
  }

  abstract validPieceMovesFromPosition(position: PositionType): PositionType[]

  newSpotIsOccupiedBySameSide(board: IBoard, move: MovePositionType): boolean {
    // const { to } = move
    // const [toX, toY] = to
    // const newSpotHasPiece = board.getPiece([toX, toY]) !== null
    // if (!newSpotHasPiece) return false
    // const newSpotPiece = board.getPiece([toX, toY]) as IPiece
    // const newSpotPieceSide = newSpotPiece.getPieceSide()
    // const playerPieceSide = this.getPieceSide()
    // return newSpotPieceSide === playerPieceSide
    return false
  }

  newSpotIsOutOfBound(board: IBoard, move: MovePositionType): boolean {
    // const { to } = move
    // const [toX, toY] = to
    // const outOfBoundX = toX < 0 || toX > board.getBounds()[0]
    // const outOfBoundY = toY < 0 || toY > board.getBounds()[1]
    // return outOfBoundX || outOfBoundY
    return false
  }

  moveIsForbidden(board: IBoard, move: MovePositionType): boolean {
    if (this.newSpotIsOutOfBound(board, move)) return true
    if (this.newSpotIsOccupiedBySameSide(board, move)) return true
    const possiblePositions = this.validPieceMovesFromPosition(move.from)
    if (
      !possiblePositions.some(
        (possiblePosition) =>
          possiblePosition[0] === move.to[0] &&
          possiblePosition[1] === move.to[1]
      )
    )
      return true
    return false
  }

  movePiece(board: IBoard, move: MovePositionType): void {
    if (this.moveIsForbidden(board, move)) return
    const { from, to } = move
    const [fromX, fromY] = from
    const [toX, toY] = to
    const pieceToMove = board.getPiece([fromX, fromY]) as IPiece
    /* implement logic to kill piece */
    board.movePiece([fromX, fromY], [toX, toY])
  }
}
