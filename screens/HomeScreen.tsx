import * as React from 'react';
import { Text, View, ScrollView} from 'react-native';
import { home } from '../styles/HomeStyles';
import { Card } from '../components/Card';

export default function Home( { navigation } : {navigation:any} ) {
  return (
    <ScrollView style={home.app} showsVerticalScrollIndicator={false} >
      <View style={home.outerContainer}>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'berkeley' })} gradientColors={['#ed0025', '#dcb8fc']} college='Berkeley' openTime='12:00am' closeTime='11:59pm' image={require('../assets/images/collegeIcons/berkeley.png')} />
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Branford' })} gradientColors={['#0a7bfc', '#47d08e']} college='Branford' openTime='2:00pm' closeTime='17:30' image={require('../assets/images/collegeIcons/branford.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Davenport' })} gradientColors={['#686868', '#a5a6b0']} college='Davenport' openTime='7:00' closeTime='2:00am' image={require('../assets/images/collegeIcons/davenport.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Franklin' })} gradientColors={['#fd103c', '#22bedd']} college='Franklin' openTime='10:00pm' closeTime='11:57pm' image={require('../assets/images/collegeIcons/franklin.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Hopper' })} gradientColors={['#ffb400', '#f7ba72']} college='Hopper' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/hopper.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'JE' })} gradientColors={['#2adc01', '#fc96ef']} college='JE' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/JE.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'morse' })} gradientColors={['#ed0025', '#dcb8fc']} college='Morse' openTime='9:00am' closeTime='8:00am' image={require('../assets/images/collegeIcons/morse.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Murray' })} gradientColors={['#0a7bfc', '#47d08e']} college='Murray' openTime='10:00pm' closeTime='8:59am' image={require('../assets/images/collegeIcons/murray.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Pierson' })} gradientColors={['#ffb400', '#f7ba72']} college='Pierson' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/pierson.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Saybrook' })} gradientColors={['#fd103c', '#22bedd']} college='Saybrook' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/saybrook.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Silliman' })} gradientColors={['#2adc01', '#fc96ef']} college='Silliman' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/silliman.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Stiles' })} gradientColors={['#ffb400', '#f7ba72']} college='Stiles' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/ezrastiles.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'TD' })} gradientColors={['#ed0025', '#dcb8fc']} college='TD' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/TD.png')}/>
          <Card onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Trumbull' })} gradientColors={['#686868', '#a5a6b0']} college='Trumbull' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/trumbull.png')}/>
      </View>
    </ScrollView>
  );
}