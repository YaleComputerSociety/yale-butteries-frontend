// This file needs to be rewritten
// Also, moving between dates is very slow

import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Pressable } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'

import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { asyncFetchAllOrdersFromCollege } from '../../store/slices/Order'
import { staffAnalytics } from '../../styles/StaffAnalyticsStyles'
import { asyncFetchUsers } from '../../store/slices/Users'
import { LAYOUTS } from '../../constants/Layouts'
import type { Order } from '../../utils/types'
import AnalyticsCard from '../../components/staff/AnalyticsCard'

const AnalyticsScreen: FC = () => {
  const dispatch = useAppDispatch()

  const today = new Date()

  const isFocused = useIsFocused()
  const [connection, setConnection] = useState(true)

  const [date, updateDate] = useState(today)

  const { users } = useAppSelector((state) => state.users)
  const { orders, isLoading } = useAppSelector((state) => state.orders)

  const filteredOrders: Order[] = orders.filter(getAllOrdersFromDay)

  useEffect(() => {
    dispatch(asyncFetchUsers()).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })

    dispatch(asyncFetchAllOrdersFromCollege(14)).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(asyncFetchAllOrdersFromCollege(14)).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
  }, [date, dispatch])

  useEffect(() => {
    if (!isLoading) {
      dispatch(asyncFetchAllOrdersFromCollege(14)).then((success: boolean) => {
        if (!success) {
          setConnection(false)
        }
      })
    }
  }, [dispatch, isFocused, isLoading])

  const moveForward = (): void => {
    if (
      date.getFullYear() < today.getFullYear() ||
      date.getMonth() < today.getMonth() ||
      date.getDate() < today.getDate()
    ) {
      date.setDate(date.getDate() + 1)
      updateDate(new Date(date))
    }
  }

  const moveBackward = (): void => {
    date.setDate(date.getDate() - 1)
    updateDate(new Date(date))
  }

  function getTotalCost(ordersList: Order[]): number {
    let totalCost = 0

    for (let i = 0; i < ordersList.length; i++) {
      totalCost += orderTotalCost(ordersList[i])
    }

    return totalCost
  }

  function orderTotalCost(order: Order): number {
    let cost = 0

    for (let j = 0; j < order.orderItems.length; j++) {
      cost += order.orderItems[j].price
    }

    return cost / 100.0
  }

  function getAllOrdersFromDay(order: Order): boolean {
    const orderDate = new Date(order.createdAt)
    return (
      orderDate.getFullYear() === date.getFullYear() &&
      orderDate.getMonth() === date.getMonth() &&
      orderDate.getDate() === date.getDate()
    )
  }

  function getUserFromId(id: string): string {
    if (users == null) {
      return 'error'
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i].name
      }
    }
    return 'error'
  }

  function reformatTime(time: string): string {
    const now = new Date(time)

    const estTime = now.toLocaleString('en-US', { timeZone: 'America/New_York' })
    const [_, hours, minutes] = estTime.match(/(\d+):(\d+):(\d+)/)

    return `${hours}:${minutes}`
  }

  return (
    <ScrollView style={{ ...styles.scrollView }}>
      <View style={styles.dateContainer}>
        <Pressable onPress={moveBackward}>
          <Ionicon name="arrow-back" size={25} color="#rgba(255,255,255, 0.87)" />
        </Pressable>
        <Text style={styles.dateHeader}>{date.toDateString()}</Text>
        <Pressable
          onPress={moveForward}
          style={() => [
            {
              opacity:
                date.getFullYear() < today.getFullYear() ||
                date.getMonth() < today.getMonth() ||
                date.getDate() < today.getDate()
                  ? 1
                  : 0,
            },
          ]}
        >
          <Ionicon name="arrow-forward" size={25} color="#rgba(255,255,255, 0.87)" />
        </Pressable>
      </View>

      <View style={staffAnalytics.header}>
        <Text style={staffAnalytics.subheader}>Total Revenue: ${getTotalCost(filteredOrders).toFixed(2)}</Text>
        <Text style={staffAnalytics.subheader}>Total Orders: {filteredOrders.length}</Text>
      </View>

      <View style={staffAnalytics.title}>
        <Text style={staffAnalytics.text} />
        <Text style={staffAnalytics.text}>Time</Text>
        <Text style={staffAnalytics.text}>Name</Text>
        <Text style={staffAnalytics.text}>Items</Text>
        <Text style={staffAnalytics.text}>Cost</Text>
      </View>

      {filteredOrders?.map((order, i) => (
        <AnalyticsCard
          key={i}
          time={reformatTime(order.createdAt)}
          name={getUserFromId(order.userId)}
          numItems={order.orderItems.length}
          cost={orderTotalCost(order).toFixed(2)}
          items={order.orderItems}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1877F2',
    width: '70%',
    justifyContent: 'space-evenly',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  dateHeader: {
    textAlign: 'center',
    color: 'rgba(255,255,255, 0.87)',
    fontSize: 20,
    marginHorizontal: 15,
    fontFamily: 'HindSiliguri-Bold',
  },
  scrollView: {
    paddingTop: LAYOUTS.getWidth(10),
    paddingHorizontal: LAYOUTS.getWidth(10),
    backgroundColor: '#121212',
    flex: 1,
  },
})

export default AnalyticsScreen
