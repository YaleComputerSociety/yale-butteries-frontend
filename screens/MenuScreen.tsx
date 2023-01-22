import Ionicon from 'react-native-vector-icons/Ionicons'
import React, { FC, useEffect, useState } from 'react'
import { View, ScrollView, ActivityIndicator, Text, Pressable } from 'react-native'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { asyncFetchMenuItems, MenuItem } from '../store/slices/MenuItems'
import { addOrderItem, OrderItem, removeOrderItem, resetOrderCartState } from '../store/slices/OrderCart'
import { ItemCard } from '../components/ItemCard'
import { home } from '../styles/HomeStyles'
import { menu } from '../styles/MenuStyles'
import { loading } from '../styles/GlobalStyles'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

const butteryScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  }

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
            <View style={menu.iconContainer}>
              <ScrollView horizontal={true}>
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#6DD5FF' : '#6DD5FA' }, menu.icon]}>
                  <Ionicon name="pizza" size={30} color="#fff" />
                  <Text style={menu.text}>Food</Text>
                </Pressable>
                <Pressable
                  onPress={() => ReactNativeHapticFeedback.trigger('impactLight', options)}
                  style={({ pressed }) => [{ backgroundColor: pressed ? '#bbb' : '#7F7FD5' }, menu.icon]}
                >
                  <Ionicon name="cafe" size={30} color="#fff" />
                  <Text style={menu.text}>Drink</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#ffc00a' : '#bfe6ba' }, menu.icon]}>
                  <Ionicon name="ice-cream" size={30} color="#fff" />
                  <Text style={menu.text}>Dessert</Text>
                </Pressable>
              </ScrollView>
            </View>
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
          <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end' }}>
            <Pressable
              style={{
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
  return {
    headerStyle: {
      backgroundColor: '#bbb',
      borderWidth: 0,
      shadowColor: '#111',
      shadowRadius: 200,
    },
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
