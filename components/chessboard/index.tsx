import React from 'react'
import s from './styles.module.scss'
import { Board } from '../../models/Board'
import { useEffect, useState } from 'react'
import cn from 'classnames'

export type IProps = {}

const XCoord = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
export default function Chessboard(props: IProps) {
  const [board, setBoard] = useState<Board>(new Board())
  const [counter, setCounter] = useState(0)

  function handleClick() {
    if (counter === 0) {
      console.log('move 1')
      board.movePiece([0, 1], [0, 2])
      setCounter(counter + 1)
    }
    if (counter === 1) {
      console.log('move 2')
      board.movePiece([0, 2], [0, 1])
      setCounter(counter + 1)
    }
    if (counter >= 2) {
      setCounter(0)
    }
  }

  useEffect(() => {
    console.log('counter', counter)
    console.log('board', board.getSpots())
  }, [board])

  return (
    <div className={s.container} onClick={handleClick}>
      <div className={s.board}>
        {board.getSpots().map((row, i) =>
          row.map((spot, j) => (
            <div
              key={`${i}${j}`}
              className={cn(s.cell, {
                [s.black]: (i + j) % 2 === 0,
              })}
            >
              {spot !== null && (
                <img
                  src={`/pieces/${spot?.getImageName()}.svg`}
                  alt={`${spot?.getImageName()}`}
                />
              )}
              <span className={s.coord}>{`${i + 1}${XCoord[j]}`}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
