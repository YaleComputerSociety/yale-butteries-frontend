import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { analogToMilitary, outputTime } from '../../utils/functions'
import { useIsFocused } from '@react-navigation/native'

interface Props {
  text: string
  hour: number
  minute: number
  setHour: (hour: number) => void
  setMinute: (minute: number) => void
}

const TimePicker: React.FC<Props> = (props: Props) => {
  const [selectedTime, setSelectedTime] = React.useState<string>(outputTime(props.hour, props.minute))
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) setSelectedTime(outputTime(props.hour, props.minute))
  }, [props.hour, props.minute, isFocused])

  const generateTimeOptions = (): string[] => {
    const options: string[] = []

    for (let hour = 8; hour < 13; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourString = `${hour}`
        const minuteString = minute === 0 ? '00' : `${minute}`
        options.push(`${hourString}:${minuteString} ${hour === 12 ? 'PM' : 'AM'}`)
      }
    }
    for (let hour = 1; hour < 13; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourString = `${hour}`
        const minuteString = minute === 0 ? '00' : `${minute}`
        options.push(`${hourString}:${minuteString} ${hour === 12 ? 'AM' : 'PM'}`)
      }
    }
    for (let hour = 1; hour < 4; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourString = `${hour}`
        const minuteString = minute === 0 ? '00' : `${minute}`
        options.push(`${hourString}:${minuteString} AM`)
      }
    }

    return options
  }

  return (
    <View>
      <Text style={styles.headerText}>{props.text}</Text>

      <Picker
        selectedValue={selectedTime}
        onValueChange={(itemValue: string) => {
          setSelectedTime(itemValue)
          const timeArray = analogToMilitary(itemValue).split(':')
          props.setHour(Number(timeArray[0]))
          props.setMinute(Number(timeArray[1]))
        }}
        style={styles.picker}
      >
        {generateTimeOptions().map((time, index) => (
          <Picker.Item key={index} label={time} value={time} />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    color: 'rgba(255,255,255, 0.87)',
    fontSize: 24,
    fontFamily: 'HindSiliguri-Bold',
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginVertical: 5,
  },
  picker: {
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#555',
    borderRadius: 10,
    marginBottom: 20,
  },
})

export default TimePicker
