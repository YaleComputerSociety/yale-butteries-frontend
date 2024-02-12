import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import type { OrderItem } from '../../utils/types'
import { COLORS } from '../../constants/Colors'
import { TEXTS } from '../../constants/Texts'
import { LAYOUTS } from '../../constants/Layouts'

interface Props {
  status: number
  time?: string
  orderItem: OrderItem
  started?: boolean
}

const OrderCardBackground: React.FC<Props> = ({ status, orderItem }: Props) => {
  const getColor = (): string => {
    switch (status) {
      case 0:
        return '#ff6464'
      case 1:
        return '#CCCCFF'
      case 2:
        return '#fff15d'
      case 3:
        return '#77f07f'
      case 4:
        return '#D989B9'
      default:
        return 'red'
    }
  }

  const getStatus = (): string => {
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

  const cardBackgroundColor = {
    backgroundColor: getColor(),
  }

  return (
    <View style={[styles.container, cardBackgroundColor]}>
      <View style={styles.timeContainer}>
        <Text style={styles.status}>{getStatus()}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.regularText}>{orderItem.name}</Text>
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
    paddingTop: LAYOUTS.getWidth(10),
  },
  itemContainer: {
    flex: 1,
    paddingLeft: LAYOUTS.getWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  regularText: {
    fontSize: TEXTS.adjust(17),
    color: COLORS.black,
  },
  status: {
    fontSize: TEXTS.adjust(10),
    color: COLORS.black,
    lineHeight: 14,
  },
})

export default OrderCardBackground
