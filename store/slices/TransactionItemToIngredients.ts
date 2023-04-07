import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../../store/ReduxStore'

export interface TransactionItemToIngredient {
  transactionItemId: number
  ingredientId: number
}

export interface TransactionItemToIngredientsState {
  transactionItemToIngredients: TransactionItemToIngredient[] | null
  isLoading: boolean
}

const transactionItemToIngredientsInitialState: TransactionItemToIngredientsState = {
  transactionItemToIngredients: null,
  isLoading: false,
}

export const transactionItemToIngredientsSlice = createSlice({
  name: 'TransactionItemToIngredients',
  initialState: transactionItemToIngredientsInitialState,
  reducers: {
    setTransactionItemToIngredientsState: (state, action: PayloadAction<TransactionItemToIngredient[]>) => {
      state.transactionItemToIngredients = action.payload
    },
    addTransactionItemToIngredient: (state, action: PayloadAction<TransactionItemToIngredient>) => {
      state.transactionItemToIngredients = [...state.transactionItemToIngredients, action.payload]
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setTransactionItemToIngredientsState, addTransactionItemToIngredient, setIsLoading } =
  transactionItemToIngredientsSlice.actions

export const asyncFetchtransactionItemToIngredients = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      // const currentUser = await getJSON<CurrentUser>('/api/users/me')
      const transactionItemToIngredients = await dummytransactionItemToIngredients()
      dispatch(setTransactionItemToIngredientsState(transactionItemToIngredients))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

async function dummytransactionItemToIngredients(): Promise<TransactionItemToIngredient[]> {
  await new Promise((r) => setTimeout(r, 200))
  return []
}

export default transactionItemToIngredientsSlice.reducer
