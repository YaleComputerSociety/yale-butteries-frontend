import Ionicon from 'react-native-vector-icons/Ionicons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Alert, ActivityIndicator, Text, Pressable, RefreshControl, SectionList } from 'react-native'
import * as Haptics from 'expo-haptics'
import { useIsFocused } from '@react-navigation/native'

import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { asyncFetchMenuItems } from '../../store/slices/MenuItems'
import { addOrderItem, removeOrderItem, resetOrderCartState } from '../../store/slices/OrderCart'
import { MenuItemCard } from '../../components/customer/MenuItemCard'
import { home } from '../../styles/ButteriesStyles'
import { menu } from '../../styles/MenuStyles'
import { loading } from '../../styles/GlobalStyles'
import {
  getCollegeAcceptingOrders,
  getPriceFromOrderItems,
  returnCollegeName,
  getCollegeFromId,
} from '../../utils/functions'
import type { MainStackScreenProps, MenuItem, OrderCartItem } from '../../utils/types'
import EvilModal from '../../components/EvilModal'
import { MenuHeader } from '../../components/customer/MenuHeader'

const MenuScreen: React.FC<MainStackScreenProps<'MenuScreen'>> = ({ navigation, route }) => {
  // todo: make a function that gets the price from the items in the cart
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()
  const { menuItems } = useAppSelector((state) => state.menuItems)
  const { orderItems, college: collegeOrderCart } = useAppSelector((state) => state.orderCart)
  const { colleges } = useAppSelector((state) => state.colleges)

  const [currentMenuItems, setCurrentMenuItems] = useState<MenuItem[]>([])
  const [menuItemIndex, setMenuItemIndex] = useState(0)
  const [priceTotal, setPriceTotal] = useState(getPriceFromOrderItems(orderItems))
  const [refreshing, setRefreshing] = useState(false)
  const [begin, setBegin] = useState(true)
  const [connection, setConnection] = useState(true)

  const { collegeName } = route.params

  useEffect(() => {
    void dispatch(asyncFetchMenuItems()).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
  }, [dispatch, isFocused])

  useEffect(() => {
    if (menuItems != null) {
      if (colleges == null) throw new Error('Colleges are not defined')
      setCurrentMenuItems(
        menuItems.filter((menuItem) => {
          const foundCollege = getCollegeFromId(menuItem.collegeId, colleges)
          if (foundCollege == null) throw new Error('Current college does not exist')
          return foundCollege.name.toLowerCase() === collegeOrderCart.toLowerCase() && menuItem.isActive
        }),
      )
      setBegin(false)
    }
  }, [collegeOrderCart, colleges, menuItems])

  // reset the order cart upon loading the page
  useEffect(() => {
    dispatch(resetOrderCartState())
  }, [dispatch])

  // when the user pulls down from the top, trigger loading
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await dispatch(asyncFetchMenuItems()).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
    setRefreshing(false)
  }, [dispatch])

  const addOrder = (newItem: MenuItem): void => {
    const i = menuItemIndex
    setMenuItemIndex(i + 1)
    const temp: OrderCartItem = { orderItem: newItem, index: i }
    dispatch(addOrderItem(temp))
    setPriceTotal(priceTotal + newItem.price)
  }

  const removeOrder = (newItem: MenuItem): void => {
    const item = orderItems.find((orderCartItem) => orderCartItem.orderItem.name === newItem.name)
    // problem is they all have the same id
    if (item === undefined) {
      throw new TypeError("Couldn't find orderItem to delete")
    }
    dispatch(removeOrderItem(item))
  }

  interface SectionType {
    title: string
    data: MenuItem[]
  }

  const sectionListRef = useRef<SectionList<MenuItem>>(null)

  const sections: SectionType[] = [
    {
      title: 'Food',
      data: currentMenuItems.filter((menuItem) => menuItem.foodType === 'FOOD'),
    },
    {
      title: 'Drink',
      data: currentMenuItems.filter((menuItem) => menuItem.foodType === 'DRINK'),
    },
    {
      title: 'Dessert',
      data: currentMenuItems.filter((menuItem) => menuItem.foodType === 'DRINK'),
    },
  ]

  const scrollToSection = (sectionIndex: number): void => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 1,
      animated: true,
    })
  }

  return (
    <View style={home.container}>
      <EvilModal toggle={setConnection} display={!connection} />
      {begin ? (
        <View style={loading.container}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      ) : (
        <View style={menu.wrapper}>
          <SectionList
            ref={sectionListRef}
            showsVerticalScrollIndicator={false}
            sections={sections}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return <MenuItemCard incUpdate={addOrder} decUpdate={removeOrder} menuItem={item} items={orderItems} />
            }}
            refreshControl={
              <RefreshControl
                tintColor="rgba(255,255,255,0.72)"
                refreshing={refreshing}
                onRefresh={() => {
                  void (async () => {
                    await onRefresh()
                  })()
                }}
              />
            }
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.headerStyle}>
                <Text style={styles.categoryText}>{title}</Text>
              </View>
            )}
            ListFooterComponent={<View style={styles.listFooterSpacer} />}
            ListHeaderComponent={
              <MenuHeader
                name={collegeName}
                toFood={() => {
                  scrollToSection(0)
                }}
                toDrink={() => {
                  scrollToSection(1)
                }}
                toDessert={() => {
                  scrollToSection(2)
                }}
              />
            }
          />
          <View style={styles.footer}>
            <Pressable
              disabled={orderItems.length < 1}
              style={({ pressed }) => [
                {
                  opacity: orderItems.length < 1 || pressed ? 0.7 : 1,
                  backgroundColor: returnCollegeName(collegeOrderCart)[1],
                },
                styles.cartButton,
              ]}
              onPress={() => {
                if (colleges == null) throw new Error('Colleges are not defined')
                if (!getCollegeAcceptingOrders(colleges, collegeOrderCart)) {
                  Alert.alert('Try again later', 'This buttery is currently busy, try again later.', [{ text: 'OK' }])
                } else {
                  navigation.navigate('CheckoutScreen', { collegeName: collegeOrderCart })
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch((e) => {
                    console.error(e)
                  })
                }
              }}
            >
              <Text style={[styles.cartText, styles.goToCartMargin]}>Go to Cart</Text>
              <Ionicon name="cart" size={25} color="#fff" />
              <View style={styles.cartButtonContainer}>
                <Text style={styles.cartText}>{orderItems.length}</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  goToCartMargin: { marginRight: 25 },
  cartButtonContainer: { width: 20 },
  listFooterSpacer: { height: 100 },
  categoryText: {
    fontSize: 18,
    textAlignVertical: 'center',
    fontFamily: 'HindSiliguri-Bold',
    color: 'rgba(255,255,255,0.87)',
  },
  headerStyle: {
    marginTop: 10,
    alignSelf: 'center',
    height: 40,
    padding: 6,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#2c2c2c',
  },
  cartButton: {
    width: '60%',
    height: 55,
    bottom: 0,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.4,
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
    fontSize: 18,
    marginLeft: 5,
    fontFamily: 'HindSiliguri-Bold',
    textAlignVertical: 'center',
  },
})

export default MenuScreen
