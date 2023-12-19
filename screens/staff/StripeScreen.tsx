import React, { FC, useEffect } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { asyncFetchAllTransactionHistories } from '../../store/slices/TransactionHistory'
import { ScrollView } from 'react-native-gesture-handler'

const StripeScreen: FC = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.currentUser)

  return (
    <ScrollView>
      <View>
        <Text>Analytics</Text>
      </View>
    </ScrollView>
  )
}

export default StripeScreen
