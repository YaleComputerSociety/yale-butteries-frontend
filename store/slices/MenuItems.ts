import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { getJSON } from 'utils/fetch'

export interface MenuItem {
  id: number
  item: string
  college: 'morse'
  price: number
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
  await new Promise((r) => setTimeout(r, 2000))
  return [
    {
      id: 1,
      item: 'Americano',
      college: 'morse',
      price: 1.50,
      limitedTime: false,
      isActive: true,
    },
    {
      id: 2,
      item: 'Coke',
      college: 'morse',
      price: 1.00,
      limitedTime: false,
      isActive: true,
    },
    {
      id: 3,
      item: 'Sprite',
      college: 'morse',
      price: 1.00,
      limitedTime: false,
      isActive: true,
    },
    {
      id: 4,
      item: 'Diet Coke',
      college: 'morse',
      price: 1.00,
      limitedTime: false,
      isActive: true,
    },
    {
      id: 5,
      item: "David's Tux",
      college: 'morse',
      price: 3.00,
      limitedTime: false,
      isActive: true,
    },
    {
      id: 6,
      item: 'Quesadilla',
      college: 'morse',
      price: 1.50,
      limitedTime: false,
      isActive: true,
    },
  ]
}

export default menuItemsSlice.reducer
