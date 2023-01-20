import * as React from 'react'
import { View, ScrollView } from 'react-native'
import { home } from '../styles/HomeStyles'
import { Card } from '../components/Card'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { addOrderItem, OrderItem, removeOrderItem, resetOrderCartState, setCollege } from '../store/slices/OrderCart'

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
          onPress={() => toMenu('Berkeley')}
          gradientColors={['#ed0025', '#dddddd']}
          college="Berkeley"
          openTime="11:00am"
          closeTime="10:59am"
          offsetY={0}
        />
        <Card
          onPress={() => toMenu('Branford')}
          gradientColors={['#0a5bcc', '#47d08e']}
          college="Branford"
          openTime="6:00"
          closeTime="5:00"
          offsetY={78}
        />
        <Card
          onPress={() => toMenu('Davenport')}
          gradientColors={['#444', '#ddd']}
          college="Davenport"
          openTime="6:00"
          closeTime="5:00"
          offsetY={158}
        />
        <Card
          onPress={() => toMenu('Franklin')}
          gradientColors={['#22bedd', '#fd103c']}
          college="Franklin"
          openTime="6:00"
          closeTime="5:00"
          offsetY={318}
        />
        <Card
          onPress={() => toMenu('Hopper')}
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
          onPress={() => toMenu('Morse')}
          gradientColors={['#ed0025', '#dcb8fc']}
          college="Morse"
          openTime="6:00"
          closeTime="5:00"
          offsetY={560}
        />
        <Card
          onPress={() => toMenu('Murray')}
          gradientColors={['#0a7bfc', '#fd103c']}
          college="Murray"
          openTime="6:00"
          closeTime="5:00"
          offsetY={640}
        />
        <Card
          onPress={() => toMenu('Pierson')}
          gradientColors={['#444', '#ffd400']}
          college="Pierson"
          openTime="6:00"
          closeTime="5:00"
          offsetY={720}
        />
        <Card
          onPress={() => toMenu('Saybrook')}
          gradientColors={['#0a7bfc', '#ffb400']}
          college="Saybrook"
          openTime="6:00"
          closeTime="5:00"
          offsetY={800}
        />
        <Card
          onPress={() => toMenu('Silliman')}
          gradientColors={['#29b800', '#ef0525']}
          college="Silliman"
          openTime="6:00"
          closeTime="5:00"
          offsetY={880}
        />
        <Card
          onPress={() => toMenu('Stiles')}
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
          onPress={() => toMenu('Trumbull')}
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
