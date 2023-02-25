import { View, ScrollView } from 'react-native'
import { home } from '../styles/HomeStyles'
import { Card } from '../components/Card'
import { useAppDispatch } from '../store/TypedHooks'
import { setCollege } from '../store/slices/OrderCart'
import { asyncFetchUsers } from '../store/slices/Users'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'

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
      <LinearGradient colors={['#2ebf91', '#f9a000ff']} locations={[0, 1]}>
        <View style={home.outerContainer}>
          <Card
            onPress={() => toMenu('berkeley')}
            college="Berkeley"
            openTime="5:00am"
            closeTime="4:00am"
            offsetY={0}
            active={true}
          />
          <Card
            onPress={() => toMenu('branford')}
            college="Branford"
            openTime="6:00"
            closeTime="5:00"
            offsetY={78}
            active={false}
          />
          <Card
            onPress={() => toMenu('davenport')}
            college="Davenport"
            openTime="6:00"
            closeTime="5:00"
            offsetY={158}
            active={false}
          />
          <Card
            onPress={() => toMenu('franklin')}
            college="Franklin"
            openTime="5:00am"
            closeTime="6:00am"
            offsetY={318}
            active={false}
          />
          <Card
            onPress={() => toMenu('hopper')}
            college="Hopper"
            openTime="5:00am"
            closeTime="6:00am"
            offsetY={400}
            active={false}
          />
          <Card
            onPress={() => toMenu('JE')}
            college="JE"
            openTime="5:00am"
            closeTime="6:00am"
            offsetY={480}
            active={false}
          />
          <Card
            onPress={() => toMenu('morse')}
            college="Morse"
            openTime="6:00"
            closeTime="5:00"
            offsetY={560}
            active={true}
          />
          <Card
            onPress={() => toMenu('murray')}
            college="Murray"
            openTime="6:00"
            closeTime="5:00"
            offsetY={640}
            active={false}
          />
          <Card
            onPress={() => toMenu('pierson')}
            college="Pierson"
            openTime="6:00"
            closeTime="5:00"
            offsetY={720}
            active={false}
          />
          <Card
            onPress={() => toMenu('saybrook')}
            college="Saybrook"
            openTime="6:00"
            closeTime="5:00"
            offsetY={800}
            active={false}
          />
          <Card
            onPress={() => toMenu('silliman')}
            college="Silliman"
            openTime="6:00"
            closeTime="5:00"
            offsetY={880}
            active={false}
          />
          <Card
            onPress={() => toMenu('stiles')}
            college="Stiles"
            openTime="6:00"
            closeTime="5:00"
            offsetY={238}
            active={false}
          />
          <Card
            onPress={() => toMenu('TD')}
            college="TD"
            openTime="6:00"
            closeTime="5:00"
            offsetY={960}
            active={false}
          />
          <Card
            onPress={() => toMenu('trumbull')}
            college="Trumbull"
            openTime="6:00"
            closeTime="5:00"
            offsetY={1040}
            active={false}
          />
        </View>
      </LinearGradient>
      <View style={{ height: '20%', width: '100%', backgroundColor: '#f9a000ff' }}></View>
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
