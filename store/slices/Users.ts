import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/utils'
import { AppDispatch } from '../../store/ReduxStore'
import { setCurrentUserState } from '../../store/slices/CurrentUser'
import * as LocalStorage from '../../LocalStorage'

// import { getJSON, putJSON, postJSON } from 'utils/fetch'

export interface User {
  email: string
  netid: string
  name: string
  college_id: number
  token: string
  permissions: string
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

export const asyncCreateUser = (user: User, username: string, token: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const newUser = await fetch(baseUrl + 'api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await newUser.json()

      dispatch(setCurrentUserState(data))

      const localStorageInfo = [
        ['id', data.id.toString()],
        ['username', username],
        ['token', token],
        ['permissions', 'customer'],
      ]

      LocalStorage.storeUserInfo(localStorageInfo)
      console.log('stored!', 'user with id ===> ' + data.id.toString() + '\n\n')
    } catch (e) {
      console.log(e)
    }
  }
}

export default usersSlice.reducer
