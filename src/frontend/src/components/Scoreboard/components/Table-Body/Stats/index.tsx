import React from 'react'
import styles from './styles.module.scss'
import { userWithStat } from '../../../index'
import { PlayerTableProps } from '../../../index'

/**
 * @param {userWithStat[]} players List of players whose stats shall be displayed.
 * @returns The body of the table displaying the stats of players.
 */
const Stats = ({ players }: PlayerTableProps) => {
  return (
    <tbody>
      {players.length > 0 ? (
        players.map((player: userWithStat, index: number) => (
          <tr className={styles.headerRow} key={index}>
            <td>{player.user.name}</td>
            <td>{player.stat.points}</td>
            <td>{player.stat.rebounds}</td>
            <td>{player.stat.assists}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>{'No player stats available'}</td>
        </tr>
      )}
    </tbody>
  )
}

export default Stats
