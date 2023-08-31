import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './slices/Users'
import currentUserReducer from './slices/CurrentUser'
import menuItemsReducer from './slices/MenuItems'
import transactionHistoryReducer from './slices/TransactionHistory'
import transactionItemsReducer from './slices/TransactionItems'
import orderCartReducer from './slices/OrderCart'
import collegesReducer from './slices/Colleges'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export interface APIError {
  errors: Array<{ message: string }>
  callback: unknown
  parameters: unknown
}

const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    menuItems: menuItemsReducer,
    transactionHistory: transactionHistoryReducer,
    transactionItems: transactionItemsReducer,
    orderCart: orderCartReducer,
    colleges: collegesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// These just add TypeScript functionality to basic redux functions
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): any => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
