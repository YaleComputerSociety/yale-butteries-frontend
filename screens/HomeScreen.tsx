import * as React from 'react'
import { View, ScrollView } from 'react-native'
import { home } from '../styles/HomeStyles'
import { Card } from '../components/Card'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false} alwaysBounceVertical={false} bounces={true}>
      <LinearGradient colors={['#92aadb', '#8fc1c7']} locations={[0, 1]}>
        <View style={home.outerContainer}>
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Berkeley' })}
            college="Berkeley"
            openTime="11:00am"
            closeTime="2:00pm"
            offsetY={0}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Branford' })}
            college="Branford"
            openTime="6:00"
            closeTime="5:00"
            offsetY={78}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Davenport' })}
            college="Davenport"
            openTime="6:00"
            closeTime="5:00"
            offsetY={158}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Franklin' })}
            college="Franklin"
            openTime="5:00am"
            closeTime="6:00am"
            offsetY={318}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Hopper' })}
            college="Hopper"
            openTime="5:00am"
            closeTime="6:00am"
            offsetY={400}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'JE' })}
            college="JE"
            openTime="5:00am"
            closeTime="6:00am"
            offsetY={480}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Morse' })}
            college="Morse"
            openTime="6:00"
            closeTime="5:00"
            offsetY={560}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Murray' })}
            college="Murray"
            openTime="6:00"
            closeTime="5:00"
            offsetY={640}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Pierson' })}
            college="Pierson"
            openTime="6:00"
            closeTime="5:00"
            offsetY={720}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Saybrook' })}
            college="Saybrook"
            openTime="6:00"
            closeTime="5:00"
            offsetY={800}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Silliman' })}
            college="Silliman"
            openTime="6:00"
            closeTime="5:00"
            offsetY={880}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Stiles' })}
            college="Stiles"
            openTime="6:00"
            closeTime="5:00"
            offsetY={238}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'TD' })}
            college="TD"
            openTime="6:00"
            closeTime="5:00"
            offsetY={960}
          />
          <Card
            onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Trumbull' })}
            college="Trumbull"
            openTime="6:00"
            closeTime="5:00"
            offsetY={1040}
          />
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
