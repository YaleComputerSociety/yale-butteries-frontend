import React, { FC, useState } from 'react'

import styles from './styles.module.scss'

// Various store slices.
import { Game } from '../../store/slices/Games'
import { User } from '../../store/slices/Users'
import { Stat } from '../../store/slices/Stats'

import DownArrow from 'svgs/DownArrow'
import classNames from 'classnames'

/**
 * The following are typescript interfaces for components in this document.
 */
interface userWithStat {
  user: User
  stat: Stat
}

interface ScoreboardProps {
  showSport: boolean
  match: Game
  homePlayers: userWithStat[]
  awayPlayers: userWithStat[]
}

interface PlayerTableProps {
  players: userWithStat[]
}

// Object that maps college names with its logo.
const collegeImageMap = {
  'Ezra Stiles': 'https://upload.wikimedia.org/wikipedia/en/b/b7/EzraStilesshield.png',
  Branford: 'https://upload.wikimedia.org/wikipedia/en/3/30/Branford_College_shield.png',
  Davenport: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Davenportshield.png',
  Morse: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Morseshield.png',
  Pierson: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Piersonshield.png/280px-Piersonshield.png',
  Berkeley: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Berkeleyshield.png/280px-Berkeleyshield.png',
}

// Header component of the table.
// TODO: Make dynamic [In other words: Capable of handling stats for different sports]
const HeaderRow = () => {
  const header = ['Player', 'Rebounds', 'Assists', 'Points']
  return (
    <thead>
      <tr>
        {header.map((h, index) => (
          <th key={index}>
            <p>{h}</p>
          </th>
        ))}
      </tr>
    </thead>
  )
}

/**
 * @param {userWithStat[]} players List of players whose stats shall be displayed.
 * @returns The body of the table displaying the stats of players.
 */
const TableBody = ({ players }: PlayerTableProps) => {
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

/**
 * @param {userWithStat[]} players List of players whose stats shall be displayed.
 * @returns Table that displays stats of players in a team.
 */
const PlayerTable = ({ players }: PlayerTableProps) => (
  <table className={styles.scoreTable}>
    <HeaderRow />
    <TableBody players={players} />
  </table>
)

/**
 * @param {boolean} showSport Whether to show the sport in the scoreboard.
 * @param {Game} match A match instance.
 * @param {userWithStat[]} homePlayers An array of player users for team one with stats included for each player.
 * @param {userWithStat[]} awayPlayers An array of players users for team two with stats included for each player.
 * @returns Scoreboard component displaying statistics of the players participating in the match.
 */
const Scoreboard: FC<ScoreboardProps> = ({ showSport, match, homePlayers, awayPlayers }: ScoreboardProps) => {
  const [open, setOpen] = useState(false)
  const [isHome, setIsHome] = useState(true)

  /**
   * @param {boolean} isHomeTeam Whether we are displaying the stats of team one players or not.
   * @returns Changes to whether or not home team [team one]'s player stats should be displayed.
   */
  const changeTeamStatus = (isHomeTeam: boolean) => setIsHome(isHomeTeam)

  // Scoreboard should now display team one players.
  function changeToHome() {
    changeTeamStatus(true)
  }

  // Scoreboard should now display team two players.
  function changeToAway() {
    changeTeamStatus(false)
  }

  // Scoreboard should flip status of whether or not it displays the player stats.
  function changeCollapseStatus() {
    setOpen(!open)
  }

  return (
    <div className={styles.scoreboard}>
      {/*eslint-disable-next-line jsx-a11y/no-static-element-interactions*/}
      <section className={styles.scoreDisplay} onClick={changeCollapseStatus}>
        <div className={styles.scoreIntroduction}>
          {showSport ? <p>{match.sport}</p> : <></>}
          <p>{match.date}</p>
        </div>
        <div className={styles.scoreResult}>
          <div className={styles.teamAndIcon}>
            <img className={styles.logo} alt="Home Residential College Logo" src={collegeImageMap[match.team1]} />
            <h4>{match.team1}</h4>
          </div>
          <div className={styles.scoreColumn}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>
                <h1 style={{ fontSize: '2.25em' }}>{match.team_1_score}</h1>
              </div>
              <div>
                <h1 style={{ fontSize: '2.25em' }}>{' - '}</h1>
              </div>
              <div>
                <h1 style={{ fontSize: '2.25em' }}>{match.team_2_score}</h1>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <DownArrow className={classNames(styles.test, { [styles.open]: open })} />
            </div>
          </div>
          <div className={styles.teamAndIcon}>
            <img className={styles.logo} alt="Away Residential College Logo" src={collegeImageMap[match.team2]} />
            <h4>{match.team2}</h4>
          </div>
        </div>
      </section>
      <div
        className={classNames(styles.collapseContent, open ? styles.expanded : styles.collapsed)}
        aria-expanded={open}
      >
        <div>
          <div className={styles.tabMenu}>
            <button className={classNames(styles.tabButton, styles.home)} onClick={changeToHome}>
              {' Home '}
            </button>
            <button className={classNames(styles.tabButton, styles.away)} onClick={changeToAway}>
              {' Away '}
            </button>
          </div>
          <div>
            <PlayerTable players={isHome ? homePlayers : awayPlayers} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scoreboard
