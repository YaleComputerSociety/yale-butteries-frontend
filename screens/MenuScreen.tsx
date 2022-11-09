import React, { FC, useEffect, useState } from 'react'
import { View, ScrollView, ActivityIndicator, Text } from 'react-native'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { asyncFetchMenuItems, MenuItem } from '../store/slices/MenuItems'
import { addOrderItem, OrderItem, removeOrderItem, resetOrderCartState } from '../store/slices/OrderCart'
import { ItemCard } from '../components/ItemCard'
import { home } from '../styles/HomeStyles'
import { menu } from '../styles/MenuStyles'
import { loading } from '../styles/GlobalStyles'
import { priceToText } from '../Functions'
import { MenuCheckoutButton } from '../components/MenuCheckoutButton'

const butteryScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [priceTotal, setPriceTotal] = useState(0)

  const dispatch = useAppDispatch()
  const { menuItems, isLoading: isLoadingMenuItems } = useAppSelector((state) => state.menuItems)
  const { orderItems, isLoading: isLoadingOrderCart } = useAppSelector((state) => state.orderCart)

  useEffect(() => {
    if (menuItems == null) {
      dispatch(asyncFetchMenuItems())
    }
  })

  const addOrder = (newItem: MenuItem) => {
    const temp: OrderItem = { orderItem: newItem }
    dispatch(addOrderItem(temp))
    setPriceTotal(priceTotal + newItem.price)
  }

  const removeOrder = (newItem: MenuItem) => {
    dispatch(removeOrderItem(orderItems.find((item) => item.orderItem.id == newItem.id)))
    setPriceTotal(priceTotal - newItem.price)
  }

  // reset the order cart upon loading the page
  useEffect(() => {
    dispatch(resetOrderCartState())
  }, [])

  return (
    <View style={home.container}>
      {isLoadingMenuItems || isLoadingOrderCart || menuItems == null ? (
        <View style={loading.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={menu.wrapper}>
          <ScrollView style={menu.upperContainer} showsVerticalScrollIndicator={false}>
            <View style={home.menuView}>
              {menuItems
                .filter((menuItem) => {
                  return menuItem.college === navigation.getParam('college_Name') && menuItem.isActive === true
                })
                .map((menuItem) => (
                  <ItemCard decUpdate={removeOrder} incUpdate={addOrder} menuItem={menuItem} key={menuItem.id} />
                ))}
            </View>
          </ScrollView>
          <MenuCheckoutButton
            totalPrice={priceToText(priceTotal)}
            itemCount={orderItems.length}
            checkoutPress={() => navigation.navigate('CheckoutScreen', { priceTotal: priceTotal })}
          />
        </View>
      )}
    </View>
  )
}

export default butteryScreen
