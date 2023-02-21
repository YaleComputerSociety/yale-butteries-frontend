import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'

import { COLORS } from '../constants/Colors'
import { TEXTS } from '../constants/Texts'
import { LAYOUTS } from '../constants/Layouts'

import OrderTag from '../components/OrderTag'
import { asyncFetchTransactionHistories } from '../store/slices/TransactionHistory'
import { setTransactionItemsState, TransactionItem } from '../store/slices/TransactionItems'
import store from '../store/ReduxStore'

const OrdersScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const [currentOrders, setCurrentOrders] = useState([])
  const [pastOrders, setPastOrders] = useState([])
  const { transactionItems, isLoading: isLoadingTransactionItems } = useAppSelector((state) => state.transactionItems)
  const { transactionHistory, isLoading: isLoadingTransactionHistory } = useAppSelector(
    (state) => state.transactionHistory
  )
  const { currentUser } = useAppSelector((state) => state.currentUser)

  // Every x seconds, fetch THs by college and time created and then TIs and Users from backend, then sort by time
  useEffect(() => {
    const temp = async () => {
      await dispatch(asyncFetchTransactionHistories(currentUser.college))

      // turn the transactionHistories into transactionItems
      const ti: TransactionItem[] = []
      store.getState().transactionHistory.transactionHistory.forEach((th) => {
        ti.push(...th.transactionItems)
      })
      console.log(ti)

      // update transactionItems
      dispatch(setTransactionItemsState(ti))
      const newTransactionItems = store.getState().transactionItems.transactionItems

      // display transactionItems (should already be in sorted order)
      if (newTransactionItems != null) {
        setCurrentOrders(
          newTransactionItems.filter(
            (element) => element.orderStatus != 'FINISHED' && element.orderStatus != 'CANCELLED'
          )
        )
        setPastOrders(
          newTransactionItems.filter(
            (element) => element.orderStatus == 'FINISHED' || element.orderStatus == 'CANCELLED'
          )
        )
      }
    }

    temp()
    const interval = setInterval(() => {
      temp()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
export default OrdersScreen

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
