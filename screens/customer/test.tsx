import React, { useRef } from 'react'
import { SectionList, Text, Button, View } from 'react-native'
import type { MenuItem } from '../../utils/types'
import { MenuItemCard } from '../../components/customer/MenuItemCard'

const MenuList: React.FC = () => {
  const sectionListRef = useRef<SectionList<MenuItem>>(null)

  interface SectionType {
    title: string
    data: MenuItem[]
  }

  const sections: SectionType[] = [
    {
      title: 'Food',
      data: currentMenuItems.filter((menuItem) => menuItem.foodType === 'FOOD'),
    },
    {
      title: 'Drink',
      data: currentMenuItems.filter((menuItem) => menuItem.foodType === 'DRINK'),
    },
    {
      title: 'Dessert',
      data: currentMenuItems.filter((menuItem) => menuItem.foodType === 'DESSERT'),
    },
  ]

  const scrollToSection = (sectionIndex: number) => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      animated: true,
    })
  }

  return (
    <View>
      <Button
        title="Food"
        onPress={() => {
          scrollToSection(0)
        }}
      />
      <Button
        title="Drink"
        onPress={() => {
          scrollToSection(1)
        }}
      />
      <Button
        title="Dessert"
        onPress={() => {
          scrollToSection(2)
        }}
      />
      <SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MenuItemCard menuItem={item} />}
        renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
      />
    </View>
  )
}

export default MenuList
