import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './slices/Users'
import currentUserReducer from './slices/CurrentUser'
import ingredientsReducer from './slices/Ingredients'
import menuItemsReducer from './slices/MenuItems'
import menuItemToIngredientsReducer from './slices/MenuItemToIngredients'
import transactionHistoryReducer from './slices/TransactionHistory'
import transactionItemsReducer from './slices/TransactionItems'

const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    ingredients: ingredientsReducer,
    menuItems: menuItemsReducer,
    menuItemToIngredients: menuItemToIngredientsReducer,
    transactionHistory: transactionHistoryReducer,
    transactionItems: transactionItemsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
