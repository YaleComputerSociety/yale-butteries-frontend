import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { getJSON } from 'utils/fetch'

export interface MenuItem {
  id: number
  item: string
  college: string
  price: number
  description: string
  limitedTime: boolean
  isActive: boolean
}

export interface MenuItemsState {
  menuItems: MenuItem[] | null
  isLoading: boolean
}

const menuItemsInitialState: MenuItemsState = {
  menuItems: null,
  isLoading: false,
}

export const menuItemsSlice = createSlice({
  name: 'MenuItems',
  initialState: menuItemsInitialState,
  reducers: {
    setMenuItemsState: (state, action: PayloadAction<MenuItem[]>) => {
      state.menuItems = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setMenuItemsState, setIsLoading } = menuItemsSlice.actions

export const asyncFetchMenuItems = () => {
  return async (dispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      // const currentUser = await getJSON<CurrentUser>('/api/users/me')
      const menuItems = await dummyMenuItems()
      dispatch(setMenuItemsState(menuItems))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

async function dummyMenuItems(): Promise<MenuItem[]> {
  await new Promise((r) => setTimeout(r, 200))
  return [
    {
      id: 7,
      item: 'Flavor Blasted Goldfish',
      college: 'Morse',
      price: 12,
      description: 'cheesy aquamarine inhabitants encrusted with a carbohydrate compote',
      limitedTime: false,
      isActive: true,
    },
    {
      id: 1,
      item: 'Flavor Blasted Goldfish',
      college: 'Murray',
      price: 0.5,
      description: 'cheesy aquamarine inhabitants encrusted with a carbohydrate compote',
      limitedTime: false,
      isActive: true,
    },
    {
      id: 1,
      item: 'Americano',
      college: 'Morse',
      price: 1.5,
      description: 'Espresso and water',
      limitedTime: false,
      isActive: true,
    },
    {
      id: 2,
      item: 'Coke',
      college: 'Morse',
      price: 1.0,
      description: 'Polar bear',
      limitedTime: false,
      isActive: true,
    },
    {
      id: 3,
      item: 'Sprite',
      college: 'Morse',
      price: 1.0,
      description: 'Lemon lime yum yum',
      limitedTime: false,
      isActive: true,
    },
    {
      id: 4,
      item: 'Diet Coke',
      college: 'Morse',
      price: 1.0,
      description: 'Coke but culty',
      limitedTime: false,
      isActive: true,
    },
    {
      id: 4,
      item: 'Berkeley Yum Coke',
      college: 'Berkeley',
      price: 1.0,
      description: 'Coke but make it ~berkeley~',
      limitedTime: false,
      isActive: true,
    },
    {
      id: 5,
      item: "David's Tux",
      college: 'Morse',
      price: 3.0,
      description: 'Quesadilla with chicken nuggets',
      limitedTime: false,
      isActive: true,
    },
    {
      id: 6,
      item: 'Quesadilla',
      college: 'Morse',
      price: 1.5,
      description: 'Cheesy goodness with tortilla',
      limitedTime: false,
      isActive: true,
    },
  ]
}

export default menuItemsSlice.reducer
