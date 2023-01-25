import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { TransactionItem } from '../store/slices/TransactionItems'
import { checkout } from '../styles/CheckoutStyles'

interface Props {
  transactionItem: TransactionItem
}

const StatusItem: FC<Props> = ({ transactionItem }: Props) => {
  return (
    <View style={checkout.item}>
      <View style={checkout.NAME}>
        <Text style={checkout.itemNameText}>Hello</Text>
      </View>
      <View style={checkout.PRICE}>
        <Text style={checkout.text}>$0.00</Text>
      </View>
    </View>
  )
}

export default StatusItem
