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
        <Text style={{ ...styles.regularText }}>{orderItem.name}</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={{ ...styles.nameText }}>{orderItem.user}</Text>
      </View>
    </View>
  )

  switch (status) {
    case 4:
      return (
        <View style={{ ...styles.container, backgroundColor: '#D989B9' }}>
          <View style={{ ...styles.timeContainer }}>
            <Text style={{ ...styles.boldText, lineHeight: 30 }}>10:57 PM</Text>
            <Text style={{ ...styles.nameText, lineHeight: 14 }}>Picked Up</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ ...styles.regularText }}>{orderItem}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={{ ...styles.nameText }}>name</Text>
          </View>
        </View>
      )
      break
    case 3:
      return (
        <View style={{ ...styles.container, backgroundColor: '#D4EFDF' }}>
          <View style={{ ...styles.timeContainer }}>
            <Text style={{ ...styles.boldText, lineHeight: 30 }}>10:57 PM</Text>
            <Text style={{ ...styles.nameText, lineHeight: 14 }}>Pickup ready</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ ...styles.regularText }}>{props.orderItem}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={{ ...styles.nameText }}>Aidan</Text>
            <Text style={{ ...styles.nameText }}>Palmer</Text>
          </View>
        </View>
      )
      break
    case 2:
      return (
        <View style={{ ...styles.container, backgroundColor: '#FCF3CF' }}>
          <View style={{ ...styles.timeContainer }}>
            <Text style={{ ...styles.boldText, lineHeight: 30 }}>10:57 PM</Text>
            <Text style={{ ...styles.nameText, lineHeight: 14 }}>In progress</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ ...styles.regularText }}>{props.orderItem}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={{ ...styles.nameText }}>Aidan</Text>
            <Text style={{ ...styles.nameText }}>Palmer</Text>
          </View>
        </View>
      )
      break
    case 1:
      return (
        <View style={{ ...styles.container, backgroundColor: '#FAE5D3' }}>
          <View style={{ ...styles.timeContainer }}>
            <Text style={{ ...styles.boldText, lineHeight: 30 }}>10:57 PM</Text>
            <Text style={{ ...styles.nameText, lineHeight: 14 }}>In queue</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ ...styles.regularText }}>{props.orderItem}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={{ ...styles.nameText }}>Aidan</Text>
            <Text style={{ ...styles.nameText }}>Palmer</Text>
          </View>
        </View>
      )
      break
    case 0:
      if (started) {
        return (
          <View style={{ ...styles.container, backgroundColor: '#F5B7B1' }}>
            <View style={{ ...styles.timeContainer }}>
              <Text style={{ ...styles.boldText, lineHeight: 30 }}>10:57 PM</Text>
              <Text style={{ ...styles.nameText, lineHeight: 14 }}>Cancelled</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={{ ...styles.regularText }}>{props.orderItem}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={{ ...styles.nameText }}>Aidan</Text>
              <Text style={{ ...styles.nameText }}>Palmer</Text>
            </View>
          </View>
        )
      } else {
        return (
          <View style={{ ...styles.container, borderWidth: 2, borderColor: 'red' }}>
            <View style={{ ...styles.timeContainer }}>
              <Text style={{ ...styles.boldText, lineHeight: 30 }}>10:57 PM</Text>
              <Text style={{ ...styles.nameText, lineHeight: 14 }}>NEW</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={{ ...styles.regularText }}>{props.orderItem}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={{ ...styles.nameText }}>Aidan</Text>
              <Text style={{ ...styles.nameText }}>Palmer</Text>
            </View>
          </View>
        )
      }
      break
    default:
      return <Text>Something went wrong...</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    height: LAYOUTS.getWidth(50),
    width: LAYOUTS.getWidth(355),
    flex: 1,
    borderRadius: 5,
    //marginBottom: LAYOUTS.getWidth(10),
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: COLORS.white,
    // borderColor: 'black',
    //borderWidth: 2
  },
  timeContainer: {
    width: LAYOUTS.getWidth(80),
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: LAYOUTS.getWidth(10),
    paddingTop: LAYOUTS.getWidth(4),
    //borderWidth: 2
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
    //fontFamily: 'ri-Bold'
  },
  regularText: {
    fontSize: TEXTS.adjust(17),
    color: COLORS.black,
    //fontFamily: 'HindSiliguri'
  },
  nameText: {
    fontSize: TEXTS.adjust(12),
    color: COLORS.black,
    //fontFamily: 'HindSiliguri'
  },
})

export default OrderTagPage
