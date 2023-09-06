import React, { FC, useEffect } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { asyncFetchAllTransactionHistories } from '../../store/slices/TransactionHistory'

const StripeScreen: FC = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.currentUser)

  useEffect(() => {
    if (currentUser) {
      dispatch(asyncFetchAllTransactionHistories(currentUser.college))
    }
  }, [currentUser])

  return (
    <SafeAreaView>
      <Text>Stripe Screen</Text>
    </SafeAreaView>
  )
}

export default StripeScreen