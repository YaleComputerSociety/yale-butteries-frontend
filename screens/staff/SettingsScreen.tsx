import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native'
import { useAppSelector, useAppDispatch } from '../../store/ReduxStore'
import EvilModal from '../../components/EvilModal'

import { NavigationStackProp } from 'react-navigation-stack'
import { NavigationParams } from 'react-navigation'

import DayIcon from '../../components/staff/DayIcon'
import TimeCard from '../../components/staff/TimeCard'
import { College, asyncFetchColleges, asyncUpdateCollege } from '../../store/slices/Colleges'
import { useIsFocused } from '@react-navigation/native'

const SettingsScreen: React.FC<{ navigation: NavigationStackProp<{}, NavigationParams> }> = ({
  navigation,
}) => {

    const dispatch = useAppDispatch()
    const isFocused = useIsFocused()

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const [openDays, updateOpenDays] = useState([]) //retrieve state once stored
    const [openCount, setOpenCount] = useState(0)

    const [connection, setConnection] = useState(true)

    const { currentUser } = useAppSelector((state) => state.currentUser)
    const { colleges, isLoading: isLoading } = useAppSelector((state) => state.colleges)
    const [currentCollege, setCurrentCollege] = useState(null)

    useEffect(() => {
        dispatch(asyncFetchColleges()).then((success: boolean) => {
            setConnection(success) //for evil modal, not great
        })
    }, [isFocused])

    useEffect(() => {
        if (colleges && currentUser) {
            setCurrentCollege(colleges.filter((college) => college.name == currentUser.college)[0])
        }
        if (currentCollege) {
            updateOpenDays(currentCollege.daysOpen)
            setOpenCount(currentCollege.daysOpen.length)
        }
    }, [currentCollege, isLoading])
    
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
                action={(day) => handleTimeCard(day)} 
                day={day}
            />
        )
    }

    const getAllDays = () => {
        const collegeCards: JSX.Element[] = []

        for (let i=0; i <= daysOfWeek.length-1;i++) {
            collegeCards.push(getDayIconVisual(daysOfWeek[i], i, openDays.includes(daysOfWeek[i])))
        }

        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    {collegeCards}
                </View>
            </View>
        )
    }

    const updateCollege = () => {
        const butteryTime: College = {
            id: currentCollege.id,
            name: currentCollege.name,
            buttery_activated: currentCollege.buttery_activated,
            daysOpen: openDays,
            openTime: '02:00',
            closeTime: '04:00',
            isOpen: true,
            //hard coded for now but will change these values
        }
        dispatch(asyncUpdateCollege(butteryTime))
    }

    const safetyCheck = () => {
        Alert.alert(
            'Do you want to save these changes?',
            'Any changes will take place immediately',
            [
              {text: 'Yes, I\'m Sure', onPress: updateCollege},
              {text: 'Cancel', onPress: () => {return}},
            ],
            { 
              cancelable: true 
            }
        );
    }

    return (
        <View style={{ width: '100%', height: '100%' }}> 
            {<EvilModal toggle={setConnection} display={!connection} />}
            {isLoading ? (
                <ScrollView style={ styles.container }>
                    <Text style={ styles.text }>Loading menu</Text>
                </ScrollView>
            ) : (
                <ScrollView style={styles.container}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerText}>Days</Text>
                        {getAllDays()}
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerText}>Time</Text>
                        
                    </View>
                    <Pressable style={styles.button} onPress={safetyCheck}>
                        <Text style={styles.text}>Save Changes</Text>
                    </Pressable>
                </ScrollView>
            )}
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    headerText: {
        color: '#000',
        fontSize: 24,
        fontFamily: 'HindSiliguri-Bold',
        textAlignVertical: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        height: '100%',
    },
    sectionContainer: { 
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 8,
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