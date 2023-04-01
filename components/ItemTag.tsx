import React, { useEffect, useState, useRef } from 'react'
import { Switch, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector } from '../store/TypedHooks'

import { FUNCTIONS } from '../constants/Functions'
import { LAYOUTS } from '../constants/Layouts'
import { MenuItem, asyncUpdateMenuItem, updateMenuItem } from '../store/slices/MenuItems'
import { useNavigation } from '@react-navigation/native'

import { priceToText } from '../Functions'

const ItemTag = (props) => {
  // const [item, setItem] = useState(props.item)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const { menuItems } = useAppSelector((state) => state.menuItems)
  const [item, setItem] = useState<MenuItem | null>()

  const handleSwitch = () => {
    const temp = menuItems.find((i) => {
      return i.id === props.item.id
    })
    setItem(temp)
    console.log(temp, 'hi there', item)
    // dispatch(updateMenuItem(item))
    dispatch(asyncUpdateMenuItem({ ...item, isActive: !item.isActive }))
    // setItem({ ...item, isActive: !item.isActive })
  }

  useEffect(() => {
    console.log(item)
  }, [item])

  return (
    <>
      {item.isActive ? (
        <TouchableOpacity
          style={{ ...styles.container, backgroundColor: 'white' }}
          onPress={() => {
            navigation.push('EditItem', { data: props.item })
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
            navigation.push('EditItem', { data: props.item })
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

export default ItemTag
