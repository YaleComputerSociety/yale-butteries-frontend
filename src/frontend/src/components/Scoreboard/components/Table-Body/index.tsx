import React from 'react'
import Registration from './Registration'
import { PlayerTableProps } from '../../index'
//import Stats from '../Table-Body/Stats'

const TableBody = ({ players, game }) => {
  return <Registration players={players} game={game} />
}

export default TableBody
