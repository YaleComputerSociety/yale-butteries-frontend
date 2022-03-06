import React from 'react'
import { View, Text } from 'react-native'
import { OrderItem } from '../store/slices/OrderCart'
import { priceToText } from '../Functions'
import { checkout } from '../styles/CheckoutStyles'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CheckoutItem: any = ({ checkoutItem }: any) => {
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)

  return (
    <View style={checkout.item}>
      <View style={checkout.NAME}>
        <Text style={checkout.itemNameText}>{checkoutItem.orderItem.item}</Text>
      </View>
      {/* <View style={checkout.COUNT}>
        <Text style={checkout.text}>{checkoutItem.orderItem.count}</Text>
      </View> */}
      <View style={checkout.PRICE}>
        <Text style={checkout.text}>{priceToText(checkoutItem.orderItem.price)}</Text>
      </View>
    </View>
  )
}

export default CheckoutItem
