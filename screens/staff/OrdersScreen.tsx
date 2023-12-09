import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import store, { useAppSelector, useAppDispatch } from '../../store/ReduxStore'

import { COLORS } from '../../constants/Colors'
import { TEXTS } from '../../constants/Texts'
import { LAYOUTS } from '../../constants/Layouts'

import OrderCard from '../../components/staff/OrderCard'
import { asyncFetchRecentTransactionHistories } from '../../store/slices/TransactionHistory'
import { setTransactionItemsState, TransactionItem } from '../../store/slices/TransactionItems'
import { useIsFocused } from '@react-navigation/native'
import EvilModal from '../../components/EvilModal'

let counter = 0

const OrdersScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  const { transactionItems, isLoading: isLoadingTransactionItems } = useAppSelector((state) => state.transactionItems)
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const [currentOrders, setCurrentOrders] = useState<TransactionItem[]>([])
  const [pastOrders, setPastOrders] = useState<TransactionItem[]>([])
  const [connection, setConnection] = useState(true) // remind the user but don't need to do anything
  const [necessaryConnection, setNecessaryConnection] = useState(true) // user needs to reload app

  // Every x seconds, fetch TIs by college and time created, then sort by time
  useEffect(() => {
    const fetchItems = async () => {
      if (currentUser.college) {
        await dispatch(asyncFetchRecentTransactionHistories(currentUser.college)).then((success: boolean) => {
          setConnection(success)
        })

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
              (element) => element.orderStatus != 'READY' && element.orderStatus != 'CANCELLED'
            )
          )
          setPastOrders(
            newTransactionItems.filter(
              (element) => element.orderStatus == 'READY' || element.orderStatus == 'CANCELLED'
            )
          )
        }
      }
    }

    fetchItems()
    const interval = setInterval(() => {
      fetchItems()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (transactionItems && counter > 5) {
      counter = 0
      // console.log(transactionItems.map((element) => element.id + ' ' + element.orderStatus))
    }
    counter++

    if (transactionItems != null) {
      setCurrentOrders(
        transactionItems.filter((element) => element.orderStatus != 'READY' && element.orderStatus != 'CANCELLED')
      )
      setPastOrders(
        transactionItems.filter((element) => element.orderStatus == 'READY' || element.orderStatus == 'CANCELLED')
      )
    }
  }, [transactionItems])

  return (
    <SafeAreaView style={{ ...styles.container }}>
      {!necessaryConnection && <EvilModal toggle={setNecessaryConnection} display={!necessaryConnection} />}
      {!connection && (
        <Text style={styles.connectionError}>You aren't connected to the internet. Orders may not be accurate</Text>
      )}
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
                  setConnection={setNecessaryConnection}
                  key={element.id + 'b'}
                />
              </View>
            )
          })}
          <Text style={{ ...styles.title2 }}>Completed Today</Text>
          {pastOrders.map((element) => {
            return (
              <View key={element.id + 'v'}>
                <OrderCard
                  item={element}
                  transactionItems={transactionItems}
                  interactable={false}
                  setConnection={setNecessaryConnection}
                  key={element.id}
                />
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
    textAlign: 'center',
    fontFamily: 'HindSiliguri-Bold',
  },
  title2: {
    fontSize: TEXTS.adjust(30),
    marginBottom: LAYOUTS.getWidth(8),
    marginTop: LAYOUTS.getWidth(8),
    color: COLORS.black,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'HindSiliguri-Bold',
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
  connectionError: {
    color: '#b33',
    fontFamily: 'HindSiliguri',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 5,
  },
})
