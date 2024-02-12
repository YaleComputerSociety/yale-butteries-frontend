import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import store, { useAppSelector, useAppDispatch } from '../../store/ReduxStore'

import { TEXTS } from '../../constants/Texts'
import { LAYOUTS } from '../../constants/Layouts'

import BigCard from '../../components/staff/BigCard'
import { asyncFetchRecentOrdersFromCollege } from '../../store/slices/Order'
import type { OrderItem } from '../../utils/types'
// import { useIsFocused } from '@react-navigation/native'
import EvilModal from '../../components/EvilModal'

const OrdersScreen2: React.FC = () => {
  const dispatch = useAppDispatch()
  // const isFocused = useIsFocused()

  const { orderItems, isLoading: isLoadingOrderItems } = useAppSelector((state) => state.orderItems)
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const [waitingOrders, setWaitingOrders] = useState<OrderItem[][]>([])
  const [currentOrders, setCurrentOrders] = useState<OrderItem[][]>([])
  const [pastOrders, setPastOrders] = useState<OrderItem[][]>([])
  const [connection, setConnection] = useState(true) // remind the user but don't need to do anything
  const [necessaryConnection, setNecessaryConnection] = useState(true) // user needs to reload app

  // Every x seconds, fetch orderItems by college and time created, then sort by time
  useEffect(() => {
    const fetchItems = async (): Promise<void> => {
      if (currentUser?.collegeId != null) {
        // should fetch only recent to save time, but for a while this will be fine
        await dispatch(asyncFetchRecentOrdersFromCollege(currentUser.collegeId)).then((success: boolean) => {
          setConnection(success)
        })

        // turn the orders into orderItems
        // all items are in queue
        const waiting: OrderItem[][] = []
        // at least one item pending
        const current: OrderItem[][] = []
        // all items finished or cancelled
        const past: OrderItem[][] = []

        store.getState().orders.orders.forEach((entry) => {
          let pendingCount = 0
          let doneCount = 0
          let readyCount = 0
          const itemList: OrderItem[] = []

          entry.orderItems.forEach((item) => {
            if (item.status === 'QUEUED') {
              pendingCount++
            } else if (item.status !== 'ONGOING') {
              doneCount++
              if (item.status === 'READY') {
                readyCount++
              }
            }
            itemList.push({ ...item })
          })

          if (pendingCount === itemList.length) {
            waiting.push({ ...itemList })
          } else if (doneCount === itemList.length) {
            if (readyCount > 0) {
              past.push({ ...itemList })
            }
          } else {
            current.push({ ...itemList })
          }
        })

        // set appropriate order lists
        if (waiting != null) {
          setWaitingOrders(waiting)
        }
        if (current != null) {
          setCurrentOrders(current)
        }
        if (past != null) {
          setPastOrders(past)
        }
      }
    }

    void fetchItems()
    const interval = setInterval(() => {
      void fetchItems()
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [currentUser?.collegeId, dispatch])

  return (
    <SafeAreaView style={styles.container}>
      {!necessaryConnection && <EvilModal toggle={setNecessaryConnection} display={!necessaryConnection} />}
      {!connection && (
        <Text style={styles.connectionError}>
          You aren&apos;t connected to the internet. Orders may not be accurate
        </Text>
      )}
      {isLoadingOrderItems || orderItems == null ? (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <Text style={{ ...styles.title }}>Orders</Text>
          <ActivityIndicator style={styles.loader} size="large" />
        </ScrollView>
      ) : (
        <ScrollView style={{ ...styles.scrollView }}>
          <View style={styles.background}>
            <Text style={{ ...styles.title2 }}>Live Orders</Text>
          </View>
          {waitingOrders.map((element) => {
            return (
              <View key={element['0'].id + 'vv'} style={styles.tag}>
                <BigCard
                  orderItems={element}
                  interactable={false}
                  isWaiting={true}
                  setConnection={setNecessaryConnection}
                  key={element['0'].id + 'b'}
                />
              </View>
            )
          })}
          {currentOrders.map((element) => {
            return (
              <View key={element['0'].id + 'vv'} style={styles.tag}>
                <BigCard
                  orderItems={element}
                  interactable={true}
                  isWaiting={false}
                  setConnection={setNecessaryConnection}
                  key={element['0'].id + 'b'}
                />
              </View>
            )
          })}
          <View style={styles.background}>
            <Text style={{ ...styles.title2 }}>Completed Today</Text>
          </View>
          {pastOrders.map((element) => {
            return (
              <View key={element['0'].id + 'v'}>
                <BigCard
                  orderItems={element}
                  interactable={false}
                  isWaiting={false}
                  setConnection={setNecessaryConnection}
                  key={element['0'].id}
                />
              </View>
            )
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
export default OrdersScreen2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  background: {
    backgroundColor: '#2c2c2c',
    padding: 5,
    marginBottom: LAYOUTS.getWidth(10),
    height: LAYOUTS.getWidth(50),
    justifyContent: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: TEXTS.adjust(20),
    color: 'rgba(255,255,255, 0.87)',
    fontWeight: '500',
    textAlign: 'center',
  },
  title2: {
    fontSize: TEXTS.adjust(20),
    textAlign: 'center',
    // marginBottom: LAYOUTS.getWidth(5),
    // marginTop: LAYOUTS.getWidth(5),
    color: 'rgba(255,255,255, 0.87)',
    fontWeight: 'bold',
    // fontFamily: 'HindSiliguri',
  },
  scrollView: {
    paddingTop: LAYOUTS.getWidth(10),
    paddingHorizontal: LAYOUTS.getWidth(10),
    backgroundColor: '#121212',
    flex: 1,
    // borderWidth: 1
  },
  loader: {
    marginTop: LAYOUTS.getWidth(100),
  },
  tag: {
    // borderWidth: 3,
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
