import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../../store/ReduxStore'
import { baseUrl } from '../../utils/utils'

export interface MenuItem {
  id?: number
  item: string
  college: string
  price: number
  description?: string
  limitedTime?: boolean
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
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      const menuItems = await fetch(baseUrl + 'api/menu_items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await menuItems.json()
      const newData: MenuItem[] = []
      data.forEach((item) => {
        const newItem: MenuItem = {
          id: item.id,
          item: item.item,
          college: item.college,
          price: parseInt(item.price),
          isActive: item.isActive,
          description: 'This is a test description',
          limitedTime: false,
          foodType: 'food',
        }
        newData.push(newItem)
      })
      console.debug(newData)
      dispatch(setMenuItemsState(newData))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export default menuItemsSlice.reducer
