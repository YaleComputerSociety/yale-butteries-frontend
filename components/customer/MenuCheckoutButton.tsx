import React, { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import { item, menu } from '../../styles/MenuStyles'

interface Props {
  itemCount: number
  totalPrice: string
  checkoutPress: () => void
}

// the bottom component on the menu screen with a checkout button and the current price and number of items
export const MenuCheckoutButton: FC<Props> = (props: Props) => {
  return (
    <View style={menu.lowerContainer}>
      <View style={item.outerContainer}>
        <View style={item.upperContainer}>
          <Text style={item.priceText}>Items: {props.itemCount}</Text>
          <Text style={item.priceText}>Total: {props.totalPrice} </Text>
        </View>
        <Pressable
          onPress={props.checkoutPress}
          disabled={props.itemCount <= 0}
          style={({ pressed }) => [
            item.lowerContainer,
            { marginHorizontal: 50, marginVertical: 25, borderRadius: 40 },
            { backgroundColor: props.itemCount > 0 ? (pressed ? '#222' : '#333') : '#bbb' },
          ]}
        >
          <Text style={item.checkoutText}>Go to Checkout</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default MenuCheckoutButton
