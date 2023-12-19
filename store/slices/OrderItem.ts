import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/utils'
import { AppDispatch } from '../ReduxStore'
import type {OrderItem} from '../../utils/types'

// import { getJSON } from 'utils/fetch'

export interface OrderItemsState {
  orderItems: OrderItem[]
  isLoading: boolean
}

const ordersInitialState: OrderItemsState = {
  orderItems: [],
  isLoading: false,
}

export const ordersSlice = createSlice({
  name: 'OrderItems',
  initialState: ordersInitialState,
  reducers: {
    setOrderItems: (state, action: PayloadAction<OrderItem[]>) => {
      state.orderItems = action.payload
    },
    addOrderItem: (state, action: PayloadAction<OrderItem>) => {
      state.orderItems = [...state.orderItems, action.payload]
    },
    updateOrderItem: (state, action: PayloadAction<OrderItem>) => {
      const updateIndex = state.orderItems.findIndex((item) => item.id == action.payload.id)
      state.orderItems[updateIndex] = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setOrderItems, addOrderItem, updateOrderItem, setIsLoading } = ordersSlice.actions

export const asyncUpdateOrderItem = (orderItem: OrderItem) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(updateOrderItem(orderItem))
    try {
      await fetch(baseUrl + 'api/orders/item/' + orderItem.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderItem),
      })
      return true
    } catch (e) {
      console.log(e)
      return false
    } finally {
    }
  }
}

export default ordersSlice.reducer
