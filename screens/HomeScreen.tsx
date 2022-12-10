import * as React from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Button} from 'react-native'
import { home } from '../styles/HomeStyles'
import { Card } from '../components/Card'

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false}>
      <View style={home.outerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
        <Image 
          source={require('../assets/images/SettingsIcon.png')}
          style={styles.button}
        />
      </TouchableOpacity>
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'berkeley' })}
          gradientColors={['#ed0025', '#dddddd']}
          college="Berkeley"
          openTime="11:00am"
          closeTime="10:59am"
          offsetY={0}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Branford' })}
          gradientColors={['#0a5bcc', '#47d08e']}
          college="Branford"
          openTime="6:00"
          closeTime="5:00"
          offsetY={78}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Davenport' })}
          gradientColors={['#444', '#ddd']}
          college="Davenport"
          openTime="6:00"
          closeTime="5:00"
          offsetY={158}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Franklin' })}
          gradientColors={['#22bedd', '#fd103c']}
          college="Franklin"
          openTime="6:00"
          closeTime="5:00"
          offsetY={318}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Hopper' })}
          gradientColors={['#ffb400', '#0a7bfc']}
          college="Hopper"
          openTime="6:00pm"
          closeTime="1:00am"
          offsetY={400}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'JE' })}
          gradientColors={['#29b800', '#eee']}
          college="JE"
          openTime="6:00"
          closeTime="5:00"
          offsetY={480}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'morse' })}
          gradientColors={['#ed0025', '#dcb8fc']}
          college="Morse"
          openTime="6:00"
          closeTime="5:00"
          offsetY={560}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Murray' })}
          gradientColors={['#0a7bfc', '#fd103c']}
          college="Murray"
          openTime="6:00"
          closeTime="5:00"
          offsetY={640}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Pierson' })}
          gradientColors={['#444', '#ffd400']}
          college="Pierson"
          openTime="6:00"
          closeTime="5:00"
          offsetY={720}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Saybrook' })}
          gradientColors={['#0a7bfc', '#ffb400']}
          college="Saybrook"
          openTime="6:00"
          closeTime="5:00"
          offsetY={800}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Silliman' })}
          gradientColors={['#29b800', '#ef0525']}
          college="Silliman"
          openTime="6:00"
          closeTime="5:00"
          offsetY={880}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Stiles' })}
          gradientColors={['#ffd400', '#444']}
          college="Stiles"
          openTime="6:00"
          closeTime="5:00"
          offsetY={238}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'TD' })}
          gradientColors={['#ed0025', '#eee']}
          college="TD"
          openTime="6:00"
          closeTime="5:00"
          offsetY={960}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Trumbull' })}
          gradientColors={['#444', '#ddd']}
          college="Trumbull"
          openTime="6:00"
          closeTime="5:00"
          offsetY={1040}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,
    left: '90%',
    //bottom: '100%',
  },
})

Home.navigationOptions = (navData) => {
  return {
    headerTitle: 'Butteries',
    headerRight: () => (
      <Button
        title="Help"
        onPress={() => {
          navData.navigation.navigate('SettingsScreen')
          console.log('Hello World')
        }}
      />
    ),
  }
}

export default Home
