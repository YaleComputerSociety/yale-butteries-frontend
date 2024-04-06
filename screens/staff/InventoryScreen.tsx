import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import type { NavigationStackProp } from 'react-navigation-stack'
import type { NavigationParams } from 'react-navigation'
import { useIsFocused } from '@react-navigation/native'

import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import { asyncFetchMenuItems } from '../../store/slices/MenuItems'
import InventoryItemCard from '../../components/staff/InventoryItemCard'
import { COLORS } from '../../constants/Colors'
import { TEXTS } from '../../constants/Texts'
import { LAYOUTS } from '../../constants/Layouts'
import EvilModal from '../../components/EvilModal'
import type { MenuItem } from '../../utils/types'

const InventoryScreen: React.FC<{ navigation: NavigationStackProp<{ collegeName: string }, NavigationParams> }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  const { menuItems, isLoading: isLoadingMenuItems } = useAppSelector((state) => state.menuItems)
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const [localMenu, setLocalMenu] = useState<MenuItem[]>([])
  const [connection, setConnection] = useState(true)

  useEffect(() => {
    const temp = async (): Promise<void> => {
      if (isLoadingMenuItems || menuItems == null) {
        await dispatch(asyncFetchMenuItems()).then((success: boolean) => {
          setConnection(success)
        })
      }
    }
    temp().catch((err) => {
      console.error(err)
    })
  }, [isLoadingMenuItems, isFocused, menuItems, dispatch])

  useEffect(() => {
    if (menuItems != null && currentUser != null) {
      setLocalMenu(
        menuItems
          .filter((element) => element.collegeId === currentUser.collegeId)
          .sort((a, b) => a.name.localeCompare(b.name)),
      )
    }
  }, [currentUser, menuItems])

  return (
    <View style={{ ...styles.container }}>
      {!connection && <EvilModal toggle={setConnection} display={!connection} />}
      {menuItems == null || isLoadingMenuItems ? (
        <ScrollView style={{ ...styles.scrollView }}>
          <Text style={{ ...styles.title }}>Loading menu</Text>
          <ActivityIndicator style={styles.loader} size="large" />
        </ScrollView>
      ) : (
        <ScrollView style={{ ...styles.scrollView }}>
          {localMenu.map((item, i) => {
            return <InventoryItemCard key={i} item={item} setConnection={setConnection} />
          })}
          <View style={styles.buttonHolder}>
            <TouchableOpacity
              style={{ ...styles.button, marginBottom: LAYOUTS.getWidth(30) }}
              onPress={() => {
                navigation.push('Create')
              }}
            >
              <Text style={{ ...styles.buttonText }}>Add new item</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default InventoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: TEXTS.adjust(30),
    marginBottom: LAYOUTS.getWidth(8),
    color: COLORS.black,
    fontWeight: '500',
  },
  title2: {
    fontSize: TEXTS.adjust(30),
    marginBottom: LAYOUTS.getWidth(8),
    marginTop: LAYOUTS.getWidth(8),
    color: COLORS.black,
    fontWeight: '500',
  },
  scrollView: {
    paddingTop: LAYOUTS.getWidth(10),
    paddingHorizontal: LAYOUTS.getWidth(10),
    backgroundColor: '#121212',
    flex: 1,
  },
  loader: {
    marginTop: LAYOUTS.getWidth(100),
  },
  tag: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttonHolder: {
    alignItems: 'center',
  },
  button: {
    width: LAYOUTS.getWidth(150),
    height: LAYOUTS.getWidth(20),
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: LAYOUTS.getWidth(10),
    marginTop: LAYOUTS.getWidth(5),
  },
  buttonText: {
    fontSize: TEXTS.adjust(15),
    fontWeight: '400',
    color: 'blue',
    textAlign: 'center',
  },
})
