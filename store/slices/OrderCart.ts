import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { APIError } from '../ReduxStore'
import type { OrderCartItem } from '../../utils/types'

export interface OrderCartState {
  orderItems: OrderCartItem[]
  isLoading: boolean | APIError
  college: string
  price: number
}

const orderCartInitialState: OrderCartState = {
  orderItems: [],
  isLoading: false,
  college: '',
  price: 0,
}

export const orderCartSlice = createSlice({
  name: 'OrderCart',
  initialState: orderCartInitialState,
  reducers: {
    resetOrderCartState: (state) => {
      state.orderItems = []
      state.price = 0
    },
    addOrderItem: (state, action: PayloadAction<OrderCartItem>) => {
      state.orderItems = [...state.orderItems, action.payload]
      state.price += action.payload.orderItem.price
    },
    removeOrderItem: (state, action: PayloadAction<OrderCartItem>) => {
      const deleteIndex = state.orderItems.findIndex((item) => item.index === action.payload.index)
      state.orderItems = [...state.orderItems.slice(0, deleteIndex), ...state.orderItems.slice(deleteIndex + 1)]
      state.price -= action.payload.orderItem.price
    },
    setIsLoading: (state, action: PayloadAction<boolean | APIError>) => {
      state.isLoading = action.payload
    },
    setCollege: (state, action: PayloadAction<string>) => {
      state.college = action.payload
    },
  },
})

export const { resetOrderCartState, addOrderItem, removeOrderItem, setIsLoading, setCollege } = orderCartSlice.actions

export default orderCartSlice.reducer
