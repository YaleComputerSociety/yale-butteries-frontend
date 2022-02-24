import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { getJSON } from 'utils/fetch'

export interface TransactionItem {
  id: number
  itemName: string
  itemCost: number
  order_status: 'cancelled' | 'queued' | 'in_progress' | 'complete'
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setTransactionItemsState, setIsLoading } = transactionItemsSlice.actions

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
      itemName: 'Americano',
      itemCost: 1.50,
      order_status: 'complete',
      transactionHistoryId: 1,
    },
    {
      id: 2,
      itemName: 'Quesadilla',
      itemCost: 1.50,
      order_status: 'queued',
      transactionHistoryId: 1,
    },
    {
      id: 3,
      itemName: 'Coke',
      itemCost: 1.00,
      order_status: 'complete',
      transactionHistoryId: 2,
    },
    {
      id: 4,
      itemName: 'Quesadilla',
      itemCost: 1.50,
      order_status: 'in_progress',
      transactionHistoryId: 2,
    },
    {
      id: 4,
      itemName: "David's Tux",
      itemCost: 3.00,
      order_status: 'queued',
      transactionHistoryId: 3,
    },
    {
      id: 5,
      itemName: 'Americano',
      itemCost: 3.00,
      order_status: 'complete',
      transactionHistoryId: 3,
    },
  ]
}

export default transactionItemsSlice.reducer
