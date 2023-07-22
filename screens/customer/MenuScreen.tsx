import Ionicon from 'react-native-vector-icons/Ionicons'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, ActivityIndicator, Text, Pressable, RefreshControl, SectionList } from 'react-native'
import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { asyncFetchMenuItems, MenuItem } from '../../store/slices/MenuItems'
import { addOrderItem, OrderItem, resetOrderCartState } from '../../store/slices/OrderCart'
import { MenuItemCard } from '../../components/customer/MenuItemCard'
import { home } from '../../styles/ButteriesStyles'
import { menu } from '../../styles/MenuStyles'
import { loading } from '../../styles/GlobalStyles'
import { getPriceFromOrderItems, returnCollegeName } from '../../Functions'

import * as Haptics from 'expo-haptics'

import { NavigationStackProp } from 'react-navigation-stack'
import { NavigationParams } from 'react-navigation'
import { useIsFocused } from '@react-navigation/native'
import EvilModal from '../../components/EvilModal'
import { MenuHeader } from '../../components/customer/MenuHeader'

const MenuScreen: FC<{ navigation: NavigationStackProp<{ collegeName: string }, NavigationParams> }> = ({
  navigation,
}) => {
  //make a function that gets the price from the items in the cart
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()
  const { menuItems } = useAppSelector((state) => state.menuItems)
  const { orderItems, college: collegeOrderCart } = useAppSelector((state) => state.orderCart)

  const [index, setIndex] = useState(0)
  const [priceTotal, setPriceTotal] = useState(getPriceFromOrderItems(orderItems))
  const [refreshing, setRefreshing] = useState(false)
  const [begin, setBegin] = useState(true)
  const [connection, setConnection] = useState(true)

  useEffect(() => {
    dispatch(asyncFetchMenuItems()).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
  }, [isFocused])

  useEffect(() => {
    if (menuItems) {
      setBegin(false)

    }
  }, [menuItems])

  // reset the order cart upon loading the page
  useEffect(() => {
    dispatch(resetOrderCartState())
  }, [])

  // when the user pulls down from the top, trigger loading
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await dispatch(asyncFetchMenuItems()).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
    setRefreshing(false)
  }, [])

  const addOrder = (newItem: MenuItem) => {
    const i = index
    setIndex(i + 1)
    const temp: OrderItem = { orderItem: newItem, index: i }
    dispatch(addOrderItem(temp))
    setPriceTotal(priceTotal + newItem.price)
  }

  const data = menuItems.filter((menuItem) => {
    return menuItem.college === collegeOrderCart && menuItem.isActive === true
  })

  const sectionListRef = useRef(null);

  const sections = [
    {
      title: 'Food',
      data: data.filter((menuItem) => {
        return menuItem.foodType === 'FOOD'
      })
    },
    {
      title: 'Drink',
      data: data.filter((menuItem) => {
        return menuItem.foodType === 'DRINK'
      })
    },
    {
      title: 'Dessert',
      data: data.filter((menuItem) => {
        return menuItem.foodType === 'DESSERT'
      })
    }
  ]

  return (
    <View style={home.container}>
      <EvilModal toggle={setConnection} display={!connection} />
      {begin ? (
        <View style={loading.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={menu.wrapper}>
          <SectionList
            ref={sectionListRef}
            showsVerticalScrollIndicator={false}
            sections={sections}      
            keyExtractor={(item, index) => item.item + index}
            renderItem={(item) => {
              return <MenuItemCard incUpdate={addOrder} menuItem={item.item} items={orderItems}/>
            }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderSectionHeader={({section: {title}}) => (
              <View style={[styles.headerStyle, {backgroundColor: returnCollegeName(collegeOrderCart)[1]}]}>
                <Text style={{ fontSize: 25, fontFamily: 'Staat', color: 'white' }}>{title}</Text>
              </View>
            )}
            ListFooterComponent={
              <View style={{height: 100 }}></View>
            }
            ListHeaderComponent={
              <MenuHeader 
                toFood={() => {sectionListRef.current.scrollToLocation({sectionIndex: 0, itemIndex: 0, animated: true})}} 
                toDrink={() => {sectionListRef.current.scrollToLocation({sectionIndex: 1, itemIndex: 0, animated: true})}} 
                toDessert={() => {sectionListRef.current.scrollToLocation({sectionIndex: 2, itemIndex: 0, animated: true})}}
              />
            }
          />
          <View style={styles.footer}>
            <Pressable
              disabled={orderItems.length < 1 ? true : false}
              style={({ pressed }) => 
              [{ opacity: orderItems.length < 1 ? 0.6 : 1 || pressed ? 1 : 0.5, 
                 backgroundColor: returnCollegeName(collegeOrderCart)[1] },
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
  headerStyle: {
    alignSelf: 'center',
    margin: 10,
    height: 50,
    padding: 8, 
    width: '95%',
    alignItems: 'center', 
    justifyContent: 'center', 
    // shadowColor: '#555',
    // shadowRadius: 5,
    borderRadius: 8,
    // shadowOpacity: 0.6,
  },
  cartButton: {
    width: '60%',
    height: 60,
    bottom: 0,
    borderRadius: 25,
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
