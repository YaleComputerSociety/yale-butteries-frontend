import React, { useEffect, useState } from 'react'
import type { NativeScrollEvent } from 'react-native'
import { Alert, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { COLORS } from '../../constants/Colors'
import { TEXTS } from '../../constants/Texts'
import { LAYOUTS } from '../../constants/Layouts'
import { useAppDispatch } from '../../store/ReduxStore'
import { asyncUpdateOrderItem, updateOrderItem } from '../../store/slices/OrderItem'
import type { OrderItem, OrderItemStatus } from '../../utils/types'

import OrderCardBackground from './OrderCardBackground'

interface Props {
  item: OrderItem
  orderItems: OrderItem[]
  interactable: boolean
  setConnection: (necessaryConnection: boolean) => void
}

const statuses: OrderItemStatus[] = ['CANCELLED', 'QUEUED', 'ONGOING', 'READY']

const OrderItemCard: React.FC<Props> = ({ item, interactable, setConnection }: Props) => {
  const dispatch = useAppDispatch()

  const slideIndex = [0, 1, 2, 3, 4]

  const [orderStatus, setOrderStatus] = useState<OrderItemStatus>(item.status)
  const [tagActive, setTagActive] = useState(-1)
  const [isStarted, setIsStarted] = useState(false)

  // Here we need to find based on the orderstatus where to start the slide index
  const [startingIndex, setStartingIndex] = useState(-1)

  useEffect(() => {
    switch (orderStatus) {
      case 'CANCELLED':
        setStartingIndex(0)
        setTagActive(0)
        break
      case 'QUEUED':
        setStartingIndex(1)
        setTagActive(1)
        break
      case 'ONGOING':
        setStartingIndex(2)
        setTagActive(2)
        break
      case 'READY':
        setStartingIndex(3)
        setTagActive(3)
        break
    }
  }, [orderStatus])

  useEffect(() => {
    if (orderStatus !== 'QUEUED') {
      setIsStarted(true)
    }
  }, [orderStatus])

  const handleStatus = async (code: number): Promise<void> => {
    const tempStatus: OrderItemStatus = statuses[code]

    if (tempStatus === 'CANCELLED') {
      Alert.alert('Notice', 'Are you sure you want to cancel this order? This can not be undone', [
        {
          text: 'Yes',
          onPress: () => {
            setOrderStatus(tempStatus)
            dispatch(
              asyncUpdateOrderItem({
                ...item,
                status: tempStatus,
              }),
            )
              .then((success: boolean) => {
                setConnection(success)
              })
              .catch((e) => {
                console.error(e)
                throw e
              })
          },
        },
        {
          text: 'Go Back',
          onPress: () => {
            setOrderStatus('QUEUED')
            setTagActive(1)
            setStartingIndex(1)
            dispatch(
              updateOrderItem({
                ...item,
                status: 'QUEUED',
              }),
            )
          },
        },
      ])
    } else if (tempStatus === 'READY') {
      Alert.alert('Notice', 'Are you sure you want to mark this order as finished? This cannot be undone', [
        {
          text: 'Yes',
          onPress: () => {
            setOrderStatus(tempStatus)
            dispatch(
              asyncUpdateOrderItem({
                ...item,
                status: tempStatus,
              }),
            )
              .then((success: boolean) => {
                setConnection(success)
              })
              .catch((e) => {
                console.error(e)
                throw e
              })
          },
        },
        {
          text: 'Go Back',
          onPress: () => {
            setOrderStatus('ONGOING')
            setTagActive(2)
            setStartingIndex(2)
            dispatch(
              updateOrderItem({
                ...item,
                status: 'ONGOING',
              }),
            )
          },
        },
      ])
    } else {
      dispatch(
        asyncUpdateOrderItem({
          ...item,
          status: tempStatus,
        }),
      )
        .then((success: boolean) => {
          setConnection(success)
        })
        .catch((e) => {
          console.error(e)
          throw e
        })
    }
  }

  const onchange = (nativeEvent: NativeScrollEvent): void => {
    const slide = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
    if (slide !== tagActive) {
      setTagActive(slide)
      handleStatus(slide).catch(console.error)
      setIsStarted(true)
      setStartingIndex(slide)
    }
  }

  return (
    <View style={styles.container}>
      {interactable ? (
        <ScrollView
          onScroll={({ nativeEvent }) => {
            onchange(nativeEvent)
          }}
          scrollEventThrottle={0}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
          contentOffset={{ x: startingIndex * LAYOUTS.getWidth(355), y: 0 }}
        >
          {slideIndex.map((index) => {
            return <OrderCardBackground status={index} orderItem={item} key={index} started={isStarted} />
          })}
        </ScrollView>
      ) : (
        <OrderCardBackground status={startingIndex} orderItem={item} started={isStarted} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: LAYOUTS.getWidth(50),
    width: LAYOUTS.getWidth(340),
    flex: 1,
    borderRadius: 5,
    marginBottom: LAYOUTS.getWidth(10),
    marginLeft: LAYOUTS.getWidth(2),
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: COLORS.white,
  },
  wrap: {
    height: LAYOUTS.getWidth(50),
    flex: 1,
    borderRadius: 5,
    marginBottom: LAYOUTS.getWidth(10),
    backgroundColor: COLORS.white,
  },
  timeContainer: {
    width: LAYOUTS.getWidth(80),
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: TEXTS.adjust(17),
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
  imageStyle: {
    height: LAYOUTS.getWidth(20),
    width: LAYOUTS.getWidth(20),
  },
})

export default OrderItemCard
