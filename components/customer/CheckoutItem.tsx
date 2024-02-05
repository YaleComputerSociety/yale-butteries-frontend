import Ionicon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import * as Haptics from 'expo-haptics'
import { View, Text, Pressable } from 'react-native'
import { priceToText } from '../../utils/functions'
import { checkout } from '../../styles/CheckoutStyles'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import type { OrderItem, OrderCartItem, MenuItem } from '../../utils/types'

interface Props {
  decUpdate: (item: MenuItem) => void
  item: OrderCartItem
  isDisabled: any
}

const CheckoutItem: any = ({ decUpdate, item, isDisabled }: Props) => {
  const removeItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    decUpdate(item.orderItem)
  }

  const rightSwipe = () => {
    return (
      <Pressable style={checkout.deleteContainer} onPress={removeItem}>
        <Text style={[checkout.deleteContainerText]}>Remove</Text>
      </Pressable>
    )
  }

  return (
    <View>
      {/* <PanGestureHandler onGestureEvent={panGesture}> */}
      <Swipeable overshootRight={false} renderRightActions={rightSwipe}>
        <View style={[checkout.item]}>
          <Pressable
            disabled={isDisabled}
            onPress={removeItem}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, checkout.icon]}
          >
            <Ionicon name="trash" size={18} color="rgba(255,255,255,0.69)" />
          </Pressable>
          <View style={checkout.NAME}>
            <Text style={checkout.itemNameText}>{item.orderItem.name}</Text>
          </View>
          <View style={checkout.PRICE}>
            <Text style={checkout.text}>{priceToText(item.orderItem.price)}</Text>
          </View>
        </View>
      </Swipeable>
      {/* </PanGestureHandler> */}
    </View>
  )
}

export default CheckoutItem
