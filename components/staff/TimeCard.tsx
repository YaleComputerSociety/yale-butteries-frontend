import React, { FC, useState } from 'react'
import { StyleSheet, Text, Pressable, Button, View, TextInput } from 'react-native'
import { militaryToAnalog } from '../../Functions'

interface Props {
    time: string
    hour: (hour) => void
    minutes: (minutes) => void
    AM_PM: (am_pm) => void
}

const TimeCard: FC<Props> = (props: Props) => {
    const time = militaryToAnalog(props.time).split(' ')

    const [hour, setHour] = useState(time[0])
    const [minute, setMinute] = useState(time[1])

    const [AM_PM, setAM_PM] = useState(time[2].toUpperCase())
    
    const handleAM_PM = (text: string) => {
        if (text == 'PM') {
            setAM_PM('AM')
            props.AM_PM('AM')
        } else {
            setAM_PM('PM')
            props.AM_PM('PM')
        }
    }

    const handleHour = (text: string) => {
        setHour(text)
        props.hour(text)
    }

    const handleMinutes = (text: string) => {
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
            <Pressable style={[styles.AM_PM, {borderWidth: 1}]} onPress={() => handleAM_PM(AM_PM)}>
                <Text style={styles.text}>{AM_PM}</Text>
            </Pressable>
        </View>
    )
}

const styles  = StyleSheet.create({
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
    },
    AM_PM: {
        borderRadius: 8,
        marginLeft: 10,
        backgroundColor: '#ccc',
        width: '25%',
        elevation: 3,
    }
})

export default TimeCard