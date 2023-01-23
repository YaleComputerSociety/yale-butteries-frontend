import React, { FC, useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { item } from '../styles/MenuStyles'
import { priceToText } from '../Functions'
import { MenuItem } from '../store/slices/MenuItems'
import * as Haptics from 'expo-haptics'

interface Props {
  menuItem: MenuItem
  incUpdate: (menuItem: MenuItem) => void
}

export const ItemCard: FC<Props> = ({ menuItem, incUpdate }: Props) => {
  const [count, setCount] = useState(0)

  const addItem = () => {
    if (count < 5) {
      Haptics.selectionAsync('Heavy')
      setCount(count + 1)
      incUpdate(menuItem)
    }
  }

  useEffect(() => {
    count
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
