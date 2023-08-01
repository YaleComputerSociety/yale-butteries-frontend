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
  onPress: () => void
}

export const ButteryCard: FC<butteryProps> = (props: butteryProps) => {
  const [isOpen, setIsOpen] = useState(true)

  let open = props.openTime.split(" ")
  let close = props.closeTime.split(" ")

  const [openTime, setOpenTime] = useState(open[0] + ':' + open[1] + open[2])
  const [closeTime, setCloseTime] = useState(close[0] + ':' + close[1] + close[2])

  const [day, setDay] = useState(0)

  const activeText = props.active ? 'CLOSED' : 'INACTIVE'
  const days = ['S ', 'M ', 'T ', 'W ', 'T ', 'F ', 'S ']
  const DAY_CUTOFF = 5

  // turns string input into date object. Upper indicates if this is the close time
  const setDateTime = function (str: string, upper: boolean) {
    const sp = str.split(':')
    const date = new Date()
    const today = new Date()
    date.setHours(parseInt(sp[0]))
    date.setMinutes(parseInt(sp[1]))
    date.setSeconds(0)
    if (upper && date.getHours() <= DAY_CUTOFF) {
      date.setDate(date.getDate() + 1)
    }
    if (today.getHours() <= DAY_CUTOFF) {
      date.setDate(date.getDate() - 1)
    }
    return date
  }

  const displayTime = (): string => {
    return openTime + ' - ' + closeTime
  }
  // determines whether the buttery is currently open
  function currentlyOpen() {
    const today = new Date()
    const lower = setDateTime(props.openTime, false)
    const upper = setDateTime(props.closeTime, true)

    if (today.getHours() <= DAY_CUTOFF) {
      setDay((today.getDate() - 1) % 6)
    } else {
      setDay(today.getDate())
    }

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

  const getDayVisual = (value: boolean, index: number) => {
    return (
      <Text style={[value ? card.dayActive : card.dayInactive, day === index ? card.underlined : null]} key={index}>
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
      disabled={(isOpen && props.active)}
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
          <Text style={card.cardText2}>{displayTime()}</Text>
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
