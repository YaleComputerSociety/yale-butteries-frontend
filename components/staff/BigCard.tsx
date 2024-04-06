import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import { COLORS } from '../../constants/Colors'
import { TEXTS } from '../../constants/Texts'
import { LAYOUTS } from '../../constants/Layouts'
import { card } from '../../styles/ButteriesStyles'
import { useAppDispatch } from '../../store/ReduxStore'
import { asyncUpdateOrderItem } from '../../store/slices/OrderItem'
import type { OrderItem } from '../../utils/types'

import OrderItemCard from './OrderItemCard'

interface Props {
  orderItems: OrderItem[]
  interactable: boolean
  isWaiting: boolean
  setConnection: (necessaryConnection: boolean) => void
}

const BigCard: React.FC<Props> = ({ orderItems, interactable, setConnection, isWaiting }: Props) => {
  const dispatch = useAppDispatch()

  const newItems = Object.values(orderItems)
  newItems.sort((a, b) => a.id - b.id)
  const acceptClick = (): void => {
    newItems.forEach((item) => {
      item.status = 'ONGOING'
    })
    newItems.forEach((item) => {
      dispatch(
        asyncUpdateOrderItem({
          ...item,
          status: 'ONGOING',
        }),
      )
        .then((success: boolean) => {
          setConnection(success)
        })
        .catch((e) => {
          console.error(e)
        })
    })
  }
  const declineClick = (): void => {
    newItems.forEach((item) => {
      void dispatch(
        asyncUpdateOrderItem({
          ...item,
          status: 'CANCELLED',
        }),
      ).then((success: boolean) => {
        setConnection(success)
      })
    })
  }
  return (
    <View style={styles.backgroundCard}>
      <View style={styles.topContainer}>
        <Text style={card.cardText1}>Name: {'change'}</Text>
      </View>
      {newItems.map((element) => {
        return (
          <View key={element.id + 'vv'} style={styles.tag}>
            <OrderItemCard
              item={element}
              orderItems={newItems}
              interactable={interactable}
              setConnection={setConnection}
              key={element.id + 'b'}
            />
          </View>
        )
      })}
      <View style={styles.buttonContainer}>
        {isWaiting && (
          <>
            <TouchableOpacity style={styles.accept} onPress={acceptClick}>
              <Text style={styles.text}>Accept {'\u2713'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.decline} onPress={declineClick}>
              <Text style={styles.text}>Decline {'\u2717'}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: { color: 'white' },
  tag: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  accept: {
    backgroundColor: '#44CC44',
    padding: 8,
    margin: 10,
    borderRadius: 8,
    justifyContent: 'center',
    verticalAlign: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  decline: {
    backgroundColor: 'red',
    padding: 8,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 8,
    flex: 0.5,
    alignItems: 'center',
  },
  backgroundCard: {
    backgroundColor: '#1f1f1f',
    padding: 5,
    marginBottom: LAYOUTS.getWidth(10),
    borderRadius: 8,
    flex: 1,
  },
  boldText: {
    fontSize: TEXTS.adjust(15),
    color: COLORS.black,
  },
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default BigCard
