import React, { FC, useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { asyncFetchAllTransactionHistories } from '../../store/slices/TransactionHistory'
import Ionicon from 'react-native-vector-icons/Ionicons'

const AnalyticsScreen: FC = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const today = new Date()

  const [date, updateDate] = useState(today)

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

  useEffect(() => {}, [updateDate])

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
