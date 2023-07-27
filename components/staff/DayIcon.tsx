import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, Pressable, Alert, View } from 'react-native'

interface Props {
  text: String
  active: boolean
  openDays: String[]
}

const DayIcon: FC<Props> = (props: Props) => {
  const [active, setActive] = useState(props.active)
  useEffect(() => {
    if (props.active) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [props.openDays])

  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={[active ? styles.active : styles.normal, styles.icon]}
      >
        <Text style={styles.text}>{props.text.substring(0,3)}</Text>
      </View>
      <Text style={[active ? styles.normalText : styles.activeText]}>{active ? 'Open' : 'Closed'}</Text>
    </View>
  )
}

const styles  = StyleSheet.create({
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
    },
    active: {
      backgroundColor: '#5cb85c'
    },
    normal: {
      backgroundColor: 'red'
    },
    activeText: {
      marginTop: 5,
      color: 'red',
      fontFamily: 'HindSiliguri-Bold',
    },
    normalText: {
      color: 'black',
      marginTop: 5,
      fontFamily: 'HindSiliguri-Bold',
    }
})

export default DayIcon