import * as React from 'react';
import AppLoading from 'expo-app-loading';
import { Text, ImageBackground, View, ScrollView, Pressable } from 'react-native';
import { homeStyles } from './styles/home';
import { Card } from './components/Card';
import { MenuItem } from './components/MenuItem';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

function HomeScreen( {navigation} : {navigation:any} ) {
  return (
    <ScrollView style={homeStyles.app} showsVerticalScrollIndicator={false} >
      <View style={homeStyles.outerContainer}>  
          <Pressable onPress={() => navigation.navigate('Berkeley')}><Card backgroundImage={require('./assets/gradient_backgrounds/red-to-pink.png')} college='Berkeley' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/berkeley.png')} /></Pressable>
          <Pressable onPress={() => navigation.navigate('Branford')}><Card backgroundImage={require('./assets/gradient_backgrounds/blue-to-green.png')} college='Branford' openTime='2:00pm' closeTime='17:00' image={require('./assets/images/collegeIcons/branford.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Davenport')}><Card backgroundImage={require('./assets/gradient_backgrounds/black-to-grey.png')} college='Davenport' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/davenport.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Franklin')}><Card backgroundImage={require('./assets/gradient_backgrounds/red-to-blue.png')} college='Franklin' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/franklin.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Hopper')}><Card backgroundImage={require('./assets/gradient_backgrounds/yellow-to-orange.png')} college='Hopper' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/hopper.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('JE')}><Card backgroundImage={require('./assets/gradient_backgrounds/green-to-pink.png')} college='JE' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/JE.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Morse')}><Card backgroundImage={require('./assets/gradient_backgrounds/red-to-pink.png')} college='Morse' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/morse.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Murray')}><Card backgroundImage={require('./assets/gradient_backgrounds/red-to-blue.png')} college='Murray' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/murray.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Pierson')}><Card backgroundImage={require('./assets/gradient_backgrounds/yellow-to-orange.png')} college='Pierson' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/pierson.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Saybrook')}><Card backgroundImage={require('./assets/gradient_backgrounds/blue-to-green.png')} college='Saybrook' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/saybrook.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Siliman')}><Card backgroundImage={require('./assets/gradient_backgrounds/green-to-pink.png')} college='Silliman' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/silliman.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Stiles')}><Card backgroundImage={require('./assets/gradient_backgrounds/yellow-to-orange.png')} college='Stiles' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/ezrastiles.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('TD')}><Card backgroundImage={require('./assets/gradient_backgrounds/red-to-pink.png')}college='TD' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/TD.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Trumbull')}><Card backgroundImage={require('./assets/gradient_backgrounds/black-to-grey.png')} college='Trumbull' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/trumbull.png')}/></Pressable>
      </View>
    </ScrollView>
  );
}

function BerkeleyScreen() {
  return (
    <ScrollView style={homeStyles.app} showsVerticalScrollIndicator={false} >
      <View style={homeStyles.menuView}>
        <MenuItem name='Chicken Sandwich' price={1.75} description="Not only is there a chicken, but as part of a limited time special offer, we're adding two additional flaps of bread."/>
        <MenuItem name='Milkshake' description="I'm cold." price={2.5}/>
        <MenuItem name='Floor Scraps' description="An economical choice" price={0.6}/>
        <MenuItem name='Face Slap' description="Not necessarily food, but refreshing nonetheless" price={0.06}/>
        <MenuItem name='Burger' description="No, this was NOT stolen from the dining hall" price={2.044}/>
        <MenuItem name='Chicken Stir Fry' description="Fried rice with eggs and chicken" price={2}/>
      </View>
    </ScrollView>
  );
}

function BranfordScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Branford Menu Items</Text>
    </View>
  );
}

function DavenportScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Davenport Menu Items</Text>
    </View>
  );
}

function FranklinScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Franklin Menu Items</Text>
    </View>
  );
}

function HopperScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Hopper Menu Items</Text>
    </View>
  );
}

function JEScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy JE Menu Items</Text>
    </View>
  );
}

function MorseScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Morse Menu Items</Text>
    </View>
  );
}

function MurrayScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Murray Menu Items</Text>
    </View>
  );
}


function PiersonScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Pierson Menu Items</Text>
    </View>
  );
}

function SaybrookScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Saybrook Menu Items</Text>
    </View>
  );
}

function SilimanScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Siliman Menu Items</Text>
    </View>
  );
}
function StilesScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Stiles Menu Items</Text>
    </View>
  );
}

function TDScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy TD Menu Items</Text>
    </View>
  );
}

function TrumbullScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Trumbull Menu Items</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    'Roboto' : require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Italic' : require('./assets/fonts/Roboto-LightItalic.ttf')
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home" 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#00b2db',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            fontSize: 20,
          },
          animation: 'default',
        }}>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#cc0000'}}} name="Berkeley" component={BerkeleyScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#236097'}}} name="Branford" component={BranfordScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#363636'}}} name="Davenport" component={DavenportScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#236097'}}} name="Franklin" component={FranklinScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#e5c134'}}} name="Hopper" component={HopperScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#169600'}}} name="JE" component={JEScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#363636'}}} name="Morse" component={MorseScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#cc0000'}}} name="Murray" component={MurrayScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#e5c134'}}} name="Pierson" component={PiersonScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#236097'}}} name="Saybrook" component={SaybrookScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#ff0000'}}} name="Siliman" component={SilimanScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#e5c134'}}} name="Stiles" component={StilesScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#dd0000'}}} name="TD" component={TDScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#363636'}}} name="Trumbull" component={TrumbullScreen} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;