import React, { FC, useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { item } from '../../styles/MenuStyles'
import { priceToText } from '../../Functions'
import { MenuItem } from '../../store/slices/MenuItems'
import * as Haptics from 'expo-haptics'
import * as Animatable from 'react-native-animatable';
import { OrderItem } from '../../store/slices/OrderCart'

interface Props {
  menuItem: MenuItem
  items: OrderItem[]
  incUpdate: (menuItem: MenuItem) => void
}

export const MenuItemCard: FC<Props> = ({ menuItem, items, incUpdate }: Props) => {
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
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
      //Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
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
      <View style={{flexDirection:'row'}}>
        <Pressable
          onPress={addItem}
          disabled={count >= 5 ? true : false}
          style={({ pressed }) => [
            { zIndex: 2, opacity: count >= 5 ? 0.5 : 1, backgroundColor: pressed ? '#bbb' : '#eee' },
            item.button,
          ]}
        >
          <Text style={item.buttonText}>Add to Cart</Text>

        </Pressable>
        <Animatable.View animation='bounceInUp' style={{width: 75, borderColor: '#ccc', backgroundColor: '#ddd', position:'absolute', zIndex:1, borderBottomLeftRadius: 8, borderTopLeftRadius: 8,}}>
          <Text style={item.itemCountText}>{count}</Text>
        </Animatable.View>
      </View>
    </View>
  )
}
