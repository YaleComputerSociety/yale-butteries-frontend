import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransactionItem } from './TransactionItems'
import { AppDispatch } from '../../store/ReduxStore'
import { baseUrl } from '../../utils/utils'

export interface TransactionHistoryEntry {
  id: number
  college: string
  inProgress: 'false' | 'true' | 'cancelled'
  price: number
  userId: string
  paymentIntentId: string
  transactionItems: TransactionItem[]
  orderStatus: 'QUEUED' | 'ONGOING' | 'READY' | 'CANCELLED' | 'PAID'
  creationTime: string
}

export interface TransactionHistoryState {
  transactionHistory: TransactionHistoryEntry[]
  currentTransactionHistory: TransactionHistoryEntry
  isLoading: boolean
}

const transactionHistoryInitialState: TransactionHistoryState = {
  transactionHistory: [],
  currentTransactionHistory: null,
  isLoading: false,
}

export const transactionHistorySlice = createSlice({
  name: 'TransactionHistory',
  initialState: transactionHistoryInitialState,
  reducers: {
    setTransactionHistoryState: (state, action: PayloadAction<TransactionHistoryEntry>) => {
      state.transactionHistory = [action.payload]
      state.currentTransactionHistory = action.payload
    },
    addTransactionHistoryEntry: (state, action: PayloadAction<TransactionHistoryEntry>) => {
      state.transactionHistory = [...state.transactionHistory, action.payload]
      state.currentTransactionHistory = action.payload
    },
    updateTransactionHistory: (state, action: PayloadAction<TransactionHistoryEntry>) => {
      const transactionHistoryIndex = state.transactionHistory.findIndex((element) => element.id == action.payload.id)
      state.transactionHistory[transactionHistoryIndex] = action.payload
      state.currentTransactionHistory = state.transactionHistory[state.transactionHistory.length - 1]
    },
    setTransactionHistories: (state, action: PayloadAction<TransactionHistoryEntry[]>) => {
      state.transactionHistory = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  setTransactionHistoryState,
  addTransactionHistoryEntry,
  updateTransactionHistory,
  setTransactionHistories,
  setIsLoading,
} = transactionHistorySlice.actions

export const asyncFetchRecentTransactionHistories = (college: string) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(setIsLoading(true))
    try {
      const transactions = await fetch(baseUrl + 'api/orders/college/recent/' + college, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await transactions.json()
      const newData: TransactionHistoryEntry[] = []
      data.transactionHistories.forEach((item) => {
        const newItem: TransactionHistoryEntry = { ...item }
        newData.push(newItem)
      })
      dispatch(setTransactionHistories(newData))
      return true
    } catch (e) {
      console.log(e)
      return false
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncFetchAllTransactionHistories = (college: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const transactions = await fetch(baseUrl + 'api/orders/college/' + college, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await transactions.json()
      const newData: TransactionHistoryEntry[] = []
      data.transactionHistories.forEach((item) => {
        const newItem: TransactionHistoryEntry = { ...item }
        newData.push(newItem)
      })
      dispatch(setTransactionHistories(newData))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateTransactionHistoryEntry = (transactionHistoryEntry: TransactionHistoryEntry) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      // const updatedUser = await putJSON('/api/users', { ...user })
      // dispatch(updateUser(updatedUser.jsonBody))
      await new Promise((r) => setTimeout(r, 200))
      dispatch(updateTransactionHistory(transactionHistoryEntry))
    } catch (e) {
      console.log(e)
    }
  }
}

export default transactionHistorySlice.reducer
