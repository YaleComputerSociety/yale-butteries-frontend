import React, { FC, useEffect, useState } from 'react'
import { Switch, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAppDispatch } from '../../store/ReduxStore'

import { LAYOUTS } from '../../constants/Layouts'
import { MenuItem, asyncUpdateMenuItem, updateMenuItem } from '../../store/slices/MenuItems'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { priceToText } from '../../Functions'

interface Props {
  item: MenuItem
  setConnection: (connection: boolean) => void
}

const InventoryItemCard: FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const [item, setItem] = useState<MenuItem>(props.item)

  const handleSwitch = () => {
    setItem({ ...item, isActive: !item.isActive })
    dispatch(asyncUpdateMenuItem({ ...item, isActive: !item.isActive })).then((success: boolean) => {
      props.setConnection(success)
    })
  }

  return (
    <>
      {item.isActive ? (
        <TouchableOpacity
          style={{ ...styles.container, backgroundColor: 'white' }}
          onPress={() => {
            navigation.push('Edit', { data: props.item })
          }}
        >
          <View style={{ ...styles.nameContainer }}>
            <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>{item.item}</Text>
          </View>
          <View style={{ ...styles.priceContainer }}>
            <Text style={{ color: 'black', fontSize: 15, fontWeight: '400', marginRight: LAYOUTS.getWidth(10) }}>
              {priceToText(item.price)}
            </Text>
            <Switch value={item.isActive} onValueChange={handleSwitch} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ ...styles.container, backgroundColor: 'white' }}
          onPress={() => {
            navigation.push('Edit', { data: props.item })
          }}
        >
          <View style={{ ...styles.nameContainer }}>
            <Text style={{ color: 'gray', fontSize: 15, fontWeight: '500' }}>{item.item}</Text>
          </View>
          <View style={{ ...styles.priceContainer }}>
            <Text style={{ color: 'gray', fontSize: 15, fontWeight: '400', marginRight: LAYOUTS.getWidth(10) }}>
              {priceToText(item.price)}
            </Text>
            <Switch value={item.isActive} onValueChange={handleSwitch} />
          </View>
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginBottom: LAYOUTS.getWidth(10),
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingVertical: LAYOUTS.getWidth(5),
    height: LAYOUTS.getWidth(40),
    paddingHorizontal: LAYOUTS.getWidth(8),
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
