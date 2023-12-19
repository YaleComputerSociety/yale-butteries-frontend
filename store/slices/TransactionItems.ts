import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/utils'
import { AppDispatch } from '../../store/ReduxStore'
import type {OrderItem} from '../../utils/types'

// import { getJSON } from 'utils/fetch'

export interface TransactionItemsState {
  transactionItems: OrderItem[]
  isLoading: boolean
}

const transactionItemsInitialState: TransactionItemsState = {
  transactionItems: [],
  isLoading: false,
}

export const transactionItemsSlice = createSlice({
  name: 'TransactionItems',
  initialState: transactionItemsInitialState,
  reducers: {
    setTransactionItemsState: (state, action: PayloadAction<OrderItem[]>) => {
      state.transactionItems = action.payload
    },
    addTransactionItem: (state, action: PayloadAction<OrderItem>) => {
      state.transactionItems = [...state.transactionItems, action.payload]
    },
    updateTransactionItem: (state, action: PayloadAction<OrderItem>) => {
      const updateIndex = state.transactionItems.findIndex((item) => item.id == action.payload.id)
      state.transactionItems[updateIndex] = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setTransactionItemsState, addTransactionItem, updateTransactionItem, setIsLoading } =
  transactionItemsSlice.actions

export const asyncUpdateTransactionItem = (transactionItem: OrderItem) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(updateTransactionItem(transactionItem))
    try {
      await fetch(baseUrl + 'api/orders/item/' + transactionItem.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionItem),
      })
      return true
    } catch (e) {
      console.log(e)
      return false
    } finally {
    }
  }
}

export default transactionItemsSlice.reducer
