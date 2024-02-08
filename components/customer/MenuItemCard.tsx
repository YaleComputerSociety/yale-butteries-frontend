import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

import { item } from '../../styles/MenuStyles'
import { priceToText } from '../../utils/functions'
import * as Haptics from 'expo-haptics'
import type { MenuItem, OrderCartItem } from '../../utils/types'

interface Props {
  menuItem: MenuItem
  items: OrderCartItem[]
  incUpdate: (menuItem: MenuItem) => void
  decUpdate: (oldItem: MenuItem) => void
}

export const MenuItemCard: React.FC<Props> = ({ menuItem, items, incUpdate, decUpdate }: Props) => {
  const [count, setCount] = useState(0)

  const addItem = (): void => {
    if (count < 5) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch((e) => {
        console.error(e)
      })
      setCount(count + 1)
      incUpdate(menuItem)
    }
  }

  const removeItem = (): void => {
    if (count > 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch((e) => {
        console.error(e)
      })
      setCount(count - 1)
      decUpdate(menuItem)
    }
  }

  useEffect(() => {
    let newCount = 0
    for (let i = 0; i < items.length; i++) {
      if (items[i].orderItem.id === menuItem.id) {
        newCount++
      }
    }

    setCount(newCount)
  }, [items, menuItem.id])

  return (
    <View style={item.card}>
      <View style={item.leftSide}>
        <View style={item.spacer} />
        <Text style={item.itemName}>{menuItem.name}</Text>
        <Text style={item.itemDescription}>{menuItem.description}</Text>
        <Text style={item.itemPrice}>{priceToText(menuItem.price)}</Text>
      </View>
      <View style={item.spacer} />
      <View style={styles.numbersContainer}>
        <Pressable
          onPress={removeItem}
          disabled={count < 1}
          style={({ pressed }) => [
            { zIndex: 2, opacity: count < 1 ? 0.5 : 1, backgroundColor: pressed ? '#383838' : '#2c2c2c' },
            item.button,
          ]}
        >
          <Ionicon name="remove-outline" size={18} color="#fff" style={item.addrem} />
        </Pressable>
        <View style={styles.itemCountContainer}>
          <Text style={item.itemCountText}>{count}</Text>
        </View>
        <Pressable
          onPress={addItem}
          disabled={count >= 5}
          style={({ pressed }) => [
            { zIndex: 2, opacity: count >= 5 ? 0.5 : 1, backgroundColor: pressed ? '#383838' : '#2c2c2c' },
            item.button,
          ]}
        >
          <Ionicon name="add-outline" size={18} color="#fff" style={item.addrem} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  numbersContainer: { flexDirection: 'row', alignItems: 'center' },
  itemCountContainer: { width: 30, justifyContent: 'center', flexDirection: 'row' },
})
