import { createSelector } from '@reduxjs/toolkit'

import { TransactionHistoryEntry } from './slices/TransactionHistory'
import { TransactionItem } from './slices/TransactionItems'
import { MenuItem } from './slices/MenuItems'
import { Ingredient } from './slices/Ingredients'
import { MenuItemToIngredient } from './slices/MenuItemToIngredients'

interface MenuItemWithIngredients {
  menuItem: MenuItem
  ingredients: Ingredient[]
}

interface TransactionHistoryWithItems {
  transactionHistoryEntry: TransactionHistoryEntry
  transactionItems: TransactionItem[]
}

// const getEventOccurrences = (state) => state.eventOccurrences.eventOccurrences
// const getEvents = (state) => state.events.events

const getTransactionHistory = (state) => state.transactionHistoryEntry.transactionHistory
const getTransactionItems = (state) => state.transactionItems.transactionItems
const getMenuItems = (state) => state.menuItems.menuItems
const getIngredients = (state) => state.ingredients.ingredients
const getMenuItemToIngredients = (state) => state.menuItemToIngredients.menuItemToIngredients

export const getMenuItemWithIngredients = createSelector(
  [getMenuItems, getIngredients, getMenuItemToIngredients],
  (
    menuItems: MenuItem[],
    ingredients: Ingredient[],
    menuItemToIngredients: MenuItemToIngredient[]
  ): MenuItemWithIngredients[] | null => {
    if (menuItems == null || ingredients == null || menuItemToIngredients == null) {
      return null
    }
    return menuItems.map((menuItem) => {
      const curruntItemIngredients = menuItemToIngredients.filter((ids) => (ids.menuItemId = menuItem.id))
      const menuItemIngredients = curruntItemIngredients.map((ids) => {
        const ingredientId = ingredients.findIndex((ingredient) => ingredient.id == ids.ingredientId)
        return ingredients[ingredientId]
      })
      return {
        menuItem: menuItem,
        ingredients: menuItemIngredients,
      }
    })
  }
)

export const getTransactionHistoryWithItems = createSelector(
  [getTransactionHistory, getTransactionItems],
  (
    transactionHistory: TransactionHistoryEntry[],
    transactionItems: TransactionItem[]
  ): TransactionHistoryWithItems[] | null => {
    if (transactionHistory == null || transactionItems == null) {
      return null
    }
    return transactionHistory.map((transactionHistoryEntry) => {
      const transactionItemsForEntry = transactionItems.filter(
        (transactionItem) => transactionItem.transactionHistoryId == transactionHistoryEntry.id
      )
      return {
        transactionHistoryEntry: transactionHistoryEntry,
        transactionItems: transactionItemsForEntry,
      }
    })
  }
)
