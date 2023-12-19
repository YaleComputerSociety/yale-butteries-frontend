import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../ReduxStore'
import { baseUrl } from '../../utils/utils'
import type { Order } from '../../utils/types'

export interface OrdersState {
  orders: Order[]
  currentOrder: Order
  isLoading: boolean
}

const ordersInitialState: OrdersState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
}

export const ordersSlice = createSlice({
  name: 'Orders',
  initialState: ordersInitialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      state.orders = [action.payload]
      state.currentOrder = action.payload
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders = [...state.orders, action.payload]
      state.currentOrder = action.payload
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex((element) => element.id == action.payload.id)
      state.orders[index] = action.payload
      state.currentOrder = state.orders[state.orders.length - 1]
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  setOrder,
  addOrder,
  updateOrder,
  setOrders,
  setIsLoading,
} = ordersSlice.actions

export const asyncFetchRecentOrdersFromCollege = (college: string) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(setIsLoading(true))
    try {
      const orders = await fetch(baseUrl + 'api/orders/college/recent/' + college, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data: Order[] = await orders.json()
      dispatch(setOrders(data))
      return true
    } catch (e) {
      console.log(e)
      return false
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncFetchAllOrdersFromCollege = (college: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const orders = await fetch(baseUrl + 'api/orders/college/' + college, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data: Order[] = await orders.json()
      dispatch(setOrders(data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export default ordersSlice.reducer
