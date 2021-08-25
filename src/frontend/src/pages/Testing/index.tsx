import React, { FC, useEffect } from 'react'

import { useAppSelector, useAppDispatch } from 'store/TypedHooks'
import { getGamesWithUserStats } from 'store/selectors'
import { asyncFetchUsers } from 'store/slices/Users'
import { asyncFetchGames } from 'store/slices/Games'
import { asyncFetchStats } from 'store/slices/Stats'

import Default from 'layouts/Default'

const Inner: FC = () => {
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

  return (
    <>
      {/* {eventOccurrences == null && <button onClick={loadData}>{'Api Call'}</button>} */}
      {isLoadingUsers == true || isLoadingGames || isLoadingStats ? (
        <div>{'Loading...'}</div>
      ) : (
        gamesWithUserStats != null &&
        gamesWithUserStats.map((gameWithUserStats) => {
          console.log(gameWithUserStats)
          return (
            <ul key={gameWithUserStats.game.id}>
              <li>{`${gameWithUserStats.game.team1} vs ${gameWithUserStats.game.team2}`}</li>
              {gameWithUserStats.userStats.map((userStat) => {
                return (
                  <>
                    <li>{`Player ${userStat.user.name}`}</li>
                    <li>{`Points: ${userStat.stat.points}`}</li>
                    <li>{`Rebounds: ${userStat.stat.rebounds}`}</li>
                    <li>{`Assists: ${userStat.stat.assists}`}</li>
                  </>
                )
              })}
            </ul>
          )
        })
      )}
    </>
  )
}

const Testing: FC = () => {
  return (
    <Default>
      <Inner />
    </Default>
  )
}

export default Testing
