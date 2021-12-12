import Scoreboard from '../../components/Scoreboard'
import React, { FC, useEffect, useState } from 'react'

import Default from '../../layouts/Default'

import styles from './styles.module.scss'

import { useAppSelector, useAppDispatch } from '../../store/TypedHooks'
import { getGamesWithUserStats } from '../../store/selectors'
import { asyncFetchUsers } from '../../store/slices/Users'
import { asyncFetchGames } from '../../store/slices/Games'
import { asyncFetchStats } from '../../store/slices/Stats'
import { asyncFetchCurrentUser } from 'store/slices/CurrentUser'
import classNames from 'classnames'

interface NavbarButtonProps {
  sport: string
  buttonType: string
  changeFn: () => void
}

/**
 * @returns Intramurals Dashboard component showing all the Intramural games,
 * as well as navbar to filter based on sport preference or matches that current user was involved in.
 */
const IntramuralsDashboard = () => {
  const dispatch = useAppDispatch()
  const { users, isLoading: isLoadingUsers } = useAppSelector((state) => state.users)
  const { games, isLoading: isLoadingGames } = useAppSelector((state) => state.games)
  const { stats, isLoading: isLoadingStats } = useAppSelector((state) => state.stats)
  const { currentUser, isLoading: isLoadingCurrentUser } = useAppSelector((state) => state.currentUser)
  const gamesWithUserStats = useAppSelector(getGamesWithUserStats)

  // Ask the redux store to call on backend and fetch users.
  useEffect(() => {
    if (users == null) {
      dispatch(asyncFetchUsers())
    }
  }, [dispatch, users])

  // Ask the redux store to call on backend and fetch games.
  useEffect(() => {
    if (games == null) {
      dispatch(asyncFetchGames())
    }
  }, [dispatch, games])

  // Ask the redux store to call on backend and fetch stats.
  useEffect(() => {
    if (stats == null) {
      dispatch(asyncFetchStats())
    }
  }, [dispatch, stats])

  // Ask the redux store to call on backend and fetch current user.
  useEffect(() => {
    if (!currentUser) {
      dispatch(asyncFetchCurrentUser())
    }
  }, [dispatch, currentUser])

  // Tracks what tab the intramural navbar should display.
  const [tabState, setTabState] = useState('Basketball')

  /**
   * Changes tabState to hold the type of matches that should be displayed on the intramurals page.
   * @param {string} str A sport to display / User matches.
   */
  const changeTabState = (str: string) => setTabState(str)

  // Change navbar state to display Basketball matches.
  function changeToBasketball() {
    changeTabState('Basketball')
  }

  // Change navbar state to display Football matches.
  function changeToFootball() {
    changeTabState('Football')
  }

  // Just to test styling.
  function changeToTest() {
    changeTabState('Test')
  }

  // Change navbar state to display matches containing the current user.
  function changeToMyUser() {
    changeTabState('User')
  }

  function filterGamesToTabs(tabState: string, gameWithUserStat, currentUser) {
    if (tabState === 'User') {
      return gameWithUserStat.userStats.filter((userStat) => userStat.user.netid === currentUser.netid).length > 0
    } else {
      return gameWithUserStat.game.sport == tabState
    }
  }

  function filterForPlayers(gameUserStatObj, isTeamOne: boolean) {
    return isTeamOne
      ? gameUserStatObj.userStats.filter((playerStatObj) => playerStatObj.user.college == gameUserStatObj.game.team1)
      : gameUserStatObj.userStats.filter((playerStatObj) => playerStatObj.user.college == gameUserStatObj.game.team2)
  }

  /**
   * @param {string} sport The sport/text to be displayed in the button.
   * @param {string} buttonType Whether it's the first, last, or middle button in the list of buttons.
   * @param {function} changeFn Function to change intramural navbar state.
   * @returns Button tab component on intramural navbar.
   */
  const NavbarButton = ({ sport, buttonType, changeFn }: NavbarButtonProps) => {
    return (
      <li>
        <button
          className={classNames(
            styles.tab,
            buttonType === 'first' ? styles.firstChild : buttonType === 'last' ? styles.lastChild : styles.normal,
            {
              [styles.highlighted]: tabState === sport,
            }
          )}
          onClick={changeFn}
        >
          <p style={{ fontWeight: 'bold' }}>{sport}</p>
        </button>
      </li>
    )
  }

  return (
    <div className={styles.scorePage}>
      <div className={styles.pageRow}>
        <div className={styles.twoCol}>
          <div className={styles.navbar}>
            <div className={styles.buttonHolder}>
              <ul className={styles.intramuralNavbar}>
                <NavbarButton sport={'Basketball'} buttonType={'first'} changeFn={changeToBasketball} />
                <NavbarButton sport={'Test'} buttonType={'normal'} changeFn={changeToTest} />
                <NavbarButton sport={'Football'} buttonType={'normal'} changeFn={changeToFootball} />
                <NavbarButton sport={'User'} buttonType={'last'} changeFn={changeToMyUser} />
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.sixCol}>
          {isLoadingUsers == true || isLoadingGames || isLoadingStats || isLoadingCurrentUser ? (
            <div>{'Loading...'}</div>
          ) : (
            gamesWithUserStats != null &&
            gamesWithUserStats
              .filter((gameWithUserStat) => filterGamesToTabs(tabState, gameWithUserStat, currentUser))
              .map((gameUserStat, i) => {
                const homePlayers = filterForPlayers(gameUserStat, true)
                const awayPlayers = filterForPlayers(gameUserStat, false)
                return (
                  <Scoreboard
                    showSport={tabState === 'User'}
                    key={i}
                    match={gameUserStat.game}
                    homePlayers={homePlayers}
                    awayPlayers={awayPlayers}
                  />
                )
              })
          )}
        </div>
        <div className={styles.twoCol}></div>
      </div>
    </div>
  )
}

const Intramurals: FC = () => {
  return (
    <Default>
      <IntramuralsDashboard />
    </Default>
  )
}

export default Intramurals
