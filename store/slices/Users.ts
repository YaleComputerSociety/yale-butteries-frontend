import { getRandomBytes } from 'expo-crypto'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/constants'
import { AppDispatch } from '../../store/ReduxStore'
import { setCurrentUserState } from '../../store/slices/CurrentUser'
import * as LocalStorage from '../../LocalStorage'
import type { User, NewUser } from '../../utils/types'

// import { getJSON, putJSON, postJSON } from 'utils/fetch'

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

export const asyncCreateUser = (user: NewUser) => {
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
      console.log(data)
      if (newUser.status != 200) {
        throw 'failed to create new user'
      }

      dispatch(setCurrentUserState(data))

      // if (user.role == 'dev') {
      //   return true
      // }

      const token = getRandomBytes(8).toString()

      const localStorageInfo: [string, string][] = [
        ['id', data.id],
        ['username', data.netId],
        ['token', token],
        ['permissions', data.role],
      ]

      LocalStorage.storeUserInfo(localStorageInfo)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export const asyncFetchUsers = () => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(setIsLoading(true))
    try {
      const users = await fetch(baseUrl + 'api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await users.json()
      const newData: User[] = []
      data.forEach((user) => {
        const newUser: User = {
          email: user.email,
          netId: user.netid,
          name: user.name,
          role: user.permissions,
          collegeId: user.college,
          id: user.id,
          currentOrder: user.currentOrder,
        }
        newData.push(newUser);
      })
      // CHECK ON THIS
      dispatch(setUsersState(newData));
      return true;
    }
    catch (e) {
      console.log(e);
    }
    finally {
      dispatch(setIsLoading(false));
    }
  }
}

export default usersSlice.reducer
