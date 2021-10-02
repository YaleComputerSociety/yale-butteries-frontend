import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getJSON } from 'utils/fetch'

import { User } from './Users'

export interface CurrentUser extends User {
  eventTypes: string[]
}

export interface CurrentUserState {
  currentUser: CurrentUser | null
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
    setCurrentUserState: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setCurrentUserState, setIsLoading } = currentUserSlice.actions

export const asyncFetchCurrentUser = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const currentUser = await getJSON<CurrentUser>('/api/users/me')
      dispatch(setCurrentUserState(currentUser))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export default currentUserSlice.reducer
