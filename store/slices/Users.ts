import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { getJSON, putJSON, postJSON } from 'utils/fetch'

export interface User {
  id: number
  netid: string
  name: string
  position: string
  college: string
  createdAt: Date
  updatedAt: Date
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
      state.users.push(action.payload)
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setUsersState, updateUser, insertUser, setIsLoading } = usersSlice.actions

export const asyncFetchUsers = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      // const users = await getJSON<User[]>('/api/users')
      const users = await dummyUsers()
      dispatch(setUsersState(users))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateUser = (user: User) => {
  return async (dispatch): Promise<void> => {
    try {
      // Spread operator is typescript hack.
      // See: https://stackoverflow.com/questions/60697214/how-to-fix-index-signature-is-missing-in-type-error
      // const updatedUser = await putJSON('/api/users', { ...user })
      // dispatch(updateUser(updatedUser.jsonBody))
      await new Promise((r) => setTimeout(r, 200))
      dispatch(updateUser(user))
    } catch (e) {
      console.log(e)
    }
  }
}

export const asyncInsertUser = (user: User) => {
  return async (dispatch): Promise<void> => {
    try {
      // const newUser = await postJSON('/api/users', { ...user })
      // dispatch(insertUser(newUser.jsonBody))
      await new Promise((r) => setTimeout(r, 200))
      dispatch(insertUser(user))
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
      position: 'customer',
      college: 'Morse',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      netid: 'testmctester12',
      name: 'Testing McTester II',
      position: 'customer',
      college: 'Morse',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      netid: 'testmctester123',
      name: 'Testing McTester III',
      position: 'customer',
      college: 'Morse',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      netid: 'staffman123',
      name: 'Staffon McStaffrey',
      position: 'staff',
      college: 'Morse',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}
export default usersSlice.reducer
