import React, { useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { home } from '../../styles/HomeStyles'
import { ButteryCard } from '../../components/customer/ButteryCard'
import { useAppDispatch } from '../../store/TypedHooks'
import { setCollege } from '../../store/slices/OrderCart'
import { asyncFetchUsers } from '../../store/slices/Users'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'

const ButterySelectionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()

  const colleges: CollegeInfo[] = [
    { name: 'Berkeley', start: '5:00am', end: '4:00am', active: true },
    { name: 'Branford', start: '5:00am', end: '4:00am', active: false },
    { name: 'Davenport', start: '5:00am', end: '4:00am', active: false },
    { name: 'Franklin', start: '5:00am', end: '4:00am', active: false },
    { name: 'Hopper', start: '5:00am', end: '4:00am', active: false },
    { name: 'JE', start: '5:00am', end: '4:00am', active: false },
    { name: 'Morse', start: '5:00am', end: '4:00am', active: true },
    { name: 'Murray', start: '5:00am', end: '4:00am', active: false },
    { name: 'Pierson', start: '5:00am', end: '4:00am', active: false },
    { name: 'Saybrook', start: '5:00am', end: '4:00am', active: false },
    { name: 'Silliman', start: '5:00am', end: '4:00am', active: false },
    { name: 'Stiles', start: '5:00am', end: '4:00am', active: false },
    { name: 'TD', start: '5:00am', end: '4:00am', active: false },
    { name: 'Trumbull', start: '5:00am', end: '4:00am', active: false },
  ]

  const toMenu = (college: string) => {
    dispatch(setCollege(college))
    navigation.navigate('MenuScreen', { collegeName: college })
  }

  useEffect(() => {
    dispatch(asyncFetchUsers())
  }, [])

  interface CollegeInfo {
    name: string
    start: string
    end: string
    active: boolean
  }

  const getCollegeVisual = (collegeInfo: CollegeInfo, index: number) => {
    const navigationName: string = collegeInfo.name.length > 2 ? collegeInfo.name.toLowerCase() : collegeInfo.name
    let offset = index * 80
    if (collegeInfo.name == 'Stiles') {
      offset = 240
    } else if (index > 3 && index < 12) {
      offset += 80
    }

    return (
      <ButteryCard
        onPress={() => toMenu(navigationName)}
        college={collegeInfo.name}
        openTime={collegeInfo.start}
        closeTime={collegeInfo.end}
        offsetY={offset}
        active={collegeInfo.active}
        key={index}
      />
    )
  }

  const getAllCards = () => {
    const collegeCards: JSX.Element[] = []

    for (let i = 0; i < colleges.length; i++) {
      collegeCards.push(getCollegeVisual(colleges[i], i))
    }

    return <View>{collegeCards}</View>
  }

  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false} alwaysBounceVertical={false} bounces={true}>
      <LinearGradient colors={['#2ebf91', '#f9a000ff']} locations={[0, 1]}>
        <View style={home.outerContainer}>{getAllCards()}</View>
      </LinearGradient>
      <View style={{ height: '20%', width: '100%', backgroundColor: '#f9a000ff' }}></View>
    </ScrollView>
  )
}

ButterySelectionScreen['navigationOptions'] = (navData) => {
  return {
    gestureEnabled: false,
    headerLeft: () => <></>,
    headerRight: () => (
      <Ionicon
        name="settings-sharp"
        size={20}
        color="#fff"
        onPress={() => {
          navData.navigation.navigate('SettingsScreen')
        }}
        style={{ paddingRight: 20 }}
      />
    ),
  }
}

export default ButterySelectionScreen
