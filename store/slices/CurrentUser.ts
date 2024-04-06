import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/constants'
import { AppDispatch } from '../../store/ReduxStore'
import type { UserUpdate, User } from '../../utils/types'
import { setOrder } from './Order'
import { asyncFetchMenuItems } from './MenuItems'

export interface CurrentUserState {
  currentUser: User | null
  isLoading: boolean
  id: number | null
}

const currentUserInitialState: CurrentUserState = {
  currentUser: null,
  isLoading: false,
  id: null,
}

export const currentUserSlice = createSlice({
  name: 'CurrentUser',
  initialState: currentUserInitialState,
  reducers: {
    setCurrentUserState: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    setCurrentUserId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setCurrentUserState, setIsLoading, setCurrentUserId } = currentUserSlice.actions

export const asyncFetchUser = (id: string) => {
  return async (dispatch: AppDispatch): Promise<'good' | 'error' | 'missing'> => {
    dispatch(setIsLoading(true))
    try {
      const user = await fetch(baseUrl + 'api/users/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await user.json()

      if (user.status === 404) {
        return 'missing'
      } else if (!user.ok) {
        return 'error'
      }

      dispatch(setCurrentUserState(data))
      dispatch(setOrder(data.currentOrder))
      dispatch(asyncFetchMenuItems())
      return 'good'
    } catch (e) {
      console.log(e)
      return 'error'
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateCurrentUser = (currentUser: UserUpdate, id: string) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    console.log(currentUser)
    try {
      const updatedUser = await fetch(`${baseUrl}api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      })
      const data = await updatedUser.json()
      dispatch(setCurrentUserState(data))
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export const asyncVerifyStaffLogin = async (username: string, password: string): Promise<boolean> => {
  try {
    const verified = await fetch(baseUrl + 'api/users/staffLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    const data = await verified.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

export default currentUserSlice.reducer
