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
  _playerTurn: ColorType
  _turnNb: number
  _spots: Spots
  _row: number
  _col: number
  setBoard: () => void
  createSpots: () => void
  getSpots: () => Spots
  getSpot: (position: PositionType) => Spot
  getSideOnSpot: (position: PositionType) => ColorType | false
  createPiece: (piece: ISpecificPiece, position: PositionType) => void
  removePiece: (position: PositionType) => void
  movePiece: (from: PositionType, to: PositionType) => void
  getPlayerTurn: () => ColorType
  getTurnNb: () => number
  getPiece: (position: PositionType) => Spot
  getBounds: () => [number, number]
  endTurn: () => void
  playTurn: (from: PositionType, to: PositionType) => boolean
}

export class Board implements IBoard {
  _playerTurn: ColorType = ColorType.WHITE
  _turnNb = 0
  _spots: Spots
  _row: number
  _col: number
  constructor() {
    this._playerTurn = ColorType.WHITE
    this._spots = [[]]
    this._row = 8
    this._col = 8
    this.init()
  }

  private init() {
    this.setBoard()
  }

  createSpots() {
    for (let i = 0; i < this._row; i++) {
      this._spots[i] = []
      for (let j = 0; j < this._col; j++) {
        this._spots[i][j] = null
      }
    }
  }

  /**
    Get the board spots
    @returns {Spots}
   */
  getSpots(): Spots {
    return this._spots
  }

  /**
   * Get a specific spot
   * @param {PositionType} position
   * @returns {Spot}
   */
  getSpot(position: PositionType): Spot {
    const [x, y] = position
    return this._spots[y][x]
  }

  /**
   * Get the side on a specific spot
   * @param {PositionType} position
   * @returns {ColorType | false}
   * @example
   */
  getSideOnSpot(position: PositionType): ColorType | false {
    const spot = this.getSpot(position)
    if (!spot) return false
    return spot.getPieceSide()
  }

  /**
   * Create a specific piece and place it on the board
   * @param {ISpecificPiece} piece
   * @param {PositionType} position
   */
  createPiece(piece: ISpecificPiece, position: PositionType) {
    const [col, row] = position
    this._spots[row][col] = piece
  }

  /**
   * Set initial board state, with pieces in their starting positions
   */
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

  /**
   * Get the bounds of the board (max row, max columns)
   * @returns {[number, number]} [number, number]
   */
  getBounds(): [number, number] {
    return [this._row, this._col]
  }

  /**
   * Get a piece of the board
   * @param {[PositionType]} position PositionType Array
   * @returns {Spot} Spot
   */
  getPiece(position: PositionType): Spot {
    const [x, y] = position
    return this.getSpots()[y][x] ? this.getSpots()[y][x] : null
  }

  /**
   * Get the color of the player whose turn it is
   */
  getPlayerTurn(): ColorType {
    return this._playerTurn
  }

  /**
   * Get the turn number
   * @returns {number} number
   */
  getTurnNb(): number {
    return this._turnNb
  }

  /**
   * Remove a piece of the board
   * @param {[PositionType]} position PositionType Array
   */
  removePiece(position: PositionType) {
    const [x, y] = position
    this._spots[y][x] = null
  }

  /**
   * Move a piece of the board from one position to another
   * @param {[PositionType]} from PositionType Array
   * @param {[PositionType]} to PositionType Array
   */
  movePiece(from: PositionType, to: PositionType) {
    const [fromX, fromY] = from
    const [toX, toY] = to
    const pieceToMove = this._spots[fromY][fromX]
    if (!pieceToMove) return

    if (this._spots[toY][toX] !== null) {
      this.removePiece([toY, toX])
    }
    this._spots[toY][toX] = pieceToMove
    this._spots[fromY][fromX] = null
    if (pieceToMove.getHasNotMoved()) {
      pieceToMove.setHasNotMoved(false)
    }
  }

  /**
   * Play a turn
   * @param {[PositionType]} from PositionType Array
   * @param {[PositionType]} to PositionType Array
   * @returns {boolean} true if the turn is valid, false otherwise
   */
  playTurn(from: PositionType, to: PositionType): boolean {
    const [fromX, fromY] = from
    const piece = this._spots[fromY][fromX]
    if (!piece) return false
    const pieceSide = piece.getPieceSide()
    if (pieceSide !== this._playerTurn) return false
    if (!piece.canMove(this, { from, to })) return false
    const destinationPiece = this.getPiece(to)
    if (destinationPiece && pieceSide !== destinationPiece.getPieceSide()) {
      destinationPiece.setIsKilled(true)
      this.removePiece(to)
    }

    this.movePiece(from, to)
    this.endTurn()
    return true
  }

  /**
   * End the current turn
   * @returns {ColorType} Color of the next turn
   */
  endTurn(): ColorType {
    this._playerTurn =
      this._playerTurn === ColorType.WHITE ? ColorType.BLACK : ColorType.WHITE
    this._turnNb++
    return this._playerTurn
  }
}
