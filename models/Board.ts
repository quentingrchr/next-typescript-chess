import { Spots } from './Spots'
import { ColorType, PositionType } from '@types'
import { Bishop, King, Knight, Pawn, Queen, Rook } from './pieces'
import { IPiece, ISpecificPiece } from './Piece'
import { Spot } from './Spot'

declare global {
  interface Window {
    board: Board
  }
}

export interface IBoard {
  spots: Spots
  _row: number
  _col: number
  setBoard: () => void
  createSpots: () => void
  getSpots: () => Spots
  createPiece: (piece: ISpecificPiece, position: PositionType) => void
  removePiece: (position: PositionType) => void
  movePiece: (from: PositionType, to: PositionType) => void
  getPiece: (position: PositionType) => Spot
  getBounds: () => [number, number]
}

export class Board implements IBoard {
  spots: Spots
  _row: number
  _col: number
  constructor() {
    this.spots = [[]]
    this._row = 8
    this._col = 8
    this.init()
  }

  private init() {
    this.setBoard()
  }

  createSpots() {
    for (let i = 0; i < this._row; i++) {
      this.spots[i] = []
      for (let j = 0; j < this._col; j++) {
        this.spots[i][j] = null
      }
    }
  }

  getSpots() {
    return this.spots
  }

  createPiece(piece: ISpecificPiece, position: PositionType) {
    const [col, row] = position
    this.spots[row][col] = piece
  }
  setBoard() {
    this.createSpots()

    /* White Pieces */
    this.createPiece(new Pawn(ColorType.WHITE), [0, 1])
    this.createPiece(new Pawn(ColorType.WHITE), [1, 1])
    this.createPiece(new Pawn(ColorType.WHITE), [2, 1])
    this.createPiece(new Pawn(ColorType.WHITE), [3, 1])
    this.createPiece(new Pawn(ColorType.WHITE), [4, 1])
    this.createPiece(new Pawn(ColorType.WHITE), [5, 1])
    this.createPiece(new Pawn(ColorType.WHITE), [6, 1])
    this.createPiece(new Pawn(ColorType.WHITE), [7, 1])

    /* Black Pieces */
    this.createPiece(new Pawn(ColorType.BLACK), [0, 6])
    this.createPiece(new Pawn(ColorType.BLACK), [1, 6])
    this.createPiece(new Pawn(ColorType.BLACK), [2, 6])
    this.createPiece(new Pawn(ColorType.BLACK), [3, 6])
    this.createPiece(new Pawn(ColorType.BLACK), [4, 6])
    this.createPiece(new Pawn(ColorType.BLACK), [5, 6])
    this.createPiece(new Pawn(ColorType.BLACK), [6, 6])
    this.createPiece(new Pawn(ColorType.WHITE), [7, 6])
  }

  getBounds(): [number, number] {
    return [this._row, this._col]
  }

  getPiece(position: PositionType): Spot {
    const [row, col] = position
    return this.getSpots()[row][col] ? this.getSpots()[row][col] : null
  }

  removePiece(position: PositionType) {
    const [x, y] = position
    this.spots[y][x] = null
  }

  movePiece(from: PositionType, to: PositionType) {
    const [fromX, fromY] = from
    const [toX, toY] = to
    console.log('from', this.spots[fromY][fromX])
    console.log('to', this.spots[toY][toX])
    if (this.spots[toY][toX] !== null) {
      this.removePiece([toY, toX])
    }
    this.spots[toY][toX] = this.spots[fromY][fromX]
    this.spots[fromY][fromX] = null
  }
}
