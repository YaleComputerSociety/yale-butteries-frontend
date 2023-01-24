import * as React from 'react'
import { View, ScrollView } from 'react-native'
import { home } from '../styles/HomeStyles'
import { Card } from '../components/Card'
import { useAppDispatch } from '../store/TypedHooks'
import { setCollege } from '../store/slices/OrderCart'

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const toMenu = (college: string) => {
    dispatch(setCollege(college))
    navigation.navigate('ButteryScreen')
  }

  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false}>
      <View style={home.outerContainer}>
        <Card
          onPress={() => toMenu('berkeley')}
          gradientColors={['#ed0025', '#dddddd']}
          college="Berkeley"
          openTime="11:00am"
          closeTime="10:59am"
          offsetY={0}
        />
        <Card
          onPress={() => toMenu('branford')}
          gradientColors={['#0a5bcc', '#47d08e']}
          college="Branford"
          openTime="6:00"
          closeTime="5:00"
          offsetY={78}
        />
        <Card
          onPress={() => toMenu('davenport')}
          gradientColors={['#444', '#ddd']}
          college="Davenport"
          openTime="6:00"
          closeTime="5:00"
          offsetY={158}
        />
        <Card
          onPress={() => toMenu('franklin')}
          gradientColors={['#22bedd', '#fd103c']}
          college="Franklin"
          openTime="6:00"
          closeTime="5:00"
          offsetY={318}
        />
        <Card
          onPress={() => toMenu('hopper')}
          gradientColors={['#ffb400', '#0a7bfc']}
          college="Hopper"
          openTime="6:00pm"
          closeTime="1:00am"
          offsetY={400}
        />
        <Card
          onPress={() => toMenu('JE')}
          gradientColors={['#29b800', '#eee']}
          college="JE"
          openTime="6:00"
          closeTime="5:00"
          offsetY={480}
        />
        <Card
          onPress={() => toMenu('morse')}
          gradientColors={['#ed0025', '#dcb8fc']}
          college="Morse"
          openTime="6:00"
          closeTime="5:00"
          offsetY={560}
        />
        <Card
          onPress={() => toMenu('murray')}
          gradientColors={['#0a7bfc', '#fd103c']}
          college="Murray"
          openTime="6:00"
          closeTime="5:00"
          offsetY={640}
        />
        <Card
          onPress={() => toMenu('pierson')}
          gradientColors={['#444', '#ffd400']}
          college="Pierson"
          openTime="6:00"
          closeTime="5:00"
          offsetY={720}
        />
        <Card
          onPress={() => toMenu('saybrook')}
          gradientColors={['#0a7bfc', '#ffb400']}
          college="Saybrook"
          openTime="6:00"
          closeTime="5:00"
          offsetY={800}
        />
        <Card
          onPress={() => toMenu('silliman')}
          gradientColors={['#29b800', '#ef0525']}
          college="Silliman"
          openTime="6:00"
          closeTime="5:00"
          offsetY={880}
        />
        <Card
          onPress={() => toMenu('stiles')}
          gradientColors={['#ffd400', '#444']}
          college="Stiles"
          openTime="6:00"
          closeTime="5:00"
          offsetY={238}
        />
        <Card
          onPress={() => toMenu('TD')}
          gradientColors={['#ed0025', '#eee']}
          college="TD"
          openTime="6:00"
          closeTime="5:00"
          offsetY={960}
        />
        <Card
          onPress={() => toMenu('trumbull')}
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

export default Home
