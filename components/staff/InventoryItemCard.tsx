import React, { useState } from 'react'
import { Switch, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAppDispatch } from '../../store/ReduxStore'

import { LAYOUTS } from '../../constants/Layouts'
import { asyncUpdateMenuItem } from '../../store/slices/MenuItems'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { priceToText } from '../../utils/functions'

import type { MenuItem } from '../../utils/types'

interface Props {
  item: MenuItem
  setConnection: (connection: boolean) => void
}

const InventoryItemCard: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const [item, setItem] = useState<MenuItem>(props.item)

  const handleSwitch = (): void => {
    setItem({ ...item, isActive: !item.isActive })
    dispatch(asyncUpdateMenuItem({ ...props.item, isActive: !props.item.isActive })).then((success: boolean) => {
      props.setConnection(success)
    })
  }

  const dynamicContainerStyle = {
    opacity: item.isActive ? 1 : 0.4,
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.container, dynamicContainerStyle]}
        onPress={() => {
          navigation.push('Edit', { data: props.item })
        }}
      >
        <View style={styles.nameContainer}>
          <Text style={styles.itemName}>{props.item.name}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.itemPrice}>{priceToText(props.item.price)}</Text>
          <Switch value={props.item.isActive} onValueChange={handleSwitch} />
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  itemPrice: {
    color: 'rgba(255,255,255, 0.87)',
    fontSize: 15,
    fontWeight: '400',
    marginRight: LAYOUTS.getWidth(10),
  },
  itemName: { color: 'rgba(255,255,255, 0.87)', fontSize: 15, fontWeight: '500' },
  container: {
    borderRadius: 10,
    marginBottom: LAYOUTS.getWidth(10),
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingVertical: LAYOUTS.getWidth(5),
    height: LAYOUTS.getWidth(40),
    paddingHorizontal: LAYOUTS.getWidth(8),
    backgroundColor: '#383838',
  },
  nameContainer: {
    justifyContent: 'center',
  },
  priceContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default InventoryItemCard
