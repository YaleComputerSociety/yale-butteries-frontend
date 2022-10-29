import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { asyncFetchTransactionItems } from '../store/slices/TransactionItems'; 
import { getTransactionHistoryWithItems } from '../store/selectors';

import { COLORS } from '../constants/Colors';
import { TEXTS } from '../constants/Texts';
import { LAYOUTS } from '../constants/Layouts';

import OrderTag from '../components/OrderTag';
import { current } from '@reduxjs/toolkit';

//switch to arrow function
export default function OrdersScreen() {
  const dispatch = useAppDispatch();
  const[currentOrders, setCurrentOrders] = useState([]);
  const[pastOrders, setPastOrders] = useState([]);
  //const transcationHistoryWithItems = useAppSelector(getTransactionHistoryWithItems)
  const { transactionItems, isLoading: isLoadingTransactionItems } = useAppSelector((state) => state.transactionItems)
  if (isLoadingTransactionItems) {
    console.log("loading")
  }

  useEffect(() => {
    console.log("loading")
    if (isLoadingTransactionItems || transactionItems == null) {
      dispatch(asyncFetchTransactionItems())
      console.log("fetching")
    }
  }, [isLoadingTransactionItems])
  
  useEffect(() => {
    console.log("transactionItems Updated")
    //console.log(transactionItems)
    if (transactionItems != null) {
      setCurrentOrders(transactionItems.filter(element => element.orderStatus != "complete" && element.orderStatus != "cancelled"))
      setPastOrders(transactionItems.filter(element => element.orderStatus == "complete" || element.orderStatus == "cancelled"))
    }
    //console.log(currentOrders)

  }, [transactionItems])

  return (
    <SafeAreaView style={{...styles.container}}>
      {isLoadingTransactionItems || transactionItems == null ? (
        <ScrollView style={{ ...styles.scrollView}}
        contentContainerStyle={{alignItems: 'flex-start', justifyContent: 'stretch'}}>
          <Text style={{...styles.title}}>
          Orders</Text>
          <ActivityIndicator style={styles.loader} size="large"/>
        </ScrollView>
      ) : (
        <ScrollView style={{ ...styles.scrollView}}
        contentContainerStyle={{alignItems: 'stretch', justifyContent: 'stretch'}}>
          <Text style={{...styles.title}}>
            Live Orders</Text>
          {
            currentOrders.map((element, index) => {
              //HEY orderNum = index make mess up the key system 
              //when we add/delete orders. Look here first if error happens.
              //console.log(transactionItems)
              //currentOrders.forEach(test => console.log(index + 'a'))
              //console.log(currentOrders)
              return (
                <View key = {String(element.id) + 'av'} style={styles.tag}>
                <OrderTag>
                  {element}
                  {transactionItems}
                  {element.id}
                  {true}
                  key = {String(element.id) + 'a'}
                </OrderTag>
                </View>
              )
            })
          }
          <Text style={{...styles.title2}}>
            Completed Today</Text>
          {
            pastOrders.map((element, index) => {
              //HEY orderNum = index make mess up the key system 
              //when we add/delete orders. Look here first if error happens.
              //console.log(transactionItems)
             //pastOrders.forEach(test => console.log(index + 'b'))
              return (
                <View key = {String(element.id) + 'bv'}>
                <OrderTag>
                  {element}
                  {transactionItems}
                  {element.id}
                  {false}
                  key = {String(element.id) + 'b'}
                </OrderTag>
                </View>
              )
            })
          }
        </ScrollView>
      )}
    </SafeAreaView>
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