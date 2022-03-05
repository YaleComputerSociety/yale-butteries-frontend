import React, { FC, useEffect, useState } from 'react'
import { Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { asyncFetchMenuItems } from '../store/slices/MenuItems'
import { addOrderItem, OrderItem, removeOrderItem, resetOrderCartState } from '../store/slices/OrderCart'
import { MenuItem } from '../components/MenuItem'
import { home } from '../styles/HomeStyles'
import { item } from '../styles/MenuStyles'
import { loading } from '../styles/GlobalStyles'
import { priceToText } from '../Functions'
import { Navigator } from 'react-router-dom'

const butteryScreen: FC<{ navigation: Navigator }> = ({ navigation }) => {
  const [itemTotal, setItemTotal] = useState(0)
  const [priceTotal, setPriceTotal] = useState(0)
  const [currentItems, setCurrentItems] = useState([])

  const dispatch = useAppDispatch()
  const { menuItems, isLoading: isLoadingMenuItems } = useAppSelector((state) => state.menuItems)
  const { orderItems, isLoading: isLoadingOrderCart } = useAppSelector((state) => state.orderCart)

  useEffect(() => {
    if (menuItems == null) {
      dispatch(asyncFetchMenuItems())
    }
  })

  // resetOrderCartState: (state, action: PayloadAction<OrderItem[]>) => {
  //   state.orderItems = []
  // },
  // addOrderItem: (state, action: PayloadAction<OrderItem>) => {
  //   state.orderItems = [...state.orderItems, action.payload]
  // },
  // removeOrderItem: (state, action: PayloadAction<OrderItem>) => {

  const addOrder = (newItem) => {
    const temp: OrderItem = { orderItem: newItem }
    dispatch(addOrderItem(temp))
    setItemTotal(itemTotal + 1)
    setPriceTotal(priceTotal + newItem.price)
  }

  const removeOrder = (newItem) => {
    // console.log(orderItems.find((item) => item.orderItem.id == newItem.id))
    dispatch(removeOrderItem(orderItems.find((item) => item.orderItem.id == newItem.id)))
    setItemTotal(itemTotal - 1)
    setPriceTotal(priceTotal - newItem.price)
  }

  useEffect(() => {
    console.log('start')
    console.log(orderItems.length)
    console.log('OOOOOOOOOOOOOO')
  }, [orderItems])

  // useEffect(() => {
  //   // console.log('clear the stuff?')
  //   // console.log(orderItems)
  //   // console.log('BREAK')
  //   dispatch(resetOrderCartState())
  //   // console.log(orderItems)
  // }, [])

  return (
    <View style={home.container}>
      {isLoadingMenuItems || menuItems == null ? (
        <View style={loading.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView style={home.app} showsVerticalScrollIndicator={false}>
            <View style={home.menuView}>
              {menuItems
                .filter((menuItem) => {
                  return menuItem.college === navigation.getParam('college_Name') && menuItem.isActive === true
                })
                .map((menuItem) => (
                  <MenuItem decUpdate={removeOrder} incUpdate={addOrder} menuItem={menuItem} key={menuItem.id} />
                ))}
            </View>
          </ScrollView>
          <View style={home.footer}>
            <View style={item.outerContainer}>
              <View style={item.upperContainer}>
                <Text style={item.priceText}>Total: {priceToText(priceTotal)} </Text>
                <Text style={item.priceText}>Items: {itemTotal}</Text>
              </View>
              <Pressable
                onPress={() => navigation.navigate('CheckoutScreen')}
                style={[item.lowerContainer, { backgroundColor: itemTotal > 0 ? '#000' : '#bbb' }]}
              >
                <Text style={item.checkoutText}>Go to Checkout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

// return (
//   <Provider store={store}>
//     <TestingMenuItems/>
//   </Provider>
// )

export default butteryScreen
