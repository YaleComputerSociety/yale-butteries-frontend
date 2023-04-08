import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/utils'
import { AppDispatch } from '../../store/ReduxStore'

// import { getJSON } from 'utils/fetch'

export interface TransactionItem {
  id: number
  itemCost: number
  orderStatus: 'CANCELLED' | 'PENDING' | 'IN_PROGRESS' | 'FINISHED' | 'PICKED_UP'
  menuItemId: number
  name: string
  user: string
  creationTime: string
}

export interface TransactionItemsState {
  transactionItems: TransactionItem[]
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
    setTransactionItemsState: (state, action: PayloadAction<TransactionItem[]>) => {
      state.transactionItems = action.payload
    },
    addTransactionItem: (state, action: PayloadAction<TransactionItem>) => {
      state.transactionItems = [...state.transactionItems, action.payload]
    },
    updateTransactionItem: (state, action: PayloadAction<TransactionItem>) => {
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

export const asyncUpdateTransactionItem = (transactionItem: TransactionItem) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(updateTransactionItem(transactionItem))
    // dispatch(setIsLoading(true))
    try {
      await fetch(baseUrl + 'api/transactions/item', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionItem),
      })
    } catch (e) {
      console.log(e)
    } finally {
      // dispatch(setIsLoading(false))
    }
  }
}

export default transactionItemsSlice.reducer