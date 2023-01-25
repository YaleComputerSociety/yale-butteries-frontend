import React from 'react'
import styles from './styles.module.scss'
import { PlayerTableProps } from '../../index'
import TableBody from '../Table-Body'
import HeaderRow from '../Header-Row'

/**
 * @param {userWithStat[]} players List of players whose stats shall be displayed.
 * @returns Table that displays stats of players in a team.
 */
const PlayerTable = ({ players, game }: PlayerTableProps) => (
  <table className={styles.scoreTable}>
    {new Date(game.date) > new Date(2021, 10, 30) ? <> </> : <HeaderRow />}
    <TableBody players={players} game={game} />
  </table>
)

export default PlayerTable
