import React from 'react'
import styles from './styles.module.scss'
import { PlayerTableProps } from '../../index'
import TableBody from '../Table-Body'

/**
 * @param {userWithStat[]} players List of players whose stats shall be displayed.
 * @returns Table that displays stats of players in a team.
 */
const PlayerTable = ({ players }: PlayerTableProps) => (
  <table className={styles.scoreTable}>
    {
      //<HeaderRow />
    }
    <TableBody players={players} />
  </table>
)

export default PlayerTable
