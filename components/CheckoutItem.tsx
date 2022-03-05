import React from 'react'
import { View, ImageBackground, Text, Image, Pressable} from 'react-native'
import { priceToText } from '../Functions'
import { checkout } from '../styles/CheckoutStyles'

export const CheckoutItem = ({item}:any, props:any) => {
  return (
    <View style={checkout.item}>
      <View style={checkout.NAME}>
        <Text style={checkout.itemNameText}>{item.name}</Text>
      </View>
      <View style={checkout.COUNT}>
        <Text style={checkout.text}>{item.count}</Text>
      </View>
      <View style={checkout.PRICE}>
        <Text style={checkout.text}>{priceToText(item.count * item.price)}</Text>
      </View>
    </View>
  )
}

CheckoutItem.defaultProps = {
  Name: 'Chicken Sandwhich',
  Price: '$2.00',
  Count: '10',
}
