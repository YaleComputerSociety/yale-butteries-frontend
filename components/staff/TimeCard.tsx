import React, { useState } from 'react'
import { StyleSheet, Text, Pressable, View, TextInput } from 'react-native'
import { militaryToAnalog } from '../../utils/functions'

interface Props {
  time: string
  hour: (hour) => void
  minutes: (minutes) => void
  meridiem: (meridiem) => void
}

const TimeCard: React.FC<Props> = (props: Props) => {
  const time = militaryToAnalog(props.time).split(' ')

  const [hour, setHour] = useState(time[0])
  const [minute, setMinute] = useState(time[1])
  const [meridiem, setMeridiem] = useState(time[2].toUpperCase())

  const handleMeridiem = (text: string): void => {
    if (text === 'PM') {
      setMeridiem('AM')
      props.meridiem('AM')
    } else {
      setMeridiem('PM')
      props.meridiem('PM')
    }
  }

  const handleHour = (text: string): void => {
    setHour(text)
    props.hour(text)
  }

  const handleMinutes = (text: string): void => {
    setMinute(text)
    props.minutes(text)
  }

  return (
    <View style={styles.sectionContainer}>
      <TextInput
        placeholder={hour}
        defaultValue={hour}
        value={hour}
        style={styles.timeText}
        onChangeText={handleHour}
        keyboardType="numeric"
        maxLength={2}
      />
      <Text style={styles.text}>:</Text>
      <TextInput
        placeholder={minute}
        defaultValue={minute}
        value={minute}
        style={styles.timeText}
        onChangeText={handleMinutes}
        keyboardType="numeric"
        maxLength={2}
      />
      <Pressable
        style={styles.meridiem}
        onPress={() => {
          handleMeridiem(meridiem)
        }}
      >
        <Text style={styles.text}>{meridiem}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'rgba(255,255,255, 0.87)',
  },
  timeText: {
    fontFamily: 'HindSiliguri',
    fontSize: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 8,
    textAlignVertical: 'center',
    width: '25%',
    textAlign: 'center',
    color: 'rgba(255,255,255, 0.87)',
    backgroundColor: '#121212',
  },
  meridiem: {
    borderRadius: 8,
    marginLeft: 10,
    backgroundColor: '#121212',
    width: '25%',
    elevation: 3,
    borderWidth: 1,
  },
})

export default TimeCard
