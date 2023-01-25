import { useEffect } from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
import { home } from '../styles/HomeStyles'
import { Card } from '../components/Card'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { setCollege } from '../store/slices/OrderCart'
import { asyncFetchUsers } from '../store/slices/Users'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const toMenu = (college: string) => {
    dispatch(setCollege(college))
    navigation.navigate('ButteryScreen', { collegeName: college })
  }

  useEffect(() => {
    dispatch(asyncFetchUsers())
  }, [])

  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false} alwaysBounceVertical={false} bounces={true}>
      <LinearGradient colors={['#92aadb', '#8fc1c7']} locations={[0, 1]}>
        <View style={home.outerContainer}>
          <Card
            onPress={() => toMenu('berkeley')}
            college="Berkeley"
            openTime="5:00am"
            closeTime="4:00am"
            offsetY={0}
          />
          <Card onPress={() => toMenu('branford')} college="Branford" openTime="6:00" closeTime="5:00" offsetY={78} />
          <Card
            onPress={() => toMenu('davenport')}
            college="Davenport"
            openTime="6:00"
            closeTime="5:00"
            offsetY={158}
          />
          <Card
            onPress={() => toMenu('franklin')}
            college="Franklin"
            openTime="5:00am"
            closeTime="6:00am"
            offsetY={318}
          />
          <Card onPress={() => toMenu('hopper')} college="Hopper" openTime="5:00am" closeTime="6:00am" offsetY={400} />
          <Card onPress={() => toMenu('JE')} college="JE" openTime="5:00am" closeTime="6:00am" offsetY={480} />
          <Card onPress={() => toMenu('morse')} college="Morse" openTime="6:00" closeTime="5:00" offsetY={560} />
          <Card onPress={() => toMenu('murray')} college="Murray" openTime="6:00" closeTime="5:00" offsetY={640} />
          <Card onPress={() => toMenu('pierson')} college="Pierson" openTime="6:00" closeTime="5:00" offsetY={720} />
          <Card onPress={() => toMenu('saybrook')} college="Saybrook" openTime="6:00" closeTime="5:00" offsetY={800} />
          <Card onPress={() => toMenu('silliman')} college="Silliman" openTime="6:00" closeTime="5:00" offsetY={880} />
          <Card onPress={() => toMenu('stiles')} college="Stiles" openTime="6:00" closeTime="5:00" offsetY={238} />
          <Card onPress={() => toMenu('TD')} college="TD" openTime="6:00" closeTime="5:00" offsetY={960} />
          <Card onPress={() => toMenu('trumbull')} college="Trumbull" openTime="6:00" closeTime="5:00" offsetY={1040} />
        </View>
      </LinearGradient>
      <View style={{ height: '20%', width: '100%', backgroundColor: '#8fc1c7' }}></View>
    </ScrollView>
  )
}

Home.navigationOptions = (navData) => {
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

export default Home
