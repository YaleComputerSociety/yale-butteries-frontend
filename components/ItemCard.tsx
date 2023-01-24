import React, { FC, useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { item } from '../styles/MenuStyles'
import { priceToText } from '../Functions'
import { MenuItem } from '../store/slices/MenuItems'
import * as Haptics from 'expo-haptics'
import { OrderItem } from '../store/slices/OrderCart'

interface Props {
  menuItem: MenuItem
  items: OrderItem[]
  incUpdate: (menuItem: MenuItem) => void
}

export const ItemCard: FC<Props> = ({ menuItem, incUpdate, items }: Props) => {
  function getNumberOfMenuItemInCart(items) {
    let count = 0
    for (let i = 0; i < items.length; i++) {
      if (items[i].orderItem.id === menuItem.id) {
        count++
      }
    }
    return count
  }

  const [count, setCount] = useState(0)

  const addItem = () => {
    if (count < 5) {
      Haptics.selectionAsync('Heavy')
      setCount(count + 1)
      incUpdate(menuItem)
    }
  }

  useEffect(() => {
    setCount(getNumberOfMenuItemInCart(items))
  })

  return (
    <View style={item.card}>
      <View style={item.leftSide}>
        <View style={item.spacer} />
        <Text style={item.itemName}>{menuItem.item}</Text>
        <Text style={item.itemDescription}>{menuItem.description}</Text>
        <Text style={item.itemPrice}>{priceToText(menuItem.price)}</Text>
      </View>
      <View style={item.spacer} />
      <Pressable
        onPress={addItem}
        style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#eee' }, item.button]}
      >
        <Text style={item.buttonText}>Add to Cart</Text>
      </Pressable>
    </View>
  )
}
