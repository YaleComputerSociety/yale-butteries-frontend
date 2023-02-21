import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { getJSON } from 'utils/fetch'

export interface TransactionItem {
  id: number
  itemCost: number
  orderStatus: 'PENDING' | 'CANCELLED' | 'IN_PROGRESS' | 'FINISHED' | 'PICKED_UP'
  menuItemId: number
  name: string
  user: string
  creationTime: string
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

export const { setTransactionItemsState, addTransactionItem, updateTransactionItem, setIsLoading } =
  transactionItemsSlice.actions

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
  await new Promise((r) => setTimeout(r, 200))
  return [
    {
      id: 1,
      itemCost: 1,
      orderStatus: 'complete',
      menuItemId: 1,
      transactionHistoryId: 1,
    },
    {
      id: 2,
      itemCost: 15,
      orderStatus: 'queued',
      menuItemId: 2,
      transactionHistoryId: 1,
    },
    {
      id: 3,
      itemCost: 10,
      orderStatus: 'complete',
      menuItemId: 3,
      transactionHistoryId: 2,
    },
    {
      id: 4,
      itemCost: 15,
      orderStatus: 'PENDING',
      menuItemId: 6,
      transactionHistoryId: 2,
    },
    {
      id: 4,
      itemCost: 30,
      orderStatus: 'queued',
      menuItemId: 5,
      transactionHistoryId: 3,
    },
    {
      id: 5,
      itemCost: 30,
      orderStatus: 'complete',
      menuItemId: 6,
      transactionHistoryId: 3,
    },
  ]
}

export default transactionItemsSlice.reducer
