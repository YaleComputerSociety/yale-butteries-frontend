import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/utils'
import { AppDispatch } from '../ReduxStore'

export interface CollegeTime {
  day: String
  openTime: String
  closeTime: String
}

export interface College {
  id: number
  buttery_activated: boolean
  times: CollegeTime[] | null
}

export interface CollegesState {
  isLoading: boolean
  colleges: College[] | null
}

const collegesInitialState: CollegesState = {
  isLoading: false,
  colleges: null
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
      const updateIndex = state.colleges.findIndex((item) => item.id == action.payload.id)
      state.colleges[updateIndex] = action.payload
    },
  },
  //getOneColleges time given a specific college id (for the manager side)
  //getAllColleges time with another function (for the customer butteryScreen)
  //updateOneCollege time as well give a specific college id (for saving changes on the manager side)
})

export const { setCollegesState, setIsLoading, updateCollege } = collegesSlice.actions


export const asyncFetchColleges = () => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(setIsLoading(true))
    try {
      const menuItems = await fetch(baseUrl + 'api/colleges', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await menuItems.json()
      const newData: College[] = []
      data.forEach((item) => {
        const college: College = {
          id: item.id,
          buttery_activated: item.buttery_activated, 
          times: item.times,
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

export const asyncUpdateCollege = (college: College) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(setIsLoading(true))
    try {
      const user = await fetch(baseUrl + 'api/colleges/' + college.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await user.json()
      dispatch(updateCollege(data))
    } catch (e) {
      console.log(e)
      return false
    } finally {
      dispatch(setIsLoading(false))
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
    } catch (e) {
      console.log(e)
      return false
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export default collegesSlice.reducer