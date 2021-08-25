import React, { FC, useState } from 'react'

import styles from './styles.module.scss'

import { Game } from '../../store/slices/Games'
import { User } from '../../store/slices/Users'
import { Stat } from '../../store/slices/Stats'
import DownArrow from 'svgs/DownArrow'
import classNames from 'classnames'

interface userWithStat {
  user: User
  stat: Stat
}

interface ScoreboardProps {
  match: Game
  homePlayers: userWithStat[]
  awayPlayers: userWithStat[]
}

interface PlayerTableProps {
  players: userWithStat[]
}

const collegeImageMap = {
  'Ezra Stiles': 'https://upload.wikimedia.org/wikipedia/en/b/b7/EzraStilesshield.png',
  Branford: 'https://upload.wikimedia.org/wikipedia/en/3/30/Branford_College_shield.png',
  Davenport: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Davenportshield.png',
  Morse: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Morseshield.png',
  Pierson: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Piersonshield.png/280px-Piersonshield.png',
  Berkeley: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Berkeleyshield.png/280px-Berkeleyshield.png',
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
            <img className={styles.logo} alt="Home Residential College Logo" src={collegeImageMap[match.team1]} />
            <h4>{match.team1}</h4>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxWidth: '20%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '50%' }}>
              <h1>{match.team_1_score}</h1>
              <h3>{' - '}</h3>
              <h1>{match.team_2_score}</h1>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '50%' }}>
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
            <button onClick={changeToHome}>{' Home '}</button>
            <button onClick={changeToAway}>{' Away '}</button>
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
