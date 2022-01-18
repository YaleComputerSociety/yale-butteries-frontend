import React from 'react'
import Registration from './Registration'
import { PlayerTableProps } from '../../index'
import Stats from '../Table-Body/Stats'

const TableBody = ({ players, game }: PlayerTableProps) => {
  return (
    <>
      {new Date(game.date) > new Date(2021, 10, 30) ? (
        <Registration players={players} game={game} />
      ) : (
        <Stats players={players} />
      )}
    </>
  )
}

export default TableBody
