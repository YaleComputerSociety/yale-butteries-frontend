import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { getJSON } from 'utils/fetch'

export interface TransactionItem {
  id: number
  itemCost: number
  orderStatus: 'cancelled' | 'queued' | 'in_progress' | 'complete' | 'pending'
  menuItemId: number
  transactionHistoryId: number
}

export interface TransactionItemsState {
  transactionItems: TransactionItem[] | null
  isLoading: boolean
}

const transactionItemsInitialState: TransactionItemsState = {
  transactionItems: null,
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

export const { setTransactionItemsState, addTransactionItem, updateTransactionItem, setIsLoading } = transactionItemsSlice.actions

export const asyncFetchTransactionItems = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      // const currentUser = await getJSON<CurrentUser>('/api/users/me')
      const transactionItems = await dummyTransactionItems()
      dispatch(setTransactionItemsState(transactionItems))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

async function dummyTransactionItems(): Promise<TransactionItem[]> {
  await new Promise((r) => setTimeout(r, 2000))
  return [
    {
      id: 1,
      itemCost: 1.50,
      orderStatus: 'complete',
      menuItemId: 1,
      transactionHistoryId: 1,
    },
    {
      id: 2,
      itemCost: 1.50,
      orderStatus: 'queued',
      menuItemId: 2,
      transactionHistoryId: 1,
    },
    {
      id: 3,
      itemCost: 1.00,
      orderStatus: 'complete',
      menuItemId: 3,
      transactionHistoryId: 2,
    },
    {
      id: 4,
      itemCost: 1.50,
      orderStatus: 'in_progress',
      menuItemId: 4,
      transactionHistoryId: 2,
    },
    {
      id: 5,
      itemCost: 3.00,
      orderStatus: 'cancelled',
      menuItemId: 5,
      transactionHistoryId: 3,
    },
    {
      id: 6,
      itemCost: 3.00,
      orderStatus: 'complete',
      menuItemId: 6,
      transactionHistoryId: 3,
    },
  ]
}

export default transactionItemsSlice.reducer
