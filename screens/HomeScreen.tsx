import { useEffect } from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
import { home } from '../styles/HomeStyles'
import { Card } from '../components/Card'
import { useAppSelector, useAppDispatch } from '../store/TypedHooks'
import { setCollege } from '../store/slices/OrderCart'
import Ionicon from 'react-native-ionicons'
import { asyncFetchUsers } from '../store/slices/Users'

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const toMenu = (college: string) => {
    dispatch(setCollege(college))
    navigation.navigate('ButteryScreen')
  }

  useEffect(() => {
    dispatch(asyncFetchUsers())
  }, [])

  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false}>
      <View style={home.outerContainer}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Image source={require('../assets/images/SettingsIcon.png')} style={styles.button} />
        </TouchableOpacity> */}
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
        }}
      />
    ),
  }
}
// Home.navigationOptions = (navData) => {
//   return {
//     headerRight: () => (
//       <Ionicon
//         name="settings-sharp"
//         size={18}
//         color="#fff"
//         onPress={() => {
//           navData.navigation.navigate('SettingsScreen')
//           console.log('Hello World')
//         }}
//         style={{ paddingRight: 15 }}
//       />
//     ),
//   }
// }

export default Home
