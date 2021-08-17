import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getJSON, putJSON } from 'utils/fetch'

export interface EventOccurrence {
  id: number
  event_id: number
  description: string | null
  start_time: Date
  end_time: Date
  createdAt: Date
  updatedAt: Date
}

export interface EventOccurrencesState {
  eventOccurrences: EventOccurrence[] | null
  isLoading: boolean
}

const initialState: EventOccurrencesState = {
  eventOccurrences: null,
  isLoading: false,
}

export const eventOccurrencesSlice = createSlice({
  name: 'EventOccurrences',
  initialState,
  reducers: {
    setEventOccurrencesState: (state, action: PayloadAction<EventOccurrence[]>) => {
      state.eventOccurrences = action.payload
    },
    updateEventOccurrence: (state, action: PayloadAction<EventOccurrence>) => {
      const eventOccurrenceIndex = state.eventOccurrences.findIndex((element) => element.id == action.payload.id)
      state.eventOccurrences[eventOccurrenceIndex] = action.payload
    },
    insertEventOccurrence: (state, action: PayloadAction<EventOccurrence>) => {
      state.eventOccurrences.push(action.payload)
    },
    insertEventOccurrences: (state, action: PayloadAction<EventOccurrence[]>) => {
      state.eventOccurrences.push(...action.payload)
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  setEventOccurrencesState,
  updateEventOccurrence,
  insertEventOccurrence,
  insertEventOccurrences,
  setIsLoading,
} = eventOccurrencesSlice.actions

export const asyncFetchEventOccurrences = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const eventOccurrences = await getJSON<EventOccurrence[]>('/api/eventoccurrences')
      dispatch(setEventOccurrencesState(eventOccurrences))
    } catch (e) {
      console.log(e)
    }
    dispatch(setIsLoading(false))
  }
}

export const asynceUpdateEventOccurrence = (eventOccurrence: EventOccurrence) => {
  return async (dispatch): Promise<void> => {
    try {
      // Spread operator is typescript hack.
      // See: https://stackoverflow.com/questions/60697214/how-to-fix-index-signature-is-missing-in-type-error
      const updatedEventOccurrence = await putJSON('/api/eventoccurrences', { ...eventOccurrence })
      dispatch(updateEventOccurrence(updatedEventOccurrence.jsonBody))
    } catch (e) {
      console.log(e)
    }
  }
}

export default eventOccurrencesSlice.reducer
