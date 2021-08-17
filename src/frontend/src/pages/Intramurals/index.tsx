import Scoreboard from '../../components/Scoreboard'
import React, { FC } from 'react'

import Default from '../../layouts/Default'

import styles from './styles.module.scss'

const IntramuralsDashboard = () => {
  const TEAMONEGAMEONE = [
    {
      user_id: 1,
      imgame_id: 1,
      rebounds: 5,
      assists: 6,
      points: 3,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 2,
      imgame_id: 1,
      rebounds: 12,
      assists: 9,
      points: 3,
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const TEAMTWOGAMEONE = [
    {
      user_id: 3,
      imgame_id: 1,
      rebounds: 5,
      assists: 6,
      points: 3,
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 4,
      imgame_id: 1,
      rebounds: 5,
      assists: 6,
      points: 3,
      id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const TEAMONEGAMETWO = [
    {
      user_id: 5,
      imgame_id: 2,
      rebounds: 5,
      assists: 6,
      points: 3,
      id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 6,
      imgame_id: 2,
      rebounds: 5,
      assists: 6,
      points: 3,
      id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const TEAMTWOGAMETWO = [
    {
      user_id: 7,
      imgame_id: 2,
      rebounds: 15,
      assists: 6,
      points: 37,
      id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 8,
      imgame_id: 2,
      rebounds: 12,
      assists: 9,
      points: 3,
      id: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const matches = [
    {
      gameInfo: {
        team_1_score: 21,
        team_2_score: 17,
        date: 'Mon, Jan 20',
        sport: 'Basketball',
        teamOne: 'Davenport',
        teamTwo: 'Branford',
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      homePlayers: TEAMONEGAMEONE,
      awayPlayers: TEAMTWOGAMEONE,
    },
    {
      gameInfo: {
        team_1_score: 25,
        team_2_score: 30,
        date: 'Tue, Jan 21',
        sport: 'Basketball',
        teamOne: 'Franklin',
        teamTwo: 'Branford',
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      homePlayers: TEAMONEGAMETWO,
      awayPlayers: TEAMTWOGAMETWO,
    },
  ]

  return (
    <div className={styles.scorePage}>
      <div className={styles.pageRow}>
        <div className={styles.twoCol}>{'TEST'}</div>
        <div className={styles.eightCol}>
          {matches.map((match, i) => (
            <Scoreboard
              key={i}
              match={match.gameInfo}
              homePlayers={match.homePlayers}
              awayPlayers={match.awayPlayers}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// const Inner: FC = () => {
//   return <IntramuralsDashboard />
// }

const Intramurals: FC = () => {
  return (
    <Default>
      <IntramuralsDashboard />
    </Default>
  )
}

export default Intramurals
