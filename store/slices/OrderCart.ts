import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { APIError } from '../ReduxStore'
import { Ingredient } from './Ingredients'
import { MenuItem } from './MenuItems'
import { TransactionHistoryEntry, addTransactionHistoryEntry } from './TransactionHistory'
import { TransactionItem, addTransactionItem } from './TransactionItems'
import { CurrentUserState } from './CurrentUser'
import { TransactionItemToIngredient, addTransactionItemToIngredient } from './TransactionItemToIngredients'

export interface OrderItem {
  orderItem: MenuItem
  ingredients?: Ingredient[]
}

export interface OrderCartState {
  orderItems: OrderItem[]
  isLoading: boolean | APIError
  // DUMMY DATA TYPES, REMOVE FOR PRODUCTION
  transactionItemCounter: number
  transactionHistoryCounter: number
}

const orderCartInitialState: OrderCartState = {
  orderItems: [],
  isLoading: false,
  transactionItemCounter: 100,
  transactionHistoryCounter: 100,
}

export const orderCartSlice = createSlice({
  name: 'OrderCart',
  initialState: orderCartInitialState,
  reducers: {
    resetOrderCartState: (state, action: PayloadAction<OrderItem[]>) => {
      state.orderItems = []
    },
    addOrderItem: (state, action: PayloadAction<OrderItem>) => {
      state.orderItems = [...state.orderItems, action.payload]
    },
    removeOrderItem: (state, action: PayloadAction<OrderItem>) => {
      const deleteIndex = state.orderItems.findIndex((item) => item === action.payload)
      state.orderItems = [...state.orderItems.slice(0, deleteIndex), ...state.orderItems.slice(deleteIndex + 1)]
    },
    incrementTransactionItemCounter: (state, action: PayloadAction) => {
      state.transactionItemCounter += 1
    },
    incrementTransactionHistoryCounter: (state, action: PayloadAction) => {
      state.transactionHistoryCounter += 1
    },
    setIsLoading: (state, action: PayloadAction<boolean | APIError>) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  resetOrderCartState,
  addOrderItem,
  removeOrderItem,
  incrementTransactionItemCounter,
  incrementTransactionHistoryCounter,
  setIsLoading,
} = orderCartSlice.actions

export const submitOrder = (
  orderItems: OrderItem[],
  currentUser: CurrentUserState,
  transactionHistoryCounter: number,
  transactionItemCounter: number
) => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      await dummySubmitOrder(orderItems, currentUser, transactionHistoryCounter, transactionItemCounter, dispatch)
      dispatch(setIsLoading(false))
    } catch (e) {
      setIsLoading({
        errors: [],
        callback: submitOrder,
        parameters: [],
      })
    } finally {
      dispatch(resetOrderCartState())
    }
  }
}

async function dummySubmitOrder(
  orderItems: OrderItem[],
  currentUser: CurrentUserState,
  transactionHistoryCounter,
  transactionItemCounter,
  dispatch
): Promise<void> {
  const calcPrice = orderItems.reduce((totalPrice, orderItem) => (totalPrice += orderItem.orderItem.price), 0)
  const transactionHistoryEntry: TransactionHistoryEntry = {
    id: transactionHistoryCounter,
    college: orderItems[0].orderItem.college,
    inProgress: 'true',
    price: calcPrice,
    userId: currentUser.currentUser.id,
  }

  dispatch(addTransactionHistoryEntry(transactionHistoryCounter))
  dispatch(incrementTransactionHistoryCounter())

  let tmpCounter = transactionItemCounter
  orderItems.forEach((orderItem) => {
    const transactionItem: TransactionItem = {
      id: tmpCounter,
      itemCost: orderItem.orderItem.price,
      orderStatus: 'queued',
      menuItemId: orderItem.orderItem.id,
      transactionHistoryId: transactionHistoryEntry.id,
    }

    dispatch(addTransactionItem(transactionItem))
    dispatch(incrementTransactionItemCounter())
    tmpCounter += 1

    orderItem.ingredients.forEach((ingredient) => {
      const transactionItemToIngredients: TransactionItemToIngredient = {
        transactionItemId: transactionItem.id,
        ingredientId: ingredient.id,
      }
      dispatch(addTransactionItemToIngredient(transactionItemToIngredients))
    })
  })
}

export default orderCartSlice.reducer
