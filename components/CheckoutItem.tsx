/* eslint-disable import/namespace */
import Ionicon from 'react-native-vector-icons/Ionicons'
import React, { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { priceToText } from '../Functions'
import { checkout } from '../styles/CheckoutStyles'
import { asyncFetchMenuItems, MenuItem } from '../store/slices/MenuItems'
import { removeOrderItem } from '../store/slices/OrderCart'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CheckoutItem: any = ({ checkoutItem }: any) => {
  const dispatch = useAppDispatch()
  const { menuItems, isLoading: isLoadingMenuItems } = useAppSelector((state) => state.menuItems)
  const { orderItems, isLoading: isLoadingOrderCart } = useAppSelector((state) => state.orderCart)

  useEffect(() => {
    if (menuItems == null) {
      dispatch(asyncFetchMenuItems())
    }
  })

  const removeOrder = (newItem: MenuItem) => {
    dispatch(removeOrderItem(orderItems.find((item) => item.orderItem.id == newItem.id)))
    //setPriceTotal(priceTotal - newItem.price)
  }

  return (
    <View style={checkout.item}>
      <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, checkout.icon]}>
        <Ionicon name="trash" size={20} color="#000" />
      </Pressable>
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
