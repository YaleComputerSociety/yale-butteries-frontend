import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getJSON, putJSON, postJSON } from 'utils/fetch'

export interface Game {
  id: number
  team_1_score: number
  team_2_score: number
  date: string
  sport: string
  team1: string
  team2: string
  createdAt: Date
  updatedAt: Date
}

export interface GamesState {
  games: Game[] | null
  isLoading: boolean
}

const initialState: GamesState = {
  games: null,
  isLoading: false,
}

export const gamesSlice = createSlice({
  name: 'Games',
  initialState,
  reducers: {
    setGamesState: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload
    },
    updateGame: (state, action: PayloadAction<Game>) => {
      const gameIndex = state.games.findIndex((element) => element.id == action.payload.id)
      state.games[gameIndex] = action.payload
    },
    insertGame: (state, action: PayloadAction<Game>) => {
      state.games.push(action.payload)
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setGamesState, updateGame, insertGame, setIsLoading } = gamesSlice.actions

export const asyncFetchGames = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const games = await getJSON<Game[]>('/api/games')
      dispatch(setGamesState(games))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

// WARNING: FUNCTIONS NOT CURRENTLY SUPPORTED ON BACKEND
export const asynceUpdateGame = (game: Game) => {
  return async (dispatch): Promise<void> => {
    try {
      // Spread operator is typescript hack.
      // See: https://stackoverflow.com/questions/60697214/how-to-fix-index-signature-is-missing-in-type-error
      const updatedGame = await putJSON('/api/games', { ...game })
      dispatch(updateGame(updatedGame.jsonBody))
    } catch (e) {
      console.log(e)
    }
  }
}

export const asynceInsertGame = (game: Game) => {
  return async (dispatch): Promise<void> => {
    try {
      const newGame = await postJSON('/api/games', { ...game })
      dispatch(insertGame(newGame.jsonBody))
    } catch (e) {
      console.log(e)
    }
  }
}

export default gamesSlice.reducer
