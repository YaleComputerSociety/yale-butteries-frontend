import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getJSON, putJSON, postJSON } from 'utils/fetch'

export interface Stat {
  id: number
  points: number | null
  rebounds: number | null
  assists: number | null
  imgame_id: number
  user_id: number
  createdAt: Date
  updatedAt: Date
}

export interface StatsState {
  stats: Stat[] | null
  isLoading: boolean
}

const initialState: StatsState = {
  stats: null,
  isLoading: false,
}

export const statsSlice = createSlice({
  name: 'Stats',
  initialState,
  reducers: {
    setStatsState: (state, action: PayloadAction<Stat[]>) => {
      state.stats = action.payload
    },
    updateStat: (state, action: PayloadAction<Stat>) => {
      const statIndex = state.stats.findIndex((element) => element.id == action.payload.id)
      state.stats[statIndex] = action.payload
    },
    insertStat: (state, action: PayloadAction<Stat>) => {
      state.stats.push(action.payload)
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setStatsState, updateStat, insertStat, setIsLoading } = statsSlice.actions

export const asyncFetchStats = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const stats = await getJSON<Stat[]>('/api/stats')
      dispatch(setStatsState(stats))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asynceUpdateStat = (stat: Stat) => {
  return async (dispatch): Promise<void> => {
    try {
      // Spread operator is typescript hack.
      // See: https://stackoverflow.com/questions/60697214/how-to-fix-index-signature-is-missing-in-type-error
      const updatedStat = await putJSON('/api/stats', { ...stat })
      dispatch(updateStat(updatedStat.jsonBody))
    } catch (e) {
      console.log(e)
    }
  }
}

export const asynceInsertStat = (stat: Stat) => {
  return async (dispatch): Promise<void> => {
    try {
      const newStat = await postJSON('/api/stats', { ...stat })
      dispatch(insertStat(newStat.jsonBody))
    } catch (e) {
      console.log(e)
    }
  }
}

export default statsSlice.reducer
