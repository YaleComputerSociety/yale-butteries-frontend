import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getJSON, putJSON, postJSON } from 'utils/fetch'

export interface UserEventOccurrence {
  id: number
  user_id: number
  event_occurrence_id: number
  attendance_status: string
  createdAt: Date
  updatedAt: Date
}

export interface UsersEventOccurrencesState {
  usersEventOccurrences: UserEventOccurrence[] | null
  isLoading: boolean
}

const initialState: UsersEventOccurrencesState = {
  usersEventOccurrences: null,
  isLoading: false,
}

export const usersEventOccurrencesSlice = createSlice({
  name: 'UsersEventOccurrences',
  initialState,
  reducers: {
    setUsersEventOccurrencesState: (state, action: PayloadAction<UserEventOccurrence[]>) => {
      state.usersEventOccurrences = action.payload
    },
    updateUserEventOccurrence: (state, action: PayloadAction<UserEventOccurrence>) => {
      const userEventOccurenceIndex = state.usersEventOccurrences.findIndex(
        (element) => element.id == action.payload.id
      )
      state.usersEventOccurrences[userEventOccurenceIndex] = action.payload
    },
    insertUserEventOccurrence: (state, action: PayloadAction<UserEventOccurrence>) => {
      state.usersEventOccurrences.push(action.payload)
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setUsersEventOccurrencesState, updateUserEventOccurrence, insertUserEventOccurrence, setIsLoading } =
  usersEventOccurrencesSlice.actions

export const asyncFetchUsersEventOccurrences = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const usersEventOccurrences = await getJSON<UserEventOccurrence[]>('/api/userseventoccurrences')
      dispatch(setUsersEventOccurrencesState(usersEventOccurrences))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateUserEventOccurrence = (userEventOccurrence: UserEventOccurrence) => {
  return async (dispatch): Promise<void> => {
    try {
      // Spread operator is typescript hack.
      // See: https://stackoverflow.com/questions/60697214/    how-to-fix-index-signature-is-missing-in-type-error
      const updatedUserEventOccurrence = await putJSON('/api/userseventoccurrences', { ...userEventOccurrence })
      dispatch(updateUserEventOccurrence(updatedUserEventOccurrence.jsonBody))
    } catch (e) {
      console.log(e)
    }
  }
}

export const asyncInsertUserEventOccurrence = (userEventOccurrence: UserEventOccurrence) => {
  return async (dispatch): Promise<void> => {
    try {
      const newUserEventOccurrence = await postJSON('/api/userseventoccurrences', { ...userEventOccurrence })
      dispatch(insertUserEventOccurrence(newUserEventOccurrence.jsonBody))
    } catch (e) {
      console.log(e)
    }
  }
}

export default usersEventOccurrencesSlice.reducer
