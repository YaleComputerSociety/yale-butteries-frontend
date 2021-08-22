import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getJSON, putJSON } from 'utils/fetch'

interface EventOccurrenceWithoutVisibility {
  id: number
  event_id: number
  description: string | null
  start_time: Date
  end_time: Date
  createdAt: Date
  updatedAt: Date
}

export interface EventOccurrence extends EventOccurrenceWithoutVisibility {
  isVisible: boolean
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
      const eventOccurrencesWithoutVisibility = await getJSON<EventOccurrenceWithoutVisibility[]>(
        '/api/eventoccurrences'
      )
      const eventOccurrences = eventOccurrencesWithoutVisibility.map((eventOccurrence) => {
        return {
          ...eventOccurrence,
          isVisible: false,
        }
      })
      dispatch(setEventOccurrencesState(eventOccurrences))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateEventOccurrence = (eventOccurrence: EventOccurrence) => {
  return async (dispatch): Promise<void> => {
    try {
      const { isVisible } = eventOccurrence
      // Spread operator is typescript hack.
      // See: https://stackoverflow.com/questions/60697214/how-to-fix-index-signature-is-missing-in-type-error
      const updatedEventOccurrenceWithoutVisibility = await putJSON('/api/eventoccurrences', { ...eventOccurrence })
      const updatedEventOccurrence = {
        ...updatedEventOccurrenceWithoutVisibility.jsonBody,
        isVisible: isVisible,
      }
      dispatch(updateEventOccurrence(updatedEventOccurrence))
    } catch (e) {
      console.log(e)
    }
  }
}

export default eventOccurrencesSlice.reducer
