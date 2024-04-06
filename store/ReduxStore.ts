import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

import usersReducer from './slices/Users'
import currentUserReducer from './slices/CurrentUser'
import menuItemsReducer from './slices/MenuItems'
import ordersReducer from './slices/Order'
import orderItemsReducer from './slices/OrderItem'
import orderCartReducer from './slices/OrderCart'
import collegesReducer from './slices/Colleges'

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
    orders: ordersReducer,
    orderItems: orderItemsReducer,
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
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
