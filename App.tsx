import * as React from 'react';
import AppLoading from 'expo-app-loading';
import { Text, ImageBackground, View, Button, ScrollView, Pressable } from 'react-native';
import { homeStyles } from './styles/home';
import Card from './components/Card';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Assets } from 'react-navigation-stack';

function HomeScreen( {navigation} : {navigation:any} ) {


  
  return (
    <ScrollView style={homeStyles.app} showsVerticalScrollIndicator={false} >
      <View style={homeStyles.outerContainer}>  
          <Pressable onPress={() => navigation.navigate('Berkeley')}><Card backgroundImage={require('./assets/gradient_backgrounds/berkeley2.png')} college='Berkeley' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/berkeley.png')} /></Pressable>
          <Pressable onPress={() => navigation.navigate('Branford')}><Card backgroundImage={require('./assets/gradient_backgrounds/branford.png')} college='Branford' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/branford.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Davenport')}><Card backgroundImage={require('./assets/gradient_backgrounds/davenport2.png')} college='Davenport' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/davenport.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Franklin')}><Card backgroundImage={require('./assets/gradient_backgrounds/franklin.png')} college='Franklin' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/franklin.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Hopper')}><Card backgroundImage={require('./assets/gradient_backgrounds/pierson.png')} college='Hopper' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/hopper.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('JE')}><Card backgroundImage={require('./assets/gradient_backgrounds/JE4.png')} college='JE' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/JE.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Morse')}><Card backgroundImage={require('./assets/gradient_backgrounds/morse.png')} college='Morse' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/morse.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Murray')}><Card backgroundImage={require('./assets/gradient_backgrounds/berkeley.png')} college='Murray' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/murray.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Pierson')}><Card backgroundImage={require('./assets/gradient_backgrounds/pierson.png')} college='Pierson' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/pierson.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Saybrook')}><Card backgroundImage={require('./assets/gradient_backgrounds/branford.png')} college='Saybrook' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/saybrook.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Siliman')}><Card backgroundImage={require('./assets/gradient_backgrounds/JE3.png')} college='Silliman' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/silliman.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Stiles')}><Card backgroundImage={require('./assets/gradient_backgrounds/black_grad.png')} college='Stiles' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/ezrastiles.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('TD')}><Card backgroundImage={require('./assets/gradient_backgrounds/berkeley.png')}college='TD' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/TD.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Trumbull')}><Card backgroundImage={require('./assets/gradient_backgrounds/davenport.png')} college='Trumbull' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/trumbull.png')}/></Pressable>
      </View>
    </ScrollView>
  );
}

function BerkeleyScreen() {
  return (
    <View style={homeStyles.menuView}>
      <Text>Fancy Berekeley Menu Items</Text>
    </View>
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

/*

  const [IsReady, SetIsReady] = React.useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
} 

*/

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