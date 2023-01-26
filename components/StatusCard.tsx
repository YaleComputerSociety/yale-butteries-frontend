import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { checkout } from '../styles/CheckoutStyles'

interface Props {
  name: number
  status: string
}

const StatusItem: FC<Props> = ({ name, status }: Props) => {
  return (
    <View style={checkout.item}>
      <View style={checkout.NAME}>
        <Text style={checkout.itemNameText}>
          {name}, {status}
        </Text>
      </View>
    </View>
  )
}

export default StatusItem
