import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getJSON } from 'utils/fetch'

interface RoomWithoutVisibility {
  id: number
  room_name: string
  needs_approval: boolean
  college: string
  recurrence_types: string[]
  createdAt: Date
  updatedAt: Date
}

interface Room extends RoomWithoutVisibility {
  isVisible: boolean
}

export interface RoomsState {
  rooms: Room[] | null
  isLoading: boolean
}

const initialState: RoomsState = {
  rooms: null,
  isLoading: false,
}

export const roomsSlice = createSlice({
  name: 'Rooms',
  initialState,
  reducers: {
    setRoomsState: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setRoomsState, setIsLoading } = roomsSlice.actions

export const asyncFetchRooms = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const roomsWithoutVisibility = await getJSON<RoomWithoutVisibility[]>('/api/rooms')
      const rooms = roomsWithoutVisibility.map((room) => {
        return {
          ...room,
          isVisible: false,
        }
      })
      dispatch(setRoomsState(rooms))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export default roomsSlice.reducer
