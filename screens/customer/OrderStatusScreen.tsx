import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Pressable, Alert } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'
import * as Haptics from 'expo-haptics'
import { CommonActions, useIsFocused } from '@react-navigation/native'
import isEqual from 'lodash/isEqual'

import StatusCard from '../../components/customer/StatusCard'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { setOrder } from '../../store/slices/Order'
import { baseUrl } from '../../utils/constants'
import type { MainStackScreenProps, Order, OrderItem } from '../../utils/types'

const OrderStatusScreen: React.FC<MainStackScreenProps<'OrderStatusScreen'>> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()
  const [percentage, setPercentage] = useState(0)
  const [connection, setConnection] = useState(true)
  const { currentOrder } = useAppSelector((state) => state.orders)
  const { menuItems } = useAppSelector((state) => state.menuItems)
  const { currentUser } = useAppSelector((state) => state.currentUser)

  // Every 5 seconds, check user's order
  useEffect(() => {
    // TODO: put this in a reducer
    if (currentOrder == null) throw new Error('No current order')
    const fetchOrder = async (): Promise<number | undefined> => {
      try {
        const order = await fetch(baseUrl + 'api/orders/' + currentOrder.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const response = await order.json()
        if (response.status === 400) throw response
        if (isEqual(response, currentOrder) === false) {
          dispatch(setOrder(response as Order))
        }
        setConnection(true)
        return getPercentageCompleted(response as Order)
      } catch (e) {
        console.error(e)
        setConnection(false)
      }
    }

    fetchOrder().catch(console.error)
    const intervalId = setInterval(() => {
      fetchOrder()
        .then(() => {
          if (percentage === 1) {
            clearInterval(intervalId)
          }
        })
        .catch(console.error)
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [currentOrder, currentOrder?.id, dispatch, percentage])

  useEffect(() => {
    setPercentage(0)
  }, [isFocused])

  // Turn ratio of orders completed/cancelled into a percentage
  const getPercentageCompleted = (order: Order): number => {
    const denominator = order.orderItems.length
    let numerator = 0
    for (let i = 0; i < denominator; i++) {
      if (order.orderItems[i].status === 'READY' || order.orderItems[i].status === 'CANCELLED') {
        numerator += 1
      }
    }
    const newPercentage = numerator / denominator
    setPercentage(newPercentage)
    return newPercentage
  }

  const status = (): string => {
    const progress = currentOrder?.status
    if (progress === 'ONGOING') {
      return 'In Progress'
    } else if (progress === 'READY') {
      return 'Complete!'
    } else {
      return 'Loading...'
    }
  }

  function getMenuItemNameFromId(orderItem: OrderItem): string {
    if (menuItems != null) {
      return menuItems.find((element) => element.id === orderItem.menuItemId)?.name ?? 'item'
    } else {
      return 'Loading...'
    }
  }

  const back = (): void => {
    const customerResetStack = CommonActions.reset({
      index: 0,
      routes: [{ name: 'ButteriesScreen' }],
    })

    const staffResetStack = CommonActions.reset({
      index: 1,
      routes: [{ name: 'NavigationScreen' }, { name: 'ButteriesScreen' }],
    })
    navigation.dispatch(currentUser?.role === 'STAFF' ? staffResetStack : customerResetStack)
  }

  return (
    <View style={styles.view3}>
      <View style={styles.topSpacer} />
      <View style={styles.view2}>
        <Text style={styles.text1}>
          Order Status:
          <Text style={styles.orderStatusAnswer}> {status()} </Text>
        </Text>
        {!connection && (
          <Text style={styles.connectionError}>
            You aren&apos;t connected to the internet. Your status may not be accurate
          </Text>
        )}
      </View>
      <Text style={styles.name}>{currentUser?.name}</Text>
      <View style={styles.outerView}>
        <ScrollView>
          {currentOrder?.orderItems.map((orderItem, index) => (
            <StatusCard name={getMenuItemNameFromId(orderItem)} status={orderItem.status} key={index} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          animated={true}
          progress={percentage}
          width={null}
          height={15}
          borderRadius={8}
          borderWidth={0}
          unfilledColor={'#1f1f1f'}
        />
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#32ba32' : '#32CD32', opacity: percentage === 1 ? 1 : 0.6 },
            styles.button,
          ]}
          onPress={() => {
            if (percentage === 1) {
              back()
              void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            } else {
              Alert.alert('Please wait while we complete your order before returning home!')
            }
          }}
        >
          <Text style={styles.buttonText}>Return Home</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default OrderStatusScreen

const styles = StyleSheet.create({
  topSpacer: { height: 30 },
  orderStatusAnswer: { fontFamily: 'HindSiliguri-Bold' },
  progressBarContainer: { width: '90%' },
  outerView: {
    backgroundColor: '#1f1f1f',
    width: '90%',
    height: '60%',
    borderRadius: 8,
    marginBottom: 25,
    alignContent: 'center',
    padding: 5,
  },
  name: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'HindSiliguri-Bold',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  text1: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'HindSiliguri',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  view2: {
    backgroundColor: '#1f1f1f',
    width: '90%',
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view3: {
    backgroundColor: '#121212',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '60%',
    backgroundColor: '#1eb71e',
    alignSelf: 'center',
    marginTop: 25,
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'HindSiliguri-Bold',
    color: 'rgba(255,255,255,0.87)',
  },
  connectionError: {
    color: '#d44',
    fontFamily: 'HindSiliguri',
    fontSize: 12,
  },
})
