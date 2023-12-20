import React, { FC, useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Pressable } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { asyncFetchAllOrdersFromCollege } from '../../store/slices/Order'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { staffAnalytics } from '../../styles/StaffAnalyticsStyles'
import { useIsFocused } from '@react-navigation/native'
import { asyncFetchUsers } from '../../store/slices/Users'
import { LAYOUTS } from '../../constants/Layouts'
import type { Order, User } from '../../utils/types'

import AnalyticsCard from '../../components/staff/AnalyticsCard'

const AnalyticsScreen: FC = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const today = new Date()

  let day = today.getDate().toString()
  let month = today.getMonth().toString()
  let year = today.getFullYear().toString()

  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = useState(false)
  const [connection, setConnection] = useState(true)

  const [date, updateDate] = useState(today)

  const { users } = useAppSelector((state) => state.users)
  const { orders, isLoading } = useAppSelector((state) => state.orders)

  const [filtered, setFiltered] = useState(orders.filter(getAllOrdersFromDay))

  
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

    setFiltered(orders.filter(getAllOrdersFromDay));
    
  }, [])

  useEffect(() => {

    dispatch(asyncFetchAllOrdersFromCollege(14)).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })

    setFiltered(orders.filter(getAllOrdersFromDay)) //update orders for that past day
  }, [date])

  useEffect(() => {
    if(!isLoading) {
      dispatch(asyncFetchAllOrdersFromCollege(14)).then((success: boolean) => {
        if (!success) {
          setConnection(false)
        }
      })
    }
  }, [isFocused])



  const moveForward = () => {
    if(date.getFullYear() < today.getFullYear() || date.getMonth() < today.getMonth() || date.getDate() < today.getDate()) {
      date.setDate(date.getDate() + 1)
      updateDate(new Date(date))
    }
  }

  const moveBackward = () => {
    date.setDate(date.getDate() - 1)
    updateDate(new Date(date))
  }

  function getTotalCost(orders: Order[]) {
    let totalCost = 0;

    for (let i = 0; i < orders.length; i++) {
      totalCost += orderTotalCost(orders[i]);
    }

    return totalCost;
  }

  function orderTotalCost(order: Order) {
    let cost = 0;

    for (let j = 0; j < order.orderItems.length; j++) {
      cost += order.orderItems[j].price;
    }

    return cost / 100.0;
  }

  function getAllOrdersFromDay(order: Order) {
    let selectedDate = order.createdAt.split('-')
    selectedDate[2] = selectedDate[2].slice(0, 2) //get day (first two numbers)

    let i = order.id;

    let d = date.getDate().toString();
    let a = parseInt(selectedDate[2]);
    let b = a.toString();

    if (!(year == selectedDate[0] && (parseInt(date.getMonth().toString()) + 1).toString() == selectedDate[1] && date.getDate().toString() == selectedDate[2])) {
      
    }

    return year == selectedDate[0] && (parseInt(date.getMonth().toString()) + 1).toString() == selectedDate[1] && date.getDate().toString() == b
  }

  function getUserFromId(id: string) {

    if (users == null) {
      return "error";
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i].name;
      }
    }
    return "error";
  }

  function reformatTime(time: string) {
    const date = new Date(time);

    const estTime = date.toLocaleString("en-US", {timeZone: "America/New_York"});
    const [_, hours, minutes] = estTime.match(/(\d+):(\d+):(\d+)/);

    return `${hours}:${minutes}`;
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
          style={({ pressed }) => [
            {
              opacity: date.getFullYear() < today.getFullYear() || date.getMonth() < today.getMonth() || date.getDate() < today.getDate() ? 1 : 0,
            }
          ]}
        >
          <Ionicon name="arrow-forward" size={25} color="#rgba(255,255,255, 0.87)" />
        </Pressable>
      </View>

      <View style={staffAnalytics.header}>
          <Text style = {staffAnalytics.subheader}>Total Revenue: ${getTotalCost(filtered).toFixed(2)}</Text>
          <Text style = {staffAnalytics.subheader}>Total Orders: {filtered.length}</Text>
      </View>

      <View style={staffAnalytics.title}>
          <Text style = {staffAnalytics.text}></Text>
          <Text style = {staffAnalytics.text}>Time</Text>
          <Text style = {staffAnalytics.text}>Name</Text>
          <Text style = {staffAnalytics.text}>Items</Text>
          <Text style = {staffAnalytics.text}>Cost</Text>
      </View>

      {filtered?.map((order, i) => (
        <AnalyticsCard
          key={i}
          time={reformatTime(order.createdAt)}
          name={getUserFromId(order.userId)}
          num_items={order.orderItems.length}
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
  }
})

export default AnalyticsScreen
