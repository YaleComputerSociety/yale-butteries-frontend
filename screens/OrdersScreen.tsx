import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'

import { COLORS } from '../constants/Colors'
import { TEXTS } from '../constants/Texts'
import { LAYOUTS } from '../constants/Layouts'

import OrderCard from '../components/staff/OrderCard'
import { asyncFetchTransactionHistories } from '../store/slices/TransactionHistory'
import { setTransactionItemsState, TransactionItem } from '../store/slices/TransactionItems'
import store from '../store/ReduxStore'
import { useIsFocused } from '@react-navigation/native'

let counter = 0

const OrdersScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  const { transactionItems, isLoading: isLoadingTransactionItems } = useAppSelector((state) => state.transactionItems)
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const [currentOrders, setCurrentOrders] = useState<TransactionItem[]>([])
  const [pastOrders, setPastOrders] = useState<TransactionItem[]>([])

  // Every x seconds, fetch TIs by college and time created, then sort by time
  useEffect(() => {
    const fetchItems = async () => {
      await dispatch(asyncFetchTransactionHistories(currentUser.college))

      // turn the transactionHistories into transactionItems
      const ti: TransactionItem[] = []
      store.getState().transactionHistory.transactionHistory.forEach((th) => {
        th.transactionItems.forEach((item) => {
          ti.push({ ...item, creationTime: th.creationTime })
        })
      })

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

    fetchItems()
    const interval = setInterval(() => {
      fetchItems()
    }, 5000)
    return () => clearInterval(interval)
  }, [isFocused])

  useEffect(() => {
    if (transactionItems && counter > 5) {
      counter = 0
      // console.log(transactionItems.map((element) => element.id + ' ' + element.orderStatus))
    }
    counter++

    if (transactionItems != null) {
      setCurrentOrders(
        transactionItems.filter((element) => element.orderStatus != 'FINISHED' && element.orderStatus != 'CANCELLED')
      )
      setPastOrders(
        transactionItems.filter((element) => element.orderStatus == 'FINISHED' || element.orderStatus == 'CANCELLED')
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
          {currentOrders.map((element) => {
            return (
              <View key={element.id + 'vv'} style={styles.tag}>
                <OrderCard
                  item={element}
                  transactionItems={transactionItems}
                  interactable={true}
                  key={element.id + 'b'}
                />
              </View>
            )
          })}
          <Text style={{ ...styles.title2 }}>Completed Today</Text>
          {pastOrders.map((element) => {
            return (
              <View key={element.id + 'v'}>
                <OrderCard item={element} transactionItems={transactionItems} interactable={false} key={element.id} />
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
