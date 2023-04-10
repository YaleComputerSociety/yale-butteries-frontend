/* eslint-disable import/namespace */
import Ionicon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import * as Haptics from 'expo-haptics'
import { View, Text, Pressable } from 'react-native'
import { priceToText } from '../../Functions'
import { checkout } from '../../styles/CheckoutStyles'
import { MenuItem } from '../../store/slices/MenuItems'

interface Props {
  decUpdate: (menuItem: MenuItem) => void
  menuItem: MenuItem
  checkoutItem: any
  isDisabled: any
}

const CheckoutItem: any = ({ decUpdate, checkoutItem, isDisabled }: Props) => {
  const removeItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    decUpdate(checkoutItem)
  }

  return (
    <View style={checkout.item}>
      <Pressable disabled={isDisabled} onPress={removeItem} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, checkout.icon]}>
        <Ionicon name="trash" size={20} color="#000" />
      </Pressable>
      <View style={checkout.NAME}>
        <Text style={checkout.itemNameText}>{checkoutItem.orderItem.item}</Text>
      </View>
      <View style={checkout.PRICE}>
        <Text style={checkout.text}>{priceToText(checkoutItem.orderItem.price)}</Text>
      </View>
    </View>
  )
}

export default CheckoutItem
