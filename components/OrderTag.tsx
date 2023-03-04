import React, { useEffect, useState } from 'react'
import { Alert, View, StyleSheet } from 'react-native'

import { COLORS } from '../constants/Colors'
import { TEXTS } from '../constants/Texts'
import { LAYOUTS } from '../constants/Layouts'
import { ScrollView } from 'react-native-gesture-handler'

import OrderTagPage from './OrderTagPage'

import { useAppDispatch } from '../store/TypedHooks'
import { asyncUpdateTransactionItem, TransactionItem, updateTransactionItem } from '../store/slices/TransactionItems'

interface Props {
  item: TransactionItem
  transactionItems: TransactionItem[]
  interactable: boolean
  render: () => void
}

enum Status {
  CANCELLED,
  PENDING,
  IN_PROGRESS,
  FINISHED,
  PICKED_UP,
}

const statuses = ['CANCELLED', 'PENDING', 'IN_PROGRESS', 'FINISHED', 'PICKED_UP']

const OrderTag: React.FC<Props> = ({ item, transactionItems, interactable }: Props) => {
  const dispatch = useAppDispatch()

  const transactionIndex = item.id
  const orderNum = item.id
  const slideIndex = [0, 1, 2, 3, 4]
  const orderDate = new Date(item.creationTime)
  const orderTime = (orderDate.getHours() % 12) + ':' + orderDate.getMinutes()

  const [orderStatus, setOrderStatus] = useState(item.orderStatus)
  const [tagActive, setTagActive] = useState(-1)
  const [isStarted, setIsStarted] = useState(false)

  //Here we need to find based on the orderstatus where to start the slide index
  const [startingIndex, setStartingIndex] = useState(-1)

  useEffect(() => {
    switch (orderStatus) {
      case 'CANCELLED':
        setStartingIndex(0)
        setTagActive(0)
        break
      case 'PENDING':
        setStartingIndex(1)
        setTagActive(1)
        break
      case 'IN_PROGRESS':
        setStartingIndex(2)
        setTagActive(2)
        break
      case 'FINISHED':
        setStartingIndex(3)
        setTagActive(3)
        break
      case 'PICKED_UP':
        setStartingIndex(4)
        setTagActive(4)
        break
    }
  }, [])

  useEffect(() => {
    if (orderStatus != 'PENDING') {
      setIsStarted(true)
    }
    // render()
  }, [orderStatus])

  const handleStatus = async (code: number) => {
    const status = statuses[code]
    console.log(status)

    // let tempStatus: 'CANCELLED' | 'PENDING' | 'IN_PROGRESS' | 'FINISHED' | 'PICKED_UP'
    dispatch(
      updateTransactionItem({
        ...transactionItems.find((element) => element.id == transactionIndex),
        orderStatus: status,
      })
    )
    dispatch(
      asyncUpdateTransactionItem({
        ...transactionItems.find((element) => element.id == transactionIndex),
        orderStatus: status,
      })
    )
    console.log('hey')
    return

    switch (code) {
      case 0:
        if (!isStarted) {
          setOrderStatus('PENDING')
        } else {
          Alert.alert('Notice', 'Are you sure you want to cancel this order? This can not be undone', [
            {
              text: 'Yes',
              onPress: () => {
                tempStatus = 'CANCELLED'
                setOrderStatus(tempStatus)
                slideIndex.forEach((indx) => {
                  console.log(orderNum + indx)
                })
                dispatch(
                  asyncUpdateTransactionItem({
                    ...transactionItems.find((element) => element.id == transactionIndex),
                    orderStatus: tempStatus,
                  })
                )
              },
            },
          ])
          tempStatus = 'CANCELLED'
          setOrderStatus(tempStatus)
        }
        dispatch(
          updateTransactionItem({
            ...transactionItems.find((element) => element.id == transactionIndex),
            orderStatus: tempStatus,
          })
        )
        break
      case 1:
        tempStatus = 'PENDING'
        setOrderStatus(tempStatus)
        dispatch(
          updateTransactionItem({
            ...transactionItems.find((element) => element.id == transactionIndex),
            orderStatus: tempStatus,
          })
        )
        break
      case 2:
        tempStatus = 'IN_PROGRESS'
        setOrderStatus(tempStatus)
        dispatch(
          updateTransactionItem({
            ...transactionItems.find((element) => element.id == transactionIndex),
            orderStatus: tempStatus,
          })
        )
        break
      case 3:
        tempStatus = 'FINISHED'
        setOrderStatus(tempStatus)
        slideIndex.forEach((indx) => {
          console.log(orderNum + indx)
        })
        dispatch(
          updateTransactionItem({
            ...transactionItems.find((element) => element.id == transactionIndex),
            orderStatus: tempStatus,
          })
        )
        break
      case 4:
        Alert.alert('Notice', 'Are you sure you this order has been picked up? This can not be undone', [
          {
            text: 'Yes',
            onPress: () => {
              tempStatus = 'PICKED_UP'
              setOrderStatus(tempStatus)
              slideIndex.forEach((indx) => {
                console.log(orderNum + indx)
              })
              dispatch(
                updateTransactionItem({
                  ...transactionItems.find((element) => element.id == transactionIndex),
                  orderStatus: tempStatus,
                })
              )
            },
          },
          {
            text: 'No',
            onPress: () => {
              tempStatus = 'FINISHED'
              setOrderStatus(tempStatus)
              slideIndex.forEach((indx) => {
                console.log(orderNum + indx)
              })
              dispatch(
                updateTransactionItem({
                  ...transactionItems.find((element) => element.id == transactionIndex),
                  orderStatus: tempStatus,
                })
              )
              setStartingIndex(3)
            },
          },
        ])

        break
    }
    //console.log(newTransactionItems[transactionIndex])
  }
  //console.log(orderNum)

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      console.log(slide, tagActive)
      if (slide != tagActive) {
        setTagActive(slide)
        handleStatus(slide)
        setIsStarted(true)
      }
    }
  }

  //alright threres some real spaghetti here to get this to work...
  //not proud of it but can be adressed later I suppose
  return (
    //<SafeAreaView style={{flex: 1}}>
    <View style={{ ...styles.container }}>
      {interactable ? (
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
          contentOffset={{ x: startingIndex * LAYOUTS.getWidth(355), y: 0 }}
        >
          {slideIndex.map((index) => {
            return <OrderTagPage status={index} orderItem={item} key={index} started={isStarted} time={orderTime} />
          })}
        </ScrollView>
      ) : (
        <OrderTagPage status={startingIndex} orderItem={item} started={isStarted} time={orderTime} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: LAYOUTS.getWidth(50),
    width: LAYOUTS.getWidth(355),
    flex: 1,
    borderRadius: 5,
    marginBottom: LAYOUTS.getWidth(10),
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: COLORS.white,
    // borderColor: 'black',
    // borderWidth: 2
  },
  wrap: {
    height: LAYOUTS.getWidth(50),
    flex: 1,
    borderRadius: 5,
    marginBottom: LAYOUTS.getWidth(10),
    backgroundColor: COLORS.white,
    //borderWidth: 3
  },
  timeContainer: {
    width: LAYOUTS.getWidth(80),
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: TEXTS.adjust(17),
    color: COLORS.black,
    //fontFamily: 'HindSiliguri-Bold'
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
  imageStyle: {
    height: LAYOUTS.getWidth(20),
    width: LAYOUTS.getWidth(20),
  },
})

export default OrderTag
