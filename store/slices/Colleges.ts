import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { baseUrl } from '../../utils/constants'
import type { AppDispatch } from '../ReduxStore'
import type { College, CollegeUpdate } from '../../utils/types'

export interface CollegesState {
  isLoading: boolean
  colleges: College[]
}

const collegesInitialState: CollegesState = {
  isLoading: false,
  colleges: [],
}

export const collegesSlice = createSlice({
  name: 'Colleges',
  initialState: collegesInitialState,
  reducers: {
    setCollegesState: (state, action: PayloadAction<College[]>) => {
      state.colleges = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    updateCollege: (state, action: PayloadAction<College>) => {
      const updateIndex = state.colleges.findIndex((item) => item.id === action.payload.id)
      state.colleges[updateIndex] = action.payload
    },
  },
})

export const { setCollegesState, setIsLoading, updateCollege } = collegesSlice.actions

export const asyncFetchColleges = () => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(setIsLoading(true))
    try {
      const colleges = await fetch(baseUrl + 'api/colleges', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await colleges.json()
      const newData: College[] = []
      data.forEach((item) => {
        const college: College = {
          id: item.id,
          name: item.name,
          isButteryIntegrated: item.isButteryIntegrated,
          daysOpen: item.daysOpen,
          openTime: item.openTime,
          closeTime: item.closeTime,
          isOpen: item.isOpen,
          isAcceptingOrders: item.isAcceptingOrders,
        }
        newData.push(college)
      })
      dispatch(setCollegesState(newData))
      return true
    } catch (e) {
      console.log(e)
      return false
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateCollege = (college: CollegeUpdate) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const buttery = await fetch(baseUrl + 'api/colleges/' + college.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(college),
      })
      const data = await buttery.json()
      dispatch(updateCollege(data))
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export const asyncGetCollegeTimes = (college: College) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(setIsLoading(true))
    try {
      const user = await fetch(baseUrl + 'api/colleges/' + college.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await user.json()
      dispatch(updateCollege(data))
      return true
    } catch (e) {
      console.log(e)
      return false
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export default collegesSlice.reducer
