import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { COLORS } from '../constants/Colors'
import { TEXTS } from '../constants/Texts'
import { LAYOUTS } from '../constants/Layouts'
import { TransactionItem } from '../store/slices/TransactionItems'

interface Props {
  status: number
  time?: string
  orderItem: TransactionItem
  started?: boolean
}

const OrderTagPage: React.FC<Props> = ({ status, orderItem, started, time }: Props) => {
  const getColor = (status: number): string => {
    switch (status) {
      case 0:
        return '#F5B7B1'
      case 1:
        return '#FAE5D3'
      case 2:
        return '#FCF3CF'
      case 3:
        return '#D4EFDF'
      case 4:
        return '#D989B9'
      default:
        return 'red'
    }
  }

  const getStatus = (status: number): string => {
    switch (status) {
      case 0:
        return 'Cancelled'
      case 1:
        return 'In Queue'
      case 2:
        return 'In Progress'
      case 3:
        return 'Pickup Ready'
      case 4:
        return 'Picked Up'
      default:
        return 'Something went wrong'
    }
  }

  return (
    <View style={{ ...styles.container, backgroundColor: getColor(status) }}>
      <View style={{ ...styles.timeContainer }}>
        <Text style={{ ...styles.boldText, lineHeight: 30 }}>{time}</Text>
        <Text style={{ ...styles.nameText, lineHeight: 14 }}>{getStatus(status)}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={{ ...styles.regularText }}>{orderItem.name + ' ' + orderItem.id}</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={{ ...styles.nameText }}>{orderItem.user}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: LAYOUTS.getWidth(50),
    width: LAYOUTS.getWidth(355),
    flex: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: COLORS.white,
  },
  timeContainer: {
    width: LAYOUTS.getWidth(80),
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: LAYOUTS.getWidth(10),
    paddingTop: LAYOUTS.getWidth(4),
  },
  itemContainer: {
    flex: 1,
    paddingLeft: LAYOUTS.getWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  nameContainer: {
    width: LAYOUTS.getWidth(75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: TEXTS.adjust(15),
    color: COLORS.black,
  },
  regularText: {
    fontSize: TEXTS.adjust(17),
    color: COLORS.black,
  },
  nameText: {
    fontSize: TEXTS.adjust(12),
    color: COLORS.black,
  },
})

export default OrderTagPage
