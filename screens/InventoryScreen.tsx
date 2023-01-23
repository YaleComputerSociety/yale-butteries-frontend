import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { asyncFetchMenuItems } from '../store/slices/MenuItems'; 
import ItemTag from '../components/ItemTag';

import { COLORS } from '../constants/Colors';
import { TEXTS } from '../constants/Texts';
import { LAYOUTS } from '../constants/Layouts';

export default function InventoryScreen() {
  const dispatch = useAppDispatch();
  const { menuItems, isLoading: isLoadingMenuItems } = useAppSelector((state) => state.menuItems)
  const[localMenu, setLocalMenu] = useState([]);
  if (isLoadingMenuItems) {
    console.log("loading")
  }

  useEffect(() => {
    console.log("loading")
    if (isLoadingMenuItems || menuItems == null) {
      dispatch(asyncFetchMenuItems())
      console.log("fetching")
    }
  }, [isLoadingMenuItems])

  useEffect(() => {
    console.log("menutems Updated")
    if (menuItems != null) {
      setLocalMenu(menuItems.filter(element => element.college == "morse"))
    }
    console.log(localMenu)
    // //console.log(transactionItems)
    // if (transactionItems != null) {
    //   setCurrentOrders(transactionItems.filter(element => element.orderStatus != "picked_up" && element.orderStatus != "cancelled"))
    //   setPastOrders(transactionItems.filter(element => element.orderStatus == "picked_up" || element.orderStatus == "cancelled"))
    // }
    // //console.log(currentOrders)
  }, [menuItems])
  return (
    <View style={{...styles.container}}>
      {isLoadingMenuItems || menuItems == null ? (
        <ScrollView style={{ ...styles.scrollView}}
        //contentContainerStyle={{alignItems: 'flex-start', justifyContent: 'stretch'}}>
        >
          <Text style={{...styles.title}}>
          Menu</Text>
          <ActivityIndicator style={styles.loader} size="large"/>
        </ScrollView>
      ) : (
        <ScrollView style={{ ...styles.scrollView}}>
          <Text style={{...styles.title}}>
            Menu</Text>
          <ItemTag/>
        </ScrollView>
      )}
    </View>
  );
}



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
    fontWeight: '500'
    //fontFamily: 'HindSiliguri',
  },
  title2: {
    fontSize: TEXTS.adjust(30),
    marginBottom: LAYOUTS.getWidth(8),
    marginTop: LAYOUTS.getWidth(8),
    color: COLORS.black,
    fontWeight: '500'
    //fontFamily: 'HindSiliguri',
  },
  scrollView : {
    paddingTop: LAYOUTS.getWidth(10),
    paddingHorizontal: LAYOUTS.getWidth(10),
    backgroundColor: COLORS.offWhite,
    flex: 1,
    //borderWidth: 1
  },
  loader : {
    marginTop: LAYOUTS.getWidth(100),
  },
  tag: {
    //borderWidth: 3,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});