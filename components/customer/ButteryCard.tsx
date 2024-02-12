import React, { useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import SpriteSheet from 'rn-sprite-sheet'

import { useAppSelector } from '../../store/ReduxStore'
import { card, home } from '../../styles/ButteriesStyles'
import { getCollegeAcceptingOrders } from '../../utils/functions'

interface butteryProps {
  college: string
  isAcceptingOrders: boolean
  openTime: string
  closeTime: string
  daysOpen: boolean[]
  offsetY: number
  active: boolean
  isOpen: boolean
  onPress: () => void
}

export const ButteryCard: React.FC<butteryProps> = (props: butteryProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen)

  const { colleges } = useAppSelector((state) => state.colleges)
  const acceptingOrders = getCollegeAcceptingOrders(colleges, props.college)

  const open = props.openTime.split(' ')
  const close = props.closeTime.split(' ')

  const [openTime, setOpenTime] = useState(open[0] + ':' + open[1] + open[2])
  const [closeTime, setCloseTime] = useState(close[0] + ':' + close[1] + close[2])

  const d = new Date()
  const currentDay = d.getDay()

  const activeText = props.active ? 'CLOSED' : 'INACTIVE'
  const busyText = !acceptingOrders ? 'BUSY' : activeText
  const days = ['S ', 'M ', 'T ', 'W ', 'T ', 'F ', 'S ']

  const getDayVisual = (value: boolean, index: number): React.ReactElement => {
    return (
      <Text
        style={[value ? card.dayActive : card.dayInactive, currentDay === index ? card.underlined : null]}
        key={index}
      >
        {days[index]}{' '}
      </Text>
    )
  }

  // does this do anything?
  useEffect(() => {
    setOpenTime(open[0] + ':' + open[1] + open[2])
    setCloseTime(close[0] + ':' + close[1] + close[2])
    setIsOpen(props.isOpen)
  }, [close, isOpen, open, props.isOpen])

  const getAllWeekDays = (): React.ReactElement => {
    const weekDays: JSX.Element[] = []

    for (let i = 0; i < days.length; i++) {
      weekDays.push(getDayVisual(props.daysOpen[i], i))
    }

    return <View style={card.dayContainer}>{weekDays}</View>
  }

  const dynamicBanner = {
    opacity: props.active && isOpen && acceptingOrders ? 0 : 1,
    backgroundColor: props.active && isOpen && !acceptingOrders ? '#edcd2f' : props.active ? '#ee3930' : '#ff9600',
  }

  return (
    <Pressable
      onPress={props.onPress}
      disabled={!isOpen || !props.active}
      style={({ pressed }) => [
        {
          opacity: props.active && isOpen ? 1 : 0.5,
          backgroundColor: pressed ? 'rgba(255, 255, 255, 0.075)' : 'rgba(255, 255, 255, 0.05)',
          marginTop: 10,
          marginHorizontal: 10,
          borderRadius: 8,
          height: 110,
        },
      ]}
    >
      <View style={card.cardContent}>
        <View style={home.textContent}>
          <View style={card.innerContainer}>
            <Text style={card.cardText1}>{props.college}</Text>
            <View style={[dynamicBanner, card.banner]}>
              <Text style={card.acceptingOrders}>{!acceptingOrders && isOpen ? busyText : activeText}</Text>
            </View>
          </View>
          <Text style={card.cardText2}>{openTime + ' - ' + closeTime}</Text>
          {getAllWeekDays()}
        </View>
        <SpriteSheet
          source={require('../../assets/college_icon_sprite_sheet.png')}
          columns={1}
          rows={14}
          width={100}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          offsetY={props.offsetY} // this library doesn't have up-to-date typescript support
        />
      </View>
    </Pressable>
  )
}

ButteryCard.defaultProps = {
  college: 'Placeholder',
  offsetY: 0,
}
