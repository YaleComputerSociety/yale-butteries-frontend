import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { asyncFetchTransactionItems } from '../store/slices/TransactionItems'

import { COLORS } from '../constants/Colors'
import { TEXTS } from '../constants/Texts'
import { LAYOUTS } from '../constants/Layouts'

import OrderTag from '../components/OrderTag'

//switch to arrow function
export default function OrdersScreen() {
  const dispatch = useAppDispatch()
  const [currentOrders, setCurrentOrders] = useState([])
  const [pastOrders, setPastOrders] = useState([])
  //const transcationHistoryWithItems = useAppSelector(getTransactionHistoryWithItems)
  const { transactionItems, isLoading: isLoadingTransactionItems } = useAppSelector((state) => state.transactionItems)

  useEffect(() => {
    if (isLoadingTransactionItems || transactionItems == null) {
      dispatch(asyncFetchTransactionItems())
    }
  }, [isLoadingTransactionItems])

  useEffect(() => {
    console.log('transactionItems Updated')
    if (transactionItems != null) {
      setCurrentOrders(
        transactionItems.filter((element) => element.orderStatus != 'picked_up' && element.orderStatus != 'cancelled')
      )
      setPastOrders(
        transactionItems.filter((element) => element.orderStatus == 'picked_up' || element.orderStatus == 'cancelled')
      )
    }
  }, [transactionItems])

  return (
    <SafeAreaView style={{ ...styles.container }}>
      {isLoadingTransactionItems || transactionItems == null ? (
        <ScrollView
          style={{ ...styles.scrollView }}
          //contentContainerStyle={{alignItems: 'flex-start', justifyContent: 'stretch'}}>
        >
          <Text style={{ ...styles.title }}>Orders</Text>
          <ActivityIndicator style={styles.loader} size="large" />
        </ScrollView>
      ) : (
        <ScrollView
          style={{ ...styles.scrollView }}
          //contentContainerStyle={{alignItems: 'stretch', justifyContent: 'stretch'}}>
        >
          <Text style={{ ...styles.title }}>Live Orders</Text>
          {currentOrders.map((element, index) => {
            return (
              <View key={index} style={styles.tag}>
                <OrderTag>
                  {element}
                  {transactionItems}
                  {element.id}
                  {true}
                  key = {String(element.id) + 'a'}
                </OrderTag>
              </View>
            )
          })}
          <Text style={{ ...styles.title2 }}>Completed Today</Text>
          {pastOrders.map((element, index) => {
            return (
              <View key={index + 'a'}>
                <OrderTag>
                  {element}
                  {transactionItems}
                  {element.id}
                  {false}
                  key = {String(element.id) + 'b'}
                </OrderTag>
              </View>
            )
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  )
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
})
