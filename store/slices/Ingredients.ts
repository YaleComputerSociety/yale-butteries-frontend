import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { getJSON } from 'utils/fetch'

export interface Ingredient {
  id: number
  college: string
  ingredient: string
  price: number
  available: boolean
}

export interface IngredientsState {
  ingredients: Ingredient[] | null
  isLoading: boolean
}

const IngredientsInitialState: IngredientsState = {
  ingredients: null,
  isLoading: false,
}

export const ingredientsSlice = createSlice({
  name: 'Ingredients',
  initialState: IngredientsInitialState,
  reducers: {
    setIngredientsState: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    updateIngredient: (state, action: PayloadAction<Ingredient>) => {
      const ingredientIndex = state.ingredients.findIndex((element) => element.id == action.payload.id)
      state.ingredients[ingredientIndex] = action.payload
    },
  },
})

export const { setIngredientsState, setIsLoading, updateIngredient } = ingredientsSlice.actions

export const asyncFetchIngredients = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      // const currentUser = await getJSON<CurrentUser>('/api/users/me')
      const ingredients = await dummyIngredients()
      dispatch(setIngredientsState(ingredients))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

async function dummyIngredients(): Promise<Ingredient[]> {
  await new Promise((r) => setTimeout(r, 2000))
  return [
    {
      id: 1,
      college: 'morse',
      ingredient: 'Espresso',
      price: 0,
      available: false,
    },
    {
      id: 2,
      college: 'morse',
      ingredient: 'Coke',
      price: 0,
      available: false,
    },
    {
      id: 3,
      college: 'morse',
      ingredient: 'Sprite',
      price: 1.00,
      available: true,
    },
    {
      id: 4,
      college: 'morse',
      ingredient: 'Diet Coke',
      price: 1.00,
      available: true,
    },
    {
      id: 5,
      college: 'morse',
      ingredient: 'Egg',
      price: 0,
      available: true,
    },
    {
      id: 6,
      college: 'morse',
      ingredient: 'Bacon',
      price: 0,
      available: true,
    },
    {
      id: 7,
      college: 'morse',
      ingredient: 'Cheese',
      price: 0,
      available: true,
    },
    {
      id: 8,
      college: 'morse',
      ingredient: 'tortilla',
      price: 0,
      available: true,
    },
  ]
}

export const asyncUpdateIngredient = (ingredient: Ingredient) => {
  return async (dispatch): Promise<void> => {
    try {
      // Spread operator is typescript hack.
      // See: https://stackoverflow.com/questions/60697214/how-to-fix-index-signature-is-missing-in-type-error
      // const updatedUser = await putJSON('/api/users', { ...user })
      // dispatch(updateUser(updatedUser.jsonBody))
      await new Promise((r) => setTimeout(r, 1500))
      dispatch(updateIngredient(ingredient))
    } catch (e) {
      console.log(e)
    }
  }
}

export default ingredientsSlice.reducer
