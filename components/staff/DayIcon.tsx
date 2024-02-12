import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Pressable, View } from 'react-native'

interface Props {
  text: string
  active: boolean
  openDays: string[]
  action: (day: string) => void
  day: string
}

const DayIcon: React.FC<Props> = (props: Props) => {
  const [active, setActive] = useState(props.active)
  useEffect(() => {
    if (props.active) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [props.active, props.openDays])

  const handleSwitch = (): void => {
    props.action(props.day)
    setActive(!active)
  }

  return (
    <Pressable onPress={handleSwitch}>
      <View style={styles.centered}>
        <View style={[active ? styles.active : styles.normal, styles.icon]}>
          <Text style={styles.text}>{props.text.substring(0, 3)}</Text>
        </View>
        <Text style={[active ? styles.normalText : styles.activeText]}>{active ? 'Open' : 'Closed'}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  centered: { alignItems: 'center' },
  icon: {
    borderRadius: 100,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontFamily: 'HindSiliguri-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'rgba(255,255,255, 0.87)',
  },
  active: {
    backgroundColor: '#5cb85c',
  },
  normal: {
    backgroundColor: 'red',
  },
  activeText: {
    marginTop: 5,
    color: 'red',
    fontFamily: 'HindSiliguri-Bold',
  },
  normalText: {
    color: 'rgba(255,255,255, 0.87)',
    marginTop: 5,
    fontFamily: 'HindSiliguri-Bold',
  },
})

export default DayIcon
