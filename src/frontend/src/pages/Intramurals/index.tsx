import Scoreboard from '../../components/Scoreboard'
import React, { FC, useEffect, useState } from 'react'

import Default from '../../layouts/Default'

import styles from './styles.module.scss'

import { useAppSelector, useAppDispatch } from '../../store/TypedHooks'
import { getGamesWithUserStats } from '../../store/selectors'
import { asyncFetchUsers } from '../../store/slices/Users'
import { asyncFetchGames } from '../../store/slices/Games'
import { asyncFetchStats } from '../../store/slices/Stats'
import classNames from 'classnames'

const IntramuralsDashboard = () => {
  const dispatch = useAppDispatch()
  const { users, isLoading: isLoadingUsers } = useAppSelector((state) => state.users)
  const { games, isLoading: isLoadingGames } = useAppSelector((state) => state.games)
  const { stats, isLoading: isLoadingStats } = useAppSelector((state) => state.stats)
  const gamesWithUserStats = useAppSelector(getGamesWithUserStats)

  useEffect(() => {
    if (users == null) {
      dispatch(asyncFetchUsers())
    }
  }, [dispatch, users])

  useEffect(() => {
    if (games == null) {
      dispatch(asyncFetchGames())
    }
  }, [dispatch, games])

  useEffect(() => {
    if (stats == null) {
      dispatch(asyncFetchStats())
    }
  }, [dispatch, stats])

  const [tabState, setTabState] = useState('Basketball')

  const changeTabState = (str: string) => setTabState(str)
  function changeToBasketball() {
    changeTabState('Basketball')
  }
  function changeToFootball() {
    changeTabState('Football')
  }

  // const TEAMONEGAMEONE = [
  //   {
  //     user_id: 1,
  //     imgame_id: 1,
  //     rebounds: 5,
  //     assists: 6,
  //     points: 3,
  //     id: 1,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  //   {
  //     user_id: 2,
  //     imgame_id: 1,
  //     rebounds: 12,
  //     assists: 9,
  //     points: 3,
  //     id: 2,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  // ]

  // const TEAMTWOGAMEONE = [
  //   {
  //     user_id: 3,
  //     imgame_id: 1,
  //     rebounds: 5,
  //     assists: 6,
  //     points: 3,
  //     id: 3,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  //   {
  //     user_id: 4,
  //     imgame_id: 1,
  //     rebounds: 5,
  //     assists: 6,
  //     points: 3,
  //     id: 4,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  // ]

  // const TEAMONEGAMETWO = [
  //   {
  //     user_id: 5,
  //     imgame_id: 2,
  //     rebounds: 5,
  //     assists: 6,
  //     points: 3,
  //     id: 5,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  //   {
  //     user_id: 6,
  //     imgame_id: 2,
  //     rebounds: 5,
  //     assists: 6,
  //     points: 3,
  //     id: 6,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  // ]

  // const TEAMTWOGAMETWO = [
  //   {
  //     user_id: 7,
  //     imgame_id: 2,
  //     rebounds: 15,
  //     assists: 6,
  //     points: 37,
  //     id: 7,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  //   {
  //     user_id: 8,
  //     imgame_id: 2,
  //     rebounds: 12,
  //     assists: 9,
  //     points: 3,
  //     id: 8,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  // ]

  // const matches = [
  //   {
  //     gameInfo: {
  //       team_1_score: 21,
  //       team_2_score: 17,
  //       date: 'Mon, Jan 20',
  //       sport: 'Basketball',
  //       team1: 'Davenport',
  //       team2: 'Branford',
  //       id: 1,
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //     },
  //     homePlayers: TEAMONEGAMEONE,
  //     awayPlayers: TEAMTWOGAMEONE,
  //   },
  //   {
  //     gameInfo: {
  //       team_1_score: 25,
  //       team_2_score: 30,
  //       date: 'Tue, Jan 21',
  //       sport: 'Football',
  //       team1: 'Franklin',
  //       team2: 'Branford',
  //       id: 2,
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //     },
  //     homePlayers: TEAMONEGAMETWO,
  //     awayPlayers: TEAMTWOGAMETWO,
  //   },
  // ]

  return (
    <div className={styles.scorePage}>
      <div className={styles.pageRow}>
        <div className={styles.twoCol}>
          <div className={styles.testIT}>
            <div className={styles.buttonHolder}>
              <ul style={{ listStyleType: 'none', textAlign: 'right' }}>
                <li>
                  <button
                    className={classNames(styles.tab, styles.firstChild, {
                      [styles.highlighted]: tabState === 'Basketball',
                    })}
                    onClick={changeToBasketball}
                  >
                    <p style={{ fontWeight: 'bold' }}>{'Basketball'}</p>
                  </button>
                </li>
                <li>
                  <button className={classNames(styles.tab, styles.normal)}>
                    <p style={{ fontWeight: 'bold' }}>{'TEST'}</p>
                  </button>
                </li>
                <li>
                  <button
                    className={classNames(styles.tab, styles.lastChild, {
                      [styles.highlighted]: tabState === 'Football',
                    })}
                    onClick={changeToFootball}
                  >
                    <p style={{ fontWeight: 'bold' }}>{'Football'}</p>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.eightCol}>
          {isLoadingUsers == true || isLoadingGames || isLoadingStats ? (
            <div>{'Loading...'}</div>
          ) : (
            // gamesWithUserStats != null &&
            // gamesWithUserStats.map((gameWithUserStats) => {
            //   return (
            //     <ul key={gameWithUserStats.game.id}>
            //       <li>{`${gameWithUserStats.game.team1} vs ${gameWithUserStats.game.team2}`}</li>
            //       {gameWithUserStats.userStats.map((userStat) => {
            //         return (
            //           <>
            //             <li>{`Player ${userStat.user.name}`}</li>
            //             <li>{`Points: ${userStat.stat.points}`}</li>
            //             <li>{`Rebounds: ${userStat.stat.rebounds}`}</li>
            //             <li>{`Assists: ${userStat.stat.assists}`}</li>
            //           </>
            //         )
            //       })}
            //     </ul>
            //   )
            // })
            gamesWithUserStats != null &&
            gamesWithUserStats
              .filter((gameWithUserStat) => gameWithUserStat.game.sport == tabState)
              .map((gameUserStat, i) => {
                const homePlayers = gameUserStat.userStats.filter(
                  (userStat) => userStat.user.college == gameUserStat.game.team1
                )
                const awayPlayers = gameUserStat.userStats.filter(
                  (userStat) => userStat.user.college == gameUserStat.game.team2
                )
                // console.log(homePlayers)
                // console.log(awayPlayers)
                // console.log(gameUserStat)
                // return <div key={i}>{tabState}</div>
                return (
                  <Scoreboard key={i} match={gameUserStat.game} homePlayers={homePlayers} awayPlayers={awayPlayers} />
                )
              })
          )}
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
