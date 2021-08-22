import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getJSON, putJSON, postJSON } from 'utils/fetch'

interface EventWithoutVisibility {
  id: number
  name: string
  description: string
  first_start_timestamp: Date
  first_end_timestamp: Date
  end_date: Date
  user_id: number
  room_id: number
  event_type: string
  recurrence_type: string
  approval_status: string
  createdAt: Date
  updatedAt: Date
}

export interface Event extends EventWithoutVisibility {
  isVisible: boolean
}

export interface EventsState {
  events: Event[] | null
  isLoading: boolean
}

const initialState: EventsState = {
  events: null,
  isLoading: false,
}

export const eventsSlice = createSlice({
  name: 'Events',
  initialState,
  reducers: {
    setEventsState: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const eventIndex = state.events.findIndex((element) => element.id == action.payload.id)
      state.events[eventIndex] = action.payload
    },
    insertEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload)
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setEventsState, updateEvent, insertEvent, setIsLoading } = eventsSlice.actions

export const asyncFetchEvents = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const eventsWithoutVisibility = await getJSON<EventWithoutVisibility[]>('/api/events')
      const events = eventsWithoutVisibility.map((event) => {
        return {
          ...event,
          isVisible: false,
        }
      })
      dispatch(setEventsState(events))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateEvent = (event: Event) => {
  return async (dispatch): Promise<void> => {
    const isVisible = event.isVisible
    try {
      // Spread operator is typescript hack.
      // See: https://stackoverflow.com/questions/60697214/how-to-fix-index-signature-is-missing-in-type-error
      const updatedEventWithoutVisibility = await putJSON('/api/events', { ...event })
      const updatedEvent = {
        ...updatedEventWithoutVisibility.jsonBody,
        isVisible: isVisible,
      }
      dispatch(updateEvent(updatedEvent))
    } catch (e) {
      console.log(e)
    }
  }
}

export const asyncInsertEvent = (event: EventWithoutVisibility) => {
  return async (dispatch): Promise<void> => {
    try {
      const newEvent = await postJSON('/api/events', { ...event })
      dispatch(
        insertEvent({
          ...newEvent.jsonBody,
          isVisible: false,
        })
      )
    } catch (e) {
      console.log(e)
    }
  }
}

export default eventsSlice.reducer
