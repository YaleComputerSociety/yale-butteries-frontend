import * as React from 'react';
import AppLoading from 'expo-app-loading';
import { Text, ImageBackground, View, Button, ScrollView, Pressable } from 'react-native';
import { homeStyles } from './styles/home';
import { Card } from './components/Card';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Assets } from 'react-navigation-stack';

function HomeScreen( {navigation} : {navigation:any} ) {
  return (
    <ScrollView style={homeStyles.app}>
      <View style={homeStyles.outerContainer}>  
        <View style={homeStyles.innerContainer}>
          <Pressable onPress={() => navigation.navigate('Berkeley')}><Card college='Berkeley' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/berkeley.png')} /></Pressable>
          <Pressable onPress={() => navigation.navigate('Branford')}><Card college='Branford' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/branford.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Davenport')}><Card college='Davenport' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/davenport.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Franklin')}><Card college='Franklin' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/franklin.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Hopper')}><Card college='Hopper' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/hopper.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('JE')}><Card college='JE' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/JE.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Morse')}><Card college='Morse' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/morse.png')}/></Pressable>
        </View>
        <View style={homeStyles.innerContainer}>
          <Pressable onPress={() => navigation.navigate('Murray')}><Card college='Murray' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/murray.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Pierson')}><Card college='Pierson' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/pierson.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Saybrook')}><Card college='Saybrook' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/saybrook.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Siliman')}><Card college='Silliman' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/silliman.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Stiles')}><Card college='Stiles' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/ezrastiles.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('TD')}><Card college='TD' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/TD.png')}/></Pressable>
          <Pressable onPress={() => navigation.navigate('Trumbull')}><Card college='Trumbull' openTime='10:00pm' closeTime='1:00am' image={require('./assets/images/collegeIcons/trumbull.png')}/></Pressable>
        </View>
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
/*   const [IsReady, SetIsReady] = React.useState(false);

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
  } */

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home" 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#676FA3',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          animation: 'default',
        }}>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Berkeley" component={BerkeleyScreen} />
        <Stack.Screen name="Branford" component={BranfordScreen} />
        <Stack.Screen name="Davenport" component={DavenportScreen} />
        <Stack.Screen name="Franklin" component={FranklinScreen} />
        <Stack.Screen name="Hopper" component={HopperScreen} />
        <Stack.Screen name="JE" component={JEScreen} />
        <Stack.Screen name="Morse" component={MorseScreen} />
        <Stack.Screen name="Murray" component={MurrayScreen} />
        <Stack.Screen name="Pierson" component={PiersonScreen} />
        <Stack.Screen name="Saybrook" component={SaybrookScreen} />
        <Stack.Screen name="Siliman" component={SilimanScreen} />
        <Stack.Screen name="Stiles" component={StilesScreen} />
        <Stack.Screen name="TD" component={TDScreen} />
        <Stack.Screen name="Trumbull" component={TrumbullScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;