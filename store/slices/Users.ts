import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/utils'
import { AppDispatch } from '../../store/ReduxStore'
import { setCurrentUserState } from '../../store/slices/CurrentUser'
import * as LocalStorage from '../../LocalStorage'
import { TransactionItem } from './TransactionItems'

// import { getJSON, putJSON, postJSON } from 'utils/fetch'

export interface User {
  email: string
  netid: string
  name: string
  college: string
  permissions: string
  id: string
  currentOrder?: TransactionItem
}

export interface NewUser {
  email: string
  netid: string
  name: string
  college: string
  permissions: string
  token: string
}

export interface UsersState {
  users: User[] | null
  isLoading: boolean
}

const initialState: UsersState = {
  users: null,
  isLoading: false,
}

export const usersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    setUsersState: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    insertUser: (state, action: PayloadAction<User>) => {
      const user = action.payload
      state.users.push(user)
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setUsersState, insertUser, setIsLoading } = usersSlice.actions

export const asyncCreateUser = (user: NewUser, token: string) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      // setIsLoading(true)
      const newUser = await fetch(baseUrl + 'api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await newUser.json()
      if (newUser.status != 200) {
        throw 'failed to create new user'
      }

      dispatch(setCurrentUserState(data))

      if (user.permissions == 'dev') {
        return true
      }

      const localStorageInfo: [string, string][] = [
        ['id', data.id.toString()],
        ['username', data.netid],
        ['token', token],
        ['permissions', data.permissions],
      ]

      LocalStorage.storeUserInfo(localStorageInfo)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export default usersSlice.reducer
