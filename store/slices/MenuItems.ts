import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { getJSON } from 'utils/fetch'

export interface MenuItem {
  item: string
  college: 'morse'
  price: number
  isActive: boolean
  foodType: 'food' | 'drink' | 'dessert'
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
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const updateIndex = state.menuItems.findIndex((item) => item.item == action.payload.item)
      state.menuItems[updateIndex] = action.payload
    },
    deleteMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const updateIndex = state.menuItems.findIndex((item) => item.item == action.payload.item)
      state.menuItems.splice(updateIndex, 1)
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.menuItems = [...state.menuItems, action.payload]
    },
  },
})

export const { setMenuItemsState, setIsLoading, updateMenuItem, deleteMenuItem, addMenuItem } = menuItemsSlice.actions

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
      item: 'Americano',
      college: 'morse',
      price: 1.5,
      isActive: true,
      foodType: 'drink',
    },
    {
      item: 'Coke',
      college: 'morse',
      price: 1.0,
      isActive: true,
      foodType: 'drink',
    },
    {
      item: 'Sprite',
      college: 'morse',
      price: 1.0,
      isActive: true,
      foodType: 'drink',
    },
    {
      item: 'Diet Coke',
      college: 'morse',
      price: 1.0,
      isActive: true,
      foodType: 'drink',
    },
    {
      item: "David's Tux",
      college: 'morse',
      price: 3.0,
      isActive: true,
      foodType: 'food',
    },
    {
      item: 'Quesadilla',
      college: 'morse',
      price: 1.5,
      isActive: true,
      foodType: 'food',
    },
  ]
}

export default menuItemsSlice.reducer
