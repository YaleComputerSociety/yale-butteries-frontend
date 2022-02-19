import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { getJSON } from 'utils/fetch'

export interface MenuItemToIngredient {
  menuItemId: number
  ingredientId: number
  optional: boolean
}

export interface MenuItemToIngredientsState {
  menuItemToIngredients: MenuItemToIngredient[] | null
  isLoading: boolean
}

const menuItemToIngredientsInitialState: MenuItemToIngredientsState = {
  menuItemToIngredients: null,
  isLoading: false,
}

export const menuItemToIngredientsSlice = createSlice({
  name: 'MenuItemToIngredients',
  initialState: menuItemToIngredientsInitialState,
  reducers: {
    setMenuItemToIngredientsState: (state, action: PayloadAction<MenuItemToIngredient[]>) => {
      state.menuItemToIngredients = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setMenuItemToIngredientsState, setIsLoading } = menuItemToIngredientsSlice.actions

export const asyncFetchMenuItemToIngredients = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      // const currentUser = await getJSON<CurrentUser>('/api/users/me')
      const menuItemToIngredients = await dummyMenuItemToIngredients()
      dispatch(setMenuItemToIngredientsState(menuItemToIngredients))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

async function dummyMenuItemToIngredients(): Promise<MenuItemToIngredient[]> {
  await new Promise((r) => setTimeout(r, 2000))
  return [
    {
      menuItemId: 1,
      ingredientId: 1,
      optional: false,
    },
    {
      menuItemId: 2,
      ingredientId: 2,
      optional: false,
    },
    {
      menuItemId: 3,
      ingredientId: 3,
      optional: false,
    },
    {
      menuItemId: 4,
      ingredientId: 4,
      optional: false,
    },
    {
      menuItemId: 5,
      ingredientId: 5,
      optional: true,
    },
    {
      menuItemId: 5,
      ingredientId: 6,
      optional: true,
    },
    {
      menuItemId: 5,
      ingredientId: 7,
      optional: true,
    },
    {
      menuItemId: 5,
      ingredientId: 8,
      optional: false,
    },
    {
      menuItemId: 6,
      ingredientId: 7,
      optional: true,
    },
    {
      menuItemId: 6,
      ingredientId: 8,
      optional: false,
    },
  ]
}

export default menuItemToIngredientsSlice.reducer
