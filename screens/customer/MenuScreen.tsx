import Ionicon from 'react-native-vector-icons/Ionicons'
import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator, Text, Pressable } from 'react-native'
import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { asyncFetchMenuItems, MenuItem } from '../../store/slices/MenuItems'
import { addOrderItem, OrderItem, resetOrderCartState } from '../../store/slices/OrderCart'
import { MenuItemCard } from '../../components/customer/MenuItemCard'
import { home } from '../../styles/ButtereiesStyles'
import { menu } from '../../styles/MenuStyles'
import { loading } from '../../styles/GlobalStyles'
import { getPriceFromOrderItems, returnCollegeName } from '../../Functions'
import * as Haptics from 'expo-haptics'
import { NavigationStackProp } from 'react-navigation-stack'
import { NavigationParams } from 'react-navigation'

const MenuScreen: FC<{ navigation: NavigationStackProp<{ collegeName: string }, NavigationParams> }> = ({
  navigation,
}) => {
  //make a function that gets the price from the items in the cart
  const dispatch = useAppDispatch()
  const { menuItems, isLoading: isLoadingMenuItems } = useAppSelector((state) => state.menuItems)
  const {
    orderItems,
    isLoading: isLoadingOrderCart,
    college: collegeOrderCart,
  } = useAppSelector((state) => state.orderCart)

  const [priceTotal, setPriceTotal] = useState(getPriceFromOrderItems(orderItems))

  useEffect(() => {
    if (menuItems == null) {
      dispatch(asyncFetchMenuItems())
    }
  }, [])

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
            <View style={home.menuView}>
              {menuItems
                .filter((menuItem) => {
                  return menuItem.college === collegeOrderCart && menuItem.isActive === true
                })
                .map((menuItem) => (
                  <MenuItemCard incUpdate={addOrder} menuItem={menuItem} key={menuItem.id} items={orderItems} />
                ))}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Pressable
              disabled={orderItems.length < 1 ? true : false}
              style={[
                { opacity: orderItems.length < 1 ? 0.6 : 1, backgroundColor: returnCollegeName(collegeOrderCart)[1] },
                styles.cartButton,
              ]}
              onPress={() => {
                navigation.navigate('CheckoutScreen', { collegeName: collegeOrderCart })
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }}
            >
              <Text style={[styles.cartText, { marginRight: 30 }]}>Go to Cart</Text>
              <Ionicon name="cart" size={25} color="#fff" />
              <Text style={styles.cartText}>{orderItems.length}</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cartButton: {
    width: '60%',
    height: 60,
    bottom: 0,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
  },
  cartText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'HindSiliguri-Bold',
    marginHorizontal: 10,
  },
})

MenuScreen['navigationOptions'] = (navData) => {
  const collegeName = navData.navigation.getParam('collegeName')
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

export default MenuScreen
