import React, { useEffect, useState } from 'react'
import { Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import { COLORS } from '../../constants/Colors'
import { TEXTS } from '../../constants/Texts'
import { LAYOUTS } from '../../constants/Layouts'

import OrderCard from './OrderCard'
import { card, home } from '../../styles/ButteriesStyles'

import { useAppDispatch } from '../../store/ReduxStore'
import { asyncUpdateTransactionItem, TransactionItem, updateTransactionItem } from '../../store/slices/TransactionItems'
import { cleanTime } from '../../Functions'

interface Props {
  transactionItems: TransactionItem[]
  interactable: boolean
  isWaiting: boolean
  setConnection: (necessaryConnection: boolean) => void
}

const BigCard: React.FC<Props> = ({transactionItems, interactable, setConnection, isWaiting}: Props) => {
    const dispatch = useAppDispatch()
    
    const newItems = Object.values(transactionItems);
    const orderTime = cleanTime(new Date(newItems[0].creationTime))
    // const [declineClicked, setDeclineClicked] = useState(false)
    // console.log(newItems)
    const acceptClick = () => {
        newItems.forEach((item) => {
            item.orderStatus = 'ONGOING' //update instants
        })
        newItems.forEach((item) => {
            dispatch(
                asyncUpdateTransactionItem({
                  ...item,
                  orderStatus: 'ONGOING',
                })
              ).then((success: boolean) => {
                setConnection(success)
            }).catch((e) => {
                console.error(e)
            })
        })
    }
    const declineClick = () => {
        newItems.forEach((item) => {
            dispatch(
                asyncUpdateTransactionItem({
                  ...item,
                  orderStatus: 'CANCELLED',
                })
              ).then((success: boolean) => {
                setConnection(success)
            })
        })
        // setDeclineClicked(true)
    }
    return (
        <View style={styles.background}>
            <View style = {styles.topContainer}>
                <Text style={card.cardText1}>NetID: {newItems[0].user}</Text>
                <Text style={card.cardText2}>Time: {orderTime}</Text>
            </View>
            {newItems.map((element) => {
                return (
                    <View key={element.id + 'vv'} style={styles.tag}>
                        <OrderCard
                            item={element}
                            transactionItems={newItems}
                            interactable={interactable}
                            setConnection={setConnection}
                            key={element.id + 'b'}
                        />
                    </View>
                )
            })}
            <View style={styles.buttonContainer}>
              {isWaiting && 
                  (<TouchableOpacity style={styles.accept} onPress={acceptClick}>
                      <Text style={{color: 'white'}}>Accept {'\u2713'}</Text>
                  </TouchableOpacity>)
              }
              {isWaiting && 
                  (<TouchableOpacity style={styles.decline} onPress={declineClick}>
                      <Text style={{color: 'white'}}>Decline {'\u2717'}</Text>
                  </TouchableOpacity>)
              }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tag: {
        //borderWidth: 3,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    accept: {
        backgroundColor: '#44CC44',
        padding: 8,
        margin: 10,
        borderRadius: 12
    },
    decline: {
        backgroundColor: 'red',
        padding: 8,
        margin: 10,
        borderRadius: 12
    },
    background: {
        backgroundColor: '#1f1f1f',
        padding: 5,
        marginBottom: LAYOUTS.getWidth(10),
        borderRadius: 8
    },
    boldText: {
      fontSize: TEXTS.adjust(15),
      color: COLORS.black,
    },
    topContainer: {
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      padding: 8
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }
  })

export default BigCard