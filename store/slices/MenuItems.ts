import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../../store/ReduxStore'
import { baseUrl } from '../../utils/utils'
import type { MenuItem } from '../../utils/types'


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
      const updateIndex = state.menuItems.findIndex((item) => item.id == action.payload.id)
      state.menuItems[updateIndex] = action.payload
    },
    deleteMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const updateIndex = state.menuItems.findIndex((item) => item.name == action.payload.name)
      state.menuItems.splice(updateIndex, 1)
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.menuItems = [...state.menuItems, action.payload]
    },
  },
})

export const { setMenuItemsState, setIsLoading, updateMenuItem, deleteMenuItem, addMenuItem } = menuItemsSlice.actions

export const asyncFetchMenuItems = () => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(setIsLoading(true))
    try {
      const menuItems = await fetch(baseUrl + 'api/menu-items', {
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
          name: item.item,
          collegeId: item.college,
          price: parseInt(item.price),
          isActive: item.isActive,
          description: item.description,
          limitedTime: false,
          foodType: item.foodType,
        }
        newData.push(newItem)
      })
      dispatch(setMenuItemsState(newData))
      return true
    } catch (e) {
      console.log(e)
      return false
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncUpdateMenuItem = (menuItem: MenuItem) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    console.log(menuItem)
    try {
      const updateItem = await fetch(baseUrl + 'api/menu-items/' + menuItem.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItem),
      })
      const data = await updateItem.json().then(() => {
        dispatch(updateMenuItem(menuItem))
      })
      return true
    } catch (e) {
      console.log(e)
      return false
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const asyncAddMenuItem = (menuItem: MenuItem) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    dispatch(setIsLoading(true))
    try {
      const menuItems = await fetch(baseUrl + 'api/menu-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItem),
      })
      const data = await menuItems.json()
      dispatch(addMenuItem(menuItem))
      return true
    } catch (e) {
      console.log(e)
      return false
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export default menuItemsSlice.reducer
