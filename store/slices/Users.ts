import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/utils'
import { AppDispatch } from '../../store/ReduxStore'
import { asyncUpdateCurrentUser } from '../../store/slices/CurrentUser'

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
    updateUser: (state, action: PayloadAction<User>) => {
      const userIndex = state.users.findIndex((element) => element.id == action.payload.id)
      state.users[userIndex] = action.payload
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

export const { setUsersState, updateUser, insertUser, setIsLoading } = usersSlice.actions

export const asyncCreateUser = (user: User) => {
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
      dispatch(asyncUpdateCurrentUser(data))
    } catch (e) {
      console.log(e)
    }
  }
}

async function dummyUsers(): Promise<User[]> {
  await new Promise((r) => setTimeout(r, 200))
  return [
    {
      id: 3,
      netid: 'testmctester1',
      name: 'Testing McTester',
      college: 'Morse',
    },
    {
      id: 4,
      netid: 'testmctester12',
      name: 'Testing McTester II',
      college: 'Morse',
    },
    {
      id: 5,
      netid: 'testmctester123',
      name: 'Testing McTester III',
      college: 'Morse',
    },
    {
      id: 6,
      netid: 'staffman123',
      name: 'Staffon McStaffrey',
      college: 'Morse',
    },
  ]
}
export default usersSlice.reducer
