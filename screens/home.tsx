import * as React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { homeStyles } from '../styles/home';
import { Card } from '../components/Card';


export default function Home( { navigation } : {navigation:any} ) {
  return (
    <ScrollView style={homeStyles.app} showsVerticalScrollIndicator={false} >
      <View style={homeStyles.outerContainer}>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Berkeley', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/red-to-pink.png')} college='Berkeley' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/berkeley.png')} /></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Branford', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/blue-to-green.png')} college='Branford' openTime='2:00pm' closeTime='17:30' image={require('../assets/images/collegeIcons/branford.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Davenport', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/black-to-grey.png')} college='Davenport' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/davenport.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Franklin', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/red-to-blue.png')} college='Franklin' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/franklin.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Hopper', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/yellow-to-orange.png')} college='Hopper' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/hopper.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'JE', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/green-to-pink.png')} college='JE' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/JE.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Morse', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/red-to-pink.png')} college='Morse' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/morse.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Murray', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/blue-to-green.png')} college='Murray' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/murray.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Pierson', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/yellow-to-orange.png')} college='Pierson' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/pierson.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Saybrook', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/red-to-blue.png')} college='Saybrook' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/saybrook.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Silliman', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/green-to-pink.png')} college='Silliman' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/silliman.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Stiles', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/yellow-to-orange.png')} college='Stiles' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/ezrastiles.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'TD', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/red-to-pink.png')}college='TD' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/TD.png')}/></Pressable>
          <Pressable onPress={ () => navigation.navigate('ButteryScreen', { college_Name: 'Trumbull', header_Color: '#FFF'})}><Card backgroundImage={require('../assets/gradient_backgrounds/black-to-grey.png')} college='Trumbull' openTime='10:00pm' closeTime='1:00am' image={require('../assets/images/collegeIcons/trumbull.png')}/></Pressable>
      </View>
    </ScrollView>
  );
}