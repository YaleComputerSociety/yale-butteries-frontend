import React, { useState, useEffect, FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import { card, home } from '../styles/HomeStyles'
import SpriteSheet from 'rn-sprite-sheet'

interface butteryProps {
  college: string
  openTime: string
  closeTime: string
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

  // determines whether the buttery is currently open
  function currentlyOpen() {
    const h = new Date().getHours()
    const m = new Date().getMinutes()

    if (openTimeHours < closeTimeHours) {
      // standard case
      return (
        (h > openTimeHours && h < closeTimeHours) ||
        (h == openTimeHours && m >= openTimeMinutes) ||
        (h == closeTimeHours && m < closeTimeMinutes)
      )
    } else if (openTimeHours > closeTimeHours) {
      // time wraps around midnight
      return (
        h > openTimeHours ||
        h < closeTimeHours ||
        (h == openTimeHours && m >= openTimeMinutes) ||
        (h == closeTimeHours && m < closeTimeMinutes)
      )
    } else {
      // within the same hour
      return m >= openTimeMinutes && m < closeTimeMinutes
    }
  }

  // immediately check if the buttery is open
  useEffect(() => {
    setIsOpen(currentlyOpen())
  }, [isOpen])

  //check every minute whether the buttery is open
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(currentlyOpen())
    }, 1000)
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
      (openTimeHours % 12) +
      ':' +
      (openTimeMinutes < 10 ? '0' : '') +
      openTimeMinutes +
      (openTimeHours > 12 ? 'pm' : 'am')
    const cleanClose =
      (closeTimeHours % 12) +
      ':' +
      (closeTimeMinutes < 10 ? '0' : '') +
      closeTimeMinutes +
      (closeTimeHours > 12 ? 'pm' : 'am')
    return cleanOpen + ' - ' + cleanClose
  }

  return (
    <Pressable
      onPress={props.onPress}
      disabled={!props.active}
      style={({ pressed }) => [{ opacity: pressed || !props.active ? 0.7 : 1 }]}
    >
      <View style={card.cardContent}>
        <View style={home.textContent}>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text style={card.cardText1}>{props.college}</Text>
            <Text
              style={{
                opacity: props.active ? 0 : 1,
                alignSelf: 'center',
                color: 'white',
                paddingHorizontal: 8,
                marginLeft: 10,
                backgroundColor: '#ff9600',
                fontFamily: 'HindSiliguri-Bold',
              }}
            >
              {activeText}
            </Text>
          </View>
          <Text style={card.cardText2}>{cleanTime()}</Text>
        </View>
        <SpriteSheet
          source={require('../assets/college_icon_sprite_sheet.png')}
          columns={1}
          rows={14}
          width={100}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          offsetY={props.offsetY}
        />
        {/*<Image style={card.butteryIcon} source={props.image} />*/}
      </View>
    </Pressable>
  )
}

ButteryCard.defaultProps = {
  college: 'Placeholder',
  //image: require('../assets/images/butteryIconPlaceholder.jpg'),
  offsetY: 0,
}
