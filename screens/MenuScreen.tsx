import Ionicon from 'react-native-vector-icons/Ionicons'
import React, { FC, useEffect, useState } from 'react'
import { View, ScrollView, ActivityIndicator, Text, Pressable } from 'react-native'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { asyncFetchMenuItems, MenuItem } from '../store/slices/MenuItems'
import { addOrderItem, OrderItem, resetOrderCartState } from '../store/slices/OrderCart'
import { ItemCard } from '../components/ItemCard'
import { home } from '../styles/HomeStyles'
import { menu } from '../styles/MenuStyles'
import { loading } from '../styles/GlobalStyles'
import { getPriceFromOrderItems, returnCollegeName } from '../Functions'
import * as Haptics from 'expo-haptics'

const butteryScreen: FC<{ navigation: any }> = ({ navigation }) => {
  //make a function that gets the price from the items in the cart
  const dispatch = useAppDispatch()
  const collegeName = navigation.getParam('college_Name')
  const { menuItems, isLoading: isLoadingMenuItems } = useAppSelector((state) => state.menuItems)
  const { orderItems, isLoading: isLoadingOrderCart } = useAppSelector((state) => state.orderCart)

  const [priceTotal, setPriceTotal] = useState(getPriceFromOrderItems(orderItems))

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

  // reset the order cart upon loading the page
  useEffect(() => {
    priceTotal
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
            {/* <View style={menu.iconContainer}>
              <ScrollView horizontal={true}>
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#6DD5FF' : '#6DD5FA' }, menu.icon]}>
                  <Ionicon name="pizza" size={30} color="#fff" />
                  <Text style={menu.text}>Food</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#7F7FD5' }, menu.icon]}>
                  <Ionicon name="cafe" size={30} color="#fff" />
                  <Text style={menu.text}>Drink</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#ffc00a' : '#bfe6ba' }, menu.icon]}>
                  <Ionicon name="ice-cream" size={30} color="#fff" />
                  <Text style={menu.text}>Dessert</Text>
                </Pressable>
              </ScrollView>
            </View> */}
            <View style={home.menuView}>
              {menuItems
                .filter((menuItem) => {
                  return menuItem.college === navigation.getParam('college_Name') && menuItem.isActive === true
                })
                .map((menuItem) => (
                  <ItemCard incUpdate={addOrder} menuItem={menuItem} key={menuItem.id} items={orderItems} />
                ))}
            </View>
          </ScrollView>
          <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-start' }}>
            <Pressable
              style={{
                backgroundColor: returnCollegeName(collegeName)[1],
                width: 80,
                height: 60,
                bottom: 0,
                borderRadius: 25,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 20,
                margin: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: 8,
              }}
            >
              <Ionicon name="cart" size={25} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'HindSiliguri-Bold' }}>{orderItems.length}</Text>
            </Pressable>
          </View>
          <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end' }}>
            <Pressable
              disabled={orderItems.length < 1 ? true : false}
              style={{
                opacity: orderItems.length < 1 ? 0.7 : 1,
                backgroundColor: '#32CD32',
                width: 160,
                height: 60,
                bottom: 0,
                borderRadius: 25,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 20,
                margin: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('CheckoutScreen', priceTotal)
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
              }}
            >
              <Text style={{ color: 'white', fontSize: 20, fontFamily: 'HindSiliguri-Bold' }}>Go to Cart</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

butteryScreen.navigationOptions = (navData) => {
  const collegeName = navData.navigation.getParam('college_Name')
  return {
    headerStyle: {
      backgroundColor: returnCollegeName(collegeName)[1],
      borderWidth: 0,
      shadowColor: '#111',
      shadowRadius: 200,
    },
    headerTitle: returnCollegeName(collegeName)[0],
    headerRight: () => (
      <Ionicon
        name="settings-sharp"
        size={20}
        color="#fff"
        onPress={() => {
          navData.navigation.navigate('SettingsScreen')
        }}
        style={{ paddingRight: 20 }}
      />
    ),
  }
}

export default butteryScreen
