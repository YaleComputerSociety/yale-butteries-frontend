import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/utils'
import { AppDispatch } from '../../store/ReduxStore'

// import { getJSON } from 'utils/fetch'

import { User } from './Users'

export interface CurrentUserState {
  currentUser: User | null
  isLoading: boolean
}

const currentUserInitialState: CurrentUserState = {
  currentUser: null,
  isLoading: false,
}

export const currentUserSlice = createSlice({
  name: 'CurrentUser',
  initialState: currentUserInitialState,
  reducers: {
    setCurrentUserState: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setCurrentUserState, setIsLoading } = currentUserSlice.actions

export const asyncFetchUser = (id: number) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const user = await fetch(baseUrl + 'api/users/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await user.json()
      dispatch(setCurrentUserState(data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateCurrentUser = (currentUser: User) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const updatedUser = await fetch(baseUrl + 'api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      })
      const data = await updatedUser.json()
      dispatch(setCurrentUserState(data))
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
}

export default currentUserSlice.reducer
