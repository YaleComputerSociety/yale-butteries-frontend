import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { getJSON } from 'utils/fetch'

export interface MenuItem {
  id: number
  item: string
  price: number
  limited_time: boolean
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
  await new Promise((r) => setTimeout(r, 2000))
  return [
    {
      id: 1,
      item: 'Americano',
      price: 1.50,
      limited_time: false,
    },
    {
      id: 2,
      item: 'Coke',
      price: 1.00,
      limited_time: false,
    },
    {
      id: 3,
      item: 'Sprite',
      price: 1.00,
      limited_time: false,
    },
    {
      id: 4,
      item: 'Diet Coke',
      price: 1.00,
      limited_time: false,
    },
    {
      id: 5,
      item: "David's Tux",
      price: 3.00,
      limited_time: false,
    },
    {
      id: 6,
      item: 'Quesadilla',
      price: 1.50,
      limited_time: false,
    },
  ]
}

export default menuItemsSlice.reducer
