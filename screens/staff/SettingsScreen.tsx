import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { NavigationParams } from 'react-navigation'

import DayIcon from '../../components/staff/DayIcon'
import TimeCard from '../../components/staff/TimeCard'

const SettingsScreen: React.FC<{ navigation: NavigationStackProp<{}, NavigationParams> }> = ({
  navigation,
}) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const [openDays, updateOpenDays] = useState([]) //retrieve state once stored
    const [openCount, setOpenCount] = useState(0)

    useEffect(() => {
        console.log(openCount, openDays)
    }, [openCount])
    
    const closeButtery = (day: String) => {
        updateOpenDays(
            openDays.filter(a => a !== day)
        )
        setOpenCount(openCount - 1)
    }

    const handleTimeCard = (day: String) => {
        console.log(openDays)
        if (!openDays.includes(day)) {
            updateOpenDays([
                ...openDays, day
            ])
            setOpenCount(openCount + 1)
        } else {
            closeButtery(day)
        }
    }

    const getDayIconVisual = (day: String, index: number, active: boolean) => {       
        return (
            <DayIcon
                key={index}
                text={day}
                active={active}
                openDays={openDays}
            />
        )
    }

    const getAllDays = () => {
        const collegeCards: JSX.Element[] = []
        for (let i=0; i <= daysOfWeek.length-1;i++) {
            collegeCards.push(getDayIconVisual(daysOfWeek[i], i, openDays.includes(daysOfWeek[i])))
        }
        return <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>{collegeCards}</View>
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.sectionContainer}>
                {getAllDays()}
                {daysOfWeek.map((day, i) => {
                    return <TimeCard key={i} action={(day) => handleTimeCard(day)} day={day}/>
                })}
            </View>
            <Pressable style={styles.button} onPress={() => console.log(openDays)}>
                <Text style={styles.text}>Save Changes</Text>
            </Pressable>
            {/* <View style={styles.emergencyContainer}>
                <Text style={styles.text}>Emergency</Text>
                <Switch style={{ alignSelf: 'center' }} value={true} onValueChange={() => console.log('hi')} />
            </View> */}
        </ScrollView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    headerText: {
        color: '#000',
        fontSize: 24,
        fontFamily: 'HindSiliguri-Bold',
        textAlignVertical: 'center'
    },
    container: {
        flex: 1,
        height: '100%',
    },
    sectionContainer: { 
        flex: 1,
        padding: 10,
    },
    emergencyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
    },
    text: {
        textAlignVertical: 'center',
        color: '#fff',
        fontSize: 24,
        fontFamily: 'HindSiliguri-Bold',
        alignSelf: 'center'
    },
    button: {
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 8,
        padding: 10,
        width: 250,
    }
})