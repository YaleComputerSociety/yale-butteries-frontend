import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './slices/Users'
import currentUserReducer from './slices/CurrentUser'
import menuItemsReducer from './slices/MenuItems'
import transactionHistoryReducer from './slices/TransactionHistory'
import transactionItemsReducer from './slices/TransactionItems'
import orderCartReducer from './slices/OrderCart'

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
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
