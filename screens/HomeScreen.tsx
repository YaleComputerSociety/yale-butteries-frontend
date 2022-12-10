import * as React from 'react'
import { View, ScrollView, Text, Button } from 'react-native'
import { home } from '../styles/HomeStyles'
import { Card } from '../components/Card'

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false}>
      <View style={home.outerContainer}>
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'berkeley' })}
          gradientColors={['#cd0025', '#770025']}
          college="Berkeley"
          openTime="11:00am"
          closeTime="10:59am"
          offsetY={0}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Branford' })}
          gradientColors={['#0a5baa', '#30167e']}
          college="Branford"
          openTime="6:00"
          closeTime="5:00"
          offsetY={78}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Davenport' })}
          gradientColors={['#444', '#222']}
          college="Davenport"
          openTime="6:00"
          closeTime="5:00"
          offsetY={158}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Franklin' })}
          gradientColors={['#ad234e', '#770025']}
          college="Franklin"
          openTime="6:00"
          closeTime="5:00"
          offsetY={318}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'Hopper' })}
          gradientColors={['#eacf32', '#ff7f00']}
          college="Hopper"
          openTime="6:00"
          closeTime="5:00"
          offsetY={400}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'JE' })}
          gradientColors={['#47b23d', '#116409']}
          college="JE"
          openTime="6:00"
          closeTime="5:00"
          offsetY={480}
        />
        <Card
          onPress={() => navigation.navigate('ButteryScreen', { college_Name: 'morse' })}
          gradientColors={['#ff1076', '#ed0025']}
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
