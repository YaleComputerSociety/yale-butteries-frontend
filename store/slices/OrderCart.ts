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
  college: string
  price: number
}

const orderCartInitialState: OrderCartState = {
  orderItems: [],
  isLoading: false,
  college: null,
  price: 0,
}

export const orderCartSlice = createSlice({
  name: 'OrderCart',
  initialState: orderCartInitialState,
  reducers: {
    resetOrderCartState: (state) => {
      state.orderItems = []
      state.price = 0
    },
    addOrderItem: (state, action: PayloadAction<OrderItem>) => {
      state.orderItems = [...state.orderItems, action.payload]
      state.price += action.payload.orderItem.price
    },
    removeOrderItem: (state, action: PayloadAction<OrderItem>) => {
      const deleteIndex = state.orderItems.findIndex((item) => item.orderItem.id === action.payload.orderItem.id)
      state.orderItems = [...state.orderItems.slice(0, deleteIndex), ...state.orderItems.slice(deleteIndex + 1)]
      state.price -= action.payload.orderItem.price
    },
    setIsLoading: (state, action: PayloadAction<boolean | APIError>) => {
      state.isLoading = action.payload
    },
    setCollege: (state, action: PayloadAction<string>) => {
      state.college = action.payload
    },
  },
})

export const { resetOrderCartState, addOrderItem, removeOrderItem, setIsLoading, setCollege } = orderCartSlice.actions

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
