import React, { useState, useEffect, FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import { card, home } from '../../styles/ButtereiesStyles'
import SpriteSheet from 'rn-sprite-sheet'

interface butteryProps {
  college: string
  openTime: string
  closeTime: string
  daysOpen: boolean[]
  offsetY: number
  active: boolean
  onPress: () => void
}

export const ButteryCard: FC<butteryProps> = (props: butteryProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const [openTimeHours, setOpenTimeHours] = useState(0)
  const [closeTimeHours, setCloseTimeHours] = useState(0)
  const [openTimeMinutes, setOpenTimeMinutes] = useState(0)
  const [closeTimeMinutes, setCloseTimeMinutes] = useState(0)
  const activeText = props.active ? 'CLOSED' : 'INACTIVE'
  const days = ['S ', 'M ', 'T ', 'W ', 'T ', 'F ', 'S ']
  const d = new Date().getDay()

  // turns string input into date object. Upper indicates if this is the close time
  const setDateTime = function (str: string, upper: boolean) {
    const sp = str.split(':')
    const date = new Date()
    date.setHours(parseInt(sp[0]))
    date.setMinutes(parseInt(sp[1]))
    date.setSeconds(0)
    if (upper && date.getHours() < 10) {
      date.setDate(date.getDate() + 1)
    }
    return date
  }

  // determines whether the buttery is currently open
  function currentlyOpen() {
    const today = new Date()
    const lower = setDateTime(props.openTime, false)
    const upper = setDateTime(props.closeTime, true)

    return today < upper && today >= lower
  }

  //check every 20 seconds whether the buttery is open
  useEffect(() => {
    setIsOpen(currentlyOpen())
    const interval = setInterval(() => {
      setIsOpen(currentlyOpen())
    }, 20000)
    return () => clearInterval(interval)
  }, [isOpen])

  // translate openTime/closeTime into openTimeHours etc
  useEffect(() => {
    setOpenTimeHours(
      parseInt(props.openTime.substring(0, props.openTime.indexOf(':'))) +
        (props.openTime.toString().includes('pm') ? 12 : 0)
    )
    setOpenTimeMinutes(parseInt(props.openTime.substring(props.openTime.indexOf(':') + 1)))
    setCloseTimeHours(
      parseInt(props.closeTime.substring(0, props.closeTime.indexOf(':'))) +
        (props.closeTime.toString().includes('pm') ? 12 : 0)
    )
    setCloseTimeMinutes(parseInt(props.closeTime.substring(props.closeTime.indexOf(':') + 1)))
  }, [props.openTime, props.closeTime])

  // takes openTime and closeTime and puts them into clean text form. Assumes (h)h:(m)m form with optional pm/am
  function cleanTime() {
    const cleanOpen =
      (openTimeHours % 12 == 0 ? 12 : openTimeHours % 12) +
      ':' +
      (openTimeMinutes < 10 ? '0' : '') +
      openTimeMinutes +
      (openTimeHours > 12 ? 'pm' : 'am')
    const cleanClose =
      (closeTimeHours % 12 == 0 ? 12 : closeTimeHours % 12) +
      ':' +
      (closeTimeMinutes < 10 ? '0' : '') +
      closeTimeMinutes +
      (closeTimeHours > 12 ? 'pm' : 'am')
    return cleanOpen + ' - ' + cleanClose
  }

  const getDayVisual = (value: boolean, index: number) => {
    return (
      <Text style={[value ? card.dayActive : card.dayInactive, d === index ? card.underlined : null]} key={index}>
        {days[index]}{' '}
      </Text>
    )
  }

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
      disabled={!(isOpen && props.active)}
      style={({ pressed }) => [
        {
          opacity: props.active && isOpen ? 1 : 0.6,
          backgroundColor: pressed ? 'rgba(0, 0, 0, 0.075)' : 'rgba(0, 0, 0, 0.025)',
          marginTop: 10,
          marginHorizontal: 10,
        },
      ]}
    >
      <View style={card.cardContent}>
        <View style={home.textContent}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={card.cardText1}>{props.college}</Text>
            <Text
              style={[
                { opacity: props.active && isOpen ? 0 : 1, backgroundColor: props.active ? '#ee3930' : '#ff9600' },
                card.banner,
              ]}
            >
              {activeText}
            </Text>
          </View>
          <Text style={card.cardText2}>{cleanTime()}</Text>
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
