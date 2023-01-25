import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransactionItem } from './TransactionItems'
import { Alert } from 'react-native'

// WILL NEED TO CHANGE FOR MULTIPLE HISTORIES

export interface TransactionHistoryEntry {
  id: number
  college: string
  inProgress: 'false' | 'true' | 'cancelled'
  price: number
  netId: string
  paymentIntentId: string
  transactionItems: TransactionItem[]
}

export interface TransactionHistoryState {
  transactionHistory: TransactionHistoryEntry[] | null
  isLoading: boolean
}

const transactionHistoryInitialState: TransactionHistoryState = {
  transactionHistory: null,
  isLoading: false,
}

export const transactionHistorySlice = createSlice({
  name: 'TransactionHistory',
  initialState: transactionHistoryInitialState,
  reducers: {
    setTransactionHistoryState: (state, action: PayloadAction<TransactionHistoryEntry[]>) => {
      state.transactionHistory = action.payload
    },
    addTransactionHistoryEntry: (state, action: PayloadAction<TransactionHistoryEntry>) => {
      state.transactionHistory = [...state.transactionHistory, action.payload]
    },
    updateTransactionHistory: (state, action: PayloadAction<TransactionHistoryEntry>) => {
      const transactionHistoryIndex = state.transactionHistory.findIndex((element) => element.id == action.payload.id)
      state.transactionHistory[transactionHistoryIndex] = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setTransactionHistoryState, addTransactionHistoryEntry, updateTransactionHistory, setIsLoading } =
  transactionHistorySlice.actions

export const asyncFetchTransactionHistory = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      // const currentUser = await getJSON<CurrentUser>('/api/users/me')
      // const transactionHistory = await dummyTransactionHistory()
      // dispatch(setTransactionHistoryState(transactionHistory))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

// async function dummyTransactionHistory(): Promise<TransactionHistoryEntry[]> {
//   await new Promise((r) => setTimeout(r, 2000))
//   return [
//     {
//       id: 1,
//       college: 'Morse',
//       inProgress: 'cancelled',
//       paymentIntentId: 'e',
//       price: 3.0,
//       userId: 3,
//     },
//     {
//       id: 2,
//       college: 'Morse',
//       inProgress: 'false',
//       paymentIntentId: 'f',
//       price: 2.5,
//       userId: 4,
//     },
//     {
//       id: 3,
//       college: 'Morse',
//       inProgress: 'true',
//       paymentIntentId: 'g',
//       price: 4.5,
//       userId: 5,
//     },
//   ]
// }

export const asyncAddTransactionHistory = (transaction_hisotry: TransactionHistoryEntry) => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      console.log('hhh')
    } catch (e) {
      console.log(e)
      Alert.alert(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateTransactionHistoryEntry = (transactionHistoryEntry: TransactionHistoryEntry) => {
  return async (dispatch): Promise<void> => {
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
