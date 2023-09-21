import React, { useState, useEffect, FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import { card, home } from '../../styles/ButteriesStyles'
import SpriteSheet from 'rn-sprite-sheet'

interface butteryProps {
  college: string
  openTime: string
  closeTime: string
  daysOpen: boolean[]
  offsetY: number
  active: boolean
  isOpen: boolean
  onPress: () => void
}

export const ButteryCard: FC<butteryProps> = (props: butteryProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen)

  let open = props.openTime.split(' ')
  let close = props.closeTime.split(' ')

  const [openTime, setOpenTime] = useState(open[0] + ':' + open[1] + open[2])
  const [closeTime, setCloseTime] = useState(close[0] + ':' + close[1] + close[2])

  const d = new Date()
  let currentDay = d.getDay()
  let currentHour = d.getHours()

  const activeText = props.active ? 'CLOSED' : 'INACTIVE'
  const days = ['S ', 'M ', 'T ', 'W ', 'T ', 'F ', 'S ']

  const getDayVisual = (value: boolean, index: number) => {
    return (
      <Text
        style={[value ? card.dayActive : card.dayInactive, currentDay === index ? card.underlined : null]}
        key={index}
      >
        {days[index]}{' '}
      </Text>
    )
  }

  useEffect(() => {
    open = props.openTime.split(' ')
    close = props.closeTime.split(' ')
    setOpenTime(open[0] + ':' + open[1] + open[2])
    setCloseTime(close[0] + ':' + close[1] + close[2])
    setIsOpen(props.isOpen)
  }, [open, close, isOpen])

  const getAllWeekDays = () => {
    const weekDays: JSX.Element[] = []

    for (let i = 0; i < days.length; i++) {
      weekDays.push(getDayVisual(props.daysOpen[i], i))
    }

    return <View style={card.dayContainer}>{weekDays}</View>
  }

  return (
    <Pressable
      onPress={props.onPress}
      disabled={isOpen || !props.active}
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
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={card.cardText1}>{props.college}</Text>
            <View
              style={[
                {
                  opacity: props.active && isOpen ? 0 : 1,
                  backgroundColor: props.active ? '#ee3930' : '#ff9600',
                },
                card.banner,
              ]}
            >
              <Text
                style={{
                  fontFamily: 'HindSiliguri-Bold',
                  color: 'rgba(255,255,255,0.87)',
                }}
              >
                {activeText}
              </Text>
            </View>
          </View>
          <Text style={card.cardText2}>{openTime + ' - ' + closeTime}</Text>
          {getAllWeekDays()}
        </View>
        {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore */}
        <SpriteSheet
          source={require('../../assets/college_icon_sprite_sheet.png')}
          columns={1}
          rows={14}
          width={100}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          offsetY={props.offsetY}
        />
      </View>
    </Pressable>
  )
}

ButteryCard.defaultProps = {
  college: 'Placeholder',
  offsetY: 0,
}
