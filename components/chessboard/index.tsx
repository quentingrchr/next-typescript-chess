import React from 'react'
import s from './styles.module.scss'
import { Board } from '../../models/Board'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { PositionType } from '@types'

export type IProps = {}

const XCoord = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
export default function Chessboard(props: IProps) {
  const [board, setBoard] = useState<Board>(new Board())
  const [select, setSelect] = useState<PositionType | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<PositionType[] | null>(
    null
  )
  const [to, setTo] = useState<PositionType | null>(null)

  function computeIndication() {
    if (select === null && to === null) return 'Select a piece'
    if (select !== null && to === null) return 'Select a destination'
    if (select !== null && to !== null) return 'Moving the piece'
  }

  function updateBoard() {
    let clone = Object.assign(
      Object.create(Object.getPrototypeOf(board)),
      board
    )
    setBoard(clone)
  }

  function selectPiece(position: PositionType) {
    console.log('selectPiece', position)
    const piece = board.getPiece(position)

    if (!piece) return
    const side = piece.getPieceSide()
    if (side !== board._playerTurn) return
    setSelect(position)
  }

  function resetSelection() {
    setSelect(null)
    setPossibleMoves(null)
  }

  function handleClick(position: PositionType) {
    if (select === null) {
      selectPiece(position)
    } else if (select !== null) {
      board.playTurn(select, position)
      resetSelection()
    }
    updateBoard()
  }

  useEffect(() => {
    console.log('board', board.getSpots())
  }, [board])

  useEffect(() => {
    if (select !== null) {
      const piece = board.getPiece(select)
      if (!piece) return
      const possibleMoves = piece.getPossibleMovesFromPosition(board, select)
      setPossibleMoves(possibleMoves)
    }
  }, [select])

  useEffect(() => {
    console.log('Selected position from user', select)
  }, [select, to, board])

  return (
    <div className={s.container}>
      <div
        className={cn(s.infos, {
          [s.white]: board._playerTurn === 'WHITE',
          [s.black]: board._playerTurn === 'BLACK',
        })}
      >
        <p className={s.number}>{board._turnNb}</p>
        <p className={cn(s.indications)}>{computeIndication()}</p>
        <p>{board._playerTurn}</p>
      </div>
      <div className={s.board}>
        {board.getSpots().map((row, y) =>
          row.map((spot, x) => (
            <div
              key={`${y}${x}`}
              className={cn(s.cell, {
                [s.black]: (y + x) % 2 === 0,
                [s.selected]:
                  select !== null && select[0] === x && select[1] === y,
                [s.possible]: possibleMoves?.some((pos: PositionType) => {
                  return pos[0] === x && pos[1] === y
                }),
              })}
              onClick={() => handleClick([x, y])}
            >
              {spot !== null && (
                <img
                  src={`/pieces/${spot?.getImageName()}.svg`}
                  alt={`${spot?.getImageName()}`}
                />
              )}
              <span className={s.coord}>{`[${x},${y}]`}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
