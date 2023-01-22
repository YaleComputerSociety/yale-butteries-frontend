import * as React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { checkout } from '../styles/CheckoutStyles'
import CheckoutItem from '../components/CheckoutItem'
import { orderStatusScreenSty } from '../styles/OrderStatusStyles'
import { useAppSelector } from '../store/TypedHooks'

export const OrderConfirmation = ({ navigation }: any) => {
  const { orderItems, price } = useAppSelector((state) => state.orderCart)

  return (
    <View style={checkout.wrapper}>
      <View style={{ flex: 1 }}>
        <View style={checkout.upperContainer}>
          <View style={orderStatusScreenSty.header}>
            <Text style={checkout.totalText}>Order Summary:</Text>
          </View>
          <ScrollView style={checkout.orderList}>
            {orderItems.map((checkoutItem, index) => (
              <CheckoutItem checkoutItem={checkoutItem} key={index} />
            ))}
          </ScrollView>
          <View>
            <Text style={checkout.totalText}>Total: {price}</Text>
          </View>
        </View>
      </View>
      <View style={checkout.lowerContainer}></View>
    </View>
  )
}
