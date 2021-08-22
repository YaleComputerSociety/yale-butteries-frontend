import { createSelector } from '@reduxjs/toolkit'
import { EventOccurrence } from './slices/EventOccurrences'
import { Event } from './slices/Events'
import { Stat } from './slices/Stats'
import { User } from './slices/Users'
import { Game } from './slices/Games'
import { UserEventOccurrence } from './slices/UsersEventOccurrences'

interface EventOccurrenceWithEvent {
  eventOccurrence: EventOccurrence
  event: Event
}

const getEventOccurrences = (state) => state.eventOccurrences.eventOccurrences
const getEvents = (state) => state.events.events

export const getEventOccurrencesWithEvents = createSelector(
  [getEventOccurrences, getEvents],
  (eventOccurrences: EventOccurrence[], events: Event[]): EventOccurrenceWithEvent[] | null => {
    if (eventOccurrences == null || events == null) {
      return null
    }
    return eventOccurrences.map((eventOccurrence) => {
      const eventIndex = events.findIndex((singleEvent) => singleEvent.id == eventOccurrence.event_id)
      return {
        eventOccurrence: eventOccurrence,
        event: events[eventIndex],
      }
    })
  }
)

interface userWithStat {
  user: User
  stat: Stat
}

interface gameWithUserStats {
  game: Game
  userStats: userWithStat[]
}

const getGames = (state) => state.games.games
const getUsers = (state) => state.users.users
const getStats = (state) => state.stats.stats

export const getGamesWithUserStats = createSelector(
  [getGames, getUsers, getStats],
  (games: Game[], users: User[], stats: Stat[]): gameWithUserStats[] | null => {
    if (games == null || users == null || stats == null) {
      return null
    }
    return games.map((game) => {
      const gameStats = stats.filter((stat) => stat.imgame_id == game.id)
      const usersWithStats: userWithStat[] = gameStats.map((stat) => {
        const user = users.find((user) => user.id == stat.user_id)
        return {
          user: user,
          stat: stat,
        }
      })
      return {
        game: game,
        userStats: usersWithStats,
      }
    })
  }
)

interface UserEventOccurrenceWithUser {
  userEventOccurrence: UserEventOccurrence
  user: User
}

const getUsersEventOccurrences = (state) => {
  return state.usersEventOccurrences
}

export const getUsersWithUsersEventOccurrences = createSelector(
  [getUsers, getUsersEventOccurrences],
  (users: User[], usersEventOccurrences: UserEventOccurrence[]): UserEventOccurrenceWithUser[] | null => {
    return usersEventOccurrences.map((userEventOccurrence) => {
      const userIndex = users.findIndex((user) => user.id == userEventOccurrence.user_id)
      return {
        userEventOccurrence: userEventOccurrence,
        user: users[userIndex],
      }
    })
  }
)
