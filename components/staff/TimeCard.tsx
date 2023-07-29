import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, Pressable, Button, View, Switch } from 'react-native'

interface Props {
    openDays: String[]
    day: String
    action: (day) => void
    active: boolean
}

const TimeCard: FC<Props> = (props: Props) => {
    // const [date, setDate] = useState(new Date())
    const [active, setActive] = useState(props.active)

    useEffect(() => {
      if (props.active) {
        setActive(true)
      } else {
        setActive(false)
      }
    }, [props.openDays])

    const handleSwitch = () => {
        props.action(props.day)
        setActive(!active)
    }

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.headerText}>{props.day}</Text>
            <View>
                <Switch value={active} onChange={handleSwitch}/>
            </View>
        </View> 
    )
}

const styles  = StyleSheet.create({
    headerText: {
        color: '#000',
        fontSize: 24,
        fontFamily: 'HindSiliguri-Bold',
        textAlignVertical: 'center'
    },
    sectionContainer: { 
        flex: 1,
        padding: 10,
    },
})

export default TimeCard