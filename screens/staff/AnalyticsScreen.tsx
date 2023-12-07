import React, { FC, useCallback, useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { TransactionHistoryEntry, asyncFetchAllTransactionHistories } from '../../store/slices/TransactionHistory'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { totalMemory } from 'expo-device'
import { staffAnalytics } from '../../styles/StaffAnalyticsStyles'
import { useIsFocused } from '@react-navigation/native'
import { User, asyncFetchUsers } from '../../store/slices/Users'

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

  const { transactionHistory, isLoading: isLoading } = useAppSelector((state) => state.transactionHistory)
  const [filtered, setFiltered] = useState(transactionHistory.filter(transactionsOnDay))

  useEffect(() => {
    console.log("TRYING TO GET THE USERS");
    dispatch(asyncFetchUsers()).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
  }, [isFocused])

  useEffect(() => {
    console.log("TRYING TO GET THE TRANSACTIONS - THIS IS NOT GOOD CODE, HARDCODED FOR TRUMBULL");
    dispatch(asyncFetchAllTransactionHistories("Trumbull")).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
  }, [isFocused])

  useEffect(() => {
    console.log("TRYING TO GET THE TRANSACTIONS - THIS IS NOT GOOD CODE, HARDCODED FOR TRUMBULL");
    dispatch(asyncFetchAllTransactionHistories("Trumbull")).then((success: boolean) => {
      if (!success) {
        setConnection(false)
      }
    })
  }, [date])

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

  function getTotalCost(transactions: TransactionHistoryEntry[]) {
    // Initialize a variable to store the sum
    let totalCost = 0;

    // Iterate through each transaction_entry object in the array
    for (let i = 0; i < transactions.length; i++) {
      // Assuming 'cost' attribute exists in each transaction_entry object
      totalCost += orderTotalCost(transactions[i]);
    }

    return totalCost;
  }

  function orderTotalCost(transaction: TransactionHistoryEntry) {
    let cost = 0;

    for (let j = 0; j < transaction.transactionItems.length; j++) {
      cost += transaction.transactionItems[j].itemCost;
    }

    return cost / 100.0;
  }

  function transactionsOnDay(transactionHistory: TransactionHistoryEntry) {
    let selectedDate = transactionHistory.creationTime.split('-')
    selectedDate[2] = selectedDate[2].slice(0, 2) //get day (first two numbers)

    console.log("\nSelected date: ", {selectedDate});

    let i = transactionHistory.id;
    console.log("Checking ", {i});

    let d = date.getDate().toString();
    let a = parseInt(selectedDate[2]);
    let b = a.toString();

    if (!(year == selectedDate[0] && (parseInt(date.getMonth().toString()) + 1).toString() == selectedDate[1] && date.getDate().toString() == selectedDate[2])) {
      
      console.log("order day:", b, "page day: ", d);
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

  useEffect(() => {
    if (!isLoading) {
      setFiltered(transactionHistory.filter(transactionsOnDay))
    }
  }, [])

  useEffect(() => {
    setFiltered(transactionHistory.filter(transactionsOnDay)) //update orders for that past day
    console.log("filtered: ", filtered)
  }, [date])

  return (
    <ScrollView>
      <View style={styles.dateContainer}>
        <Pressable onPress={moveBackward}>
          <Ionicon name="arrow-back" size={25} color="#000" />
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
          <Ionicon name="arrow-forward" size={25} color="#000" />
        </Pressable>
      </View>

      <View style={staffAnalytics.header}>
          <Text>Total Revenue: ${getTotalCost(filtered).toFixed(2)}</Text>
          <Text>Total Orders: {filtered.length}</Text>
      </View>

      <View style={staffAnalytics.title}>
          <Text style = {staffAnalytics.drop}></Text>
          <Text style = {staffAnalytics.idText}>Time</Text>
          <Text style = {staffAnalytics.nameText}>Name</Text>
          <Text style = {staffAnalytics.countText}>Items</Text>
          <Text style = {staffAnalytics.costText}>Cost</Text>
      </View>

      {filtered?.map((transaction) => (
        <AnalyticsCard
          time={reformatTime(transaction.creationTime)}
          name={getUserFromId(transaction.userId)}
          num_items={transaction.transactionItems.length}
          cost={orderTotalCost(transaction).toFixed(2)}
          items={transaction.transactionItems}
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
    backgroundColor: 'grey',
    width: '70%',
    justifyContent: 'space-evenly',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  dateHeader: {
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 15,
    fontFamily: 'HindSiliguri-Bold',
  },
})

export default AnalyticsScreen
