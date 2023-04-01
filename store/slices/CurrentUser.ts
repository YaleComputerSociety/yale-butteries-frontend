import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const asyncFetchCurrentUser = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      // const currentUser = await getJSON<CurrentUser>('/api/users/me')
      const currentUser = await dummyUser()
      dispatch(setCurrentUserState(currentUser))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateCurrentUser = (name: string) => {
  
  return async (dispatch): Promise<void> => {
    //dispatch(setIsLoading(true))
    try {
      // send stuff to backend and update it there
      const currentUser = await dummyUser()
      dispatch(setCurrentUserState({ ...currentUser, name }))
    } catch (e) {
      console.log(e)
    } finally {
      //dispatch(setIsLoading(false))
    }
  }
}

async function dummyUser(): Promise<User> {
  await new Promise((r) => setTimeout(r, 0))
  return {
    id: 5,
    netid: 'awg32',
    name: 'Saddison',
    college: 'murray',
  }
}

export default currentUserSlice.reducer
