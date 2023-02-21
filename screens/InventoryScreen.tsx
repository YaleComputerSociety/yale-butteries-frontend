import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { asyncFetchMenuItems } from '../store/slices/MenuItems'
import ItemTag from '../components/ItemTag'
import { COLORS } from '../constants/Colors'
import { TEXTS } from '../constants/Texts'
import { LAYOUTS } from '../constants/Layouts'
import { NavigationStackProp } from 'react-navigation-stack'
import { NavigationParams } from 'react-navigation'

const InventoryScreen: React.FC<{ navigation: NavigationStackProp<{ collegeName: string }, NavigationParams> }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch()
  const { menuItems, isLoading: isLoadingMenuItems } = useAppSelector((state) => state.menuItems)
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const [localMenu, setLocalMenu] = useState([])
  const [itemTypes, setItemTypes] = useState([])

  useEffect(() => {
    if (isLoadingMenuItems || menuItems == null) {
      dispatch(asyncFetchMenuItems())
    }
  }, [isLoadingMenuItems])

  useEffect(() => {
    console.log(menuItems)
    if (menuItems != null) {
      setLocalMenu(menuItems.filter((element) => element.college == currentUser.college))
    }
    console.log(localMenu)
    // //console.log(transactionItems)
    // if (transactionItems != null) {
    //   setCurrentOrders(transactionItems.filter(element => element.orderStatus != "picked_up" && element.orderStatus != "cancelled"))
    //   setPastOrders(transactionItems.filter(element => element.orderStatus == "picked_up" || element.orderStatus == "cancelled"))
    // }
    // //console.log(currentOrders)
  }, [menuItems])

  useEffect(() => {
    const buffer = []
    for (let i = 0; i < localMenu.length; i++) {
      if (!buffer.includes(localMenu[i].foodType)) {
        buffer.push(localMenu[i].foodType)
      }
    }
    setItemTypes(buffer)
    buffer.sort()
    console.log(itemTypes)
  }, [localMenu])
  return (
    <View style={{ ...styles.container }}>
      {isLoadingMenuItems || itemTypes == null ? (
        <ScrollView
          style={{ ...styles.scrollView }}
          //contentContainerStyle={{alignItems: 'flex-start', justifyContent: 'stretch'}}>
        >
          <Text style={{ ...styles.title }}>Loading menu</Text>
          <ActivityIndicator style={styles.loader} size="large" />
        </ScrollView>
      ) : (
        <ScrollView style={{ ...styles.scrollView }}>
          {itemTypes.map((el, index) => {
            return (
              <View key={el}>
                <Text style={{ ...styles.title }}>{el}</Text>
                {localMenu.map((item, index) => {
                  if (item.foodType == el) {
                    return <ItemTag key={JSON.stringify(item)} item={item} />
                  }
                })}
              </View>
            )
          })}
          <View style={styles.buttonHolder}>
            <TouchableOpacity
              style={{ ...styles.button, marginBottom: LAYOUTS.getWidth(30) }}
              onPress={() => {
                navigation.push('CreateItem')
              }}
            >
              <Text style={{ ...styles.buttonText }}>Add new item</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default InventoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: TEXTS.adjust(30),
    marginBottom: LAYOUTS.getWidth(8),
    color: COLORS.black,
    fontWeight: '500',
    //fontFamily: 'HindSiliguri',
  },
  title2: {
    fontSize: TEXTS.adjust(30),
    marginBottom: LAYOUTS.getWidth(8),
    marginTop: LAYOUTS.getWidth(8),
    color: COLORS.black,
    fontWeight: '500',
    //fontFamily: 'HindSiliguri',
  },
  scrollView: {
    paddingTop: LAYOUTS.getWidth(10),
    paddingHorizontal: LAYOUTS.getWidth(10),
    backgroundColor: COLORS.offWhite,
    flex: 1,
    //borderWidth: 1
  },
  loader: {
    marginTop: LAYOUTS.getWidth(100),
  },
  tag: {
    //borderWidth: 3,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttonHolder: {
    alignItems: 'center',
  },
  button: {
    width: LAYOUTS.getWidth(150),
    height: LAYOUTS.getWidth(20),
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: LAYOUTS.getWidth(10),
    marginTop: LAYOUTS.getWidth(5),
  },
  buttonText: {
    fontSize: TEXTS.adjust(15),
    fontWeight: '400',
    color: 'blue',
    textAlign: 'center',
  },
})
