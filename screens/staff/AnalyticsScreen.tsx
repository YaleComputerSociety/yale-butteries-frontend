import React, { FC, useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { TransactionHistoryEntry, asyncFetchAllTransactionHistories } from '../../store/slices/TransactionHistory'
import Ionicon from 'react-native-vector-icons/Ionicons'

const AnalyticsScreen: FC = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const today = new Date()

  let day = today.getDate().toString()
  let month = today.getMonth().toString()
  let year = today.getFullYear().toString()

  const [date, updateDate] = useState(today)

  const { transactionHistory, isLoading: isLoading } = useAppSelector((state) => state.transactionHistory)
  const [filtered, setFiltered] = useState(transactionHistory.filter(transactionsOnDay))

  const moveForward = () => {
    if(date.getFullYear() < today.getFullYear() || date.getMonth() < today.getMonth() || date.getDate() < today.getDate()) {
      date.setDate(date.getDate() + 1)
      updateDate(new Date(date))
      console.log("Date: ", date, "today: ", today);

      // Make it disappear
      if(date.getFullYear() >= today.getFullYear() || date.getMonth() >= today.getMonth() || date.getDate() >= today.getDate()) {
        console.log("disappear");
      }
    }
  }

  const moveBackward = () => {
    date.setDate(date.getDate() - 1)
    updateDate(new Date(date))
  }

  function transactionsOnDay(transactionHistory: TransactionHistoryEntry) {
    let selectedDate = transactionHistory.creationTime.split('-')
    selectedDate[2] = selectedDate[2].slice(0, 2) //get day (first two numbers)
    return year == selectedDate[0] && (parseInt(month) + 1).toString() == selectedDate[1] && day == selectedDate[2]
  }

  useEffect(() => {
    if (!isLoading) {
      setFiltered(transactionHistory.filter(transactionsOnDay))
    }
  }, [])

  useEffect(() => {
    day = date.getDate().toString()
    month = date.getMonth().toString()
    year = date.getFullYear().toString()

    dispatch(asyncFetchAllTransactionHistories(currentUser.college))
    setFiltered(transactionHistory.filter(transactionsOnDay)) //update orders for that past day
  }, [date])

  return (
    <ScrollView>
      <View style={styles.dateContainer}>
        <Pressable onPress={moveBackward}>
          <Ionicon name="arrow-back" size={25} color="#000" />
        </Pressable>
        <Text style={styles.dateHeader}>{date.toDateString()}</Text>
        <Pressable onPress={moveForward}>
          <Ionicon name="arrow-forward" size={25} color="#000" />
        </Pressable>
      </View>
      <View>
        <Text>{filtered.toString()}</Text>
      </View>
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
