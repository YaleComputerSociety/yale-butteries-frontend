import React, { FC, useState } from 'react'

import styles from './styles.module.scss'
import classnames from 'classnames'

import { Game, Stat } from '../../../../controllers/ControllerInterfaces'

interface ScoreboardProps {
  match: Game
  homePlayers: Stat[]
  awayPlayers: Stat[]
}

interface PlayerTableProps {
  players: Stat[]
}

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

const TableBody = ({ players }: PlayerTableProps) => {
  return (
    <tbody>
      {players.map((player: Stat, index: number) => (
        <tr key={index}>
          <td>{player.user_id}</td>
          <td>{player.points}</td>
          <td>{player.rebounds}</td>
          <td>{player.assists}</td>
        </tr>
      ))}
    </tbody>
  )
}

const PlayerTable = ({ players }: PlayerTableProps) => (
  <table className={styles.scoreTable}>
    <HeaderRow />
    <TableBody players={players} />
  </table>
)

const Scoreboard: FC<ScoreboardProps> = ({ match, homePlayers, awayPlayers }: ScoreboardProps) => {
  const [open, setOpen] = useState(false)
  const [isHome, setIsHome] = useState(true)

  const changeTeamStatus = (isHomeTeam: boolean) => setIsHome(isHomeTeam)
  function changeToHome() {
    changeTeamStatus(true)
  }
  function changeToAway() {
    changeTeamStatus(false)
  }

  function changeCollapseStatus() {
    setOpen(!open)
  }

  return (
    <div className={styles.scoreboard}>
      {/*eslint-disable-next-line jsx-a11y/no-static-element-interactions*/}
      <section className={styles.scoreDisplay} onClick={changeCollapseStatus}>
        <div className={styles.scoreIntroduction}>
          <p>{match.sport}</p>
          <p>{match.date}</p>
        </div>
        <div className={styles.scoreResult}>
          <div className={styles.teamAndIcon}>
            <img
              className={styles.logo}
              alt="Residential College Logo"
              src="https://upload.wikimedia.org/wikipedia/en/3/30/Branford_College_shield.png"
            />
            <h6>{match.teamOne}</h6>
          </div>
          <h3>{match.team_1_score}</h3>
          <h3>{' - '}</h3>
          <h3>{match.team_2_score}</h3>
          <div className={styles.teamAndIcon}>
            <img
              className={styles.logo}
              alt="Residential College Logo"
              src="https://upload.wikimedia.org/wikipedia/en/b/b3/Davenportshield.png"
            />
            <h6>{match.teamTwo}</h6>
          </div>
        </div>
      </section>
      <div
        className={classnames(styles.collapseContent, open ? styles.expanded : styles.collapsed)}
        aria-expanded={open}
      >
        <div>
          <div className={styles.tabMenu}>
            <button onClick={changeToHome} className={isHome ? styles.focus : ''}>
              {' Home '}
            </button>
            <button onClick={changeToAway} className={isHome ? '' : styles.focus}>
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
