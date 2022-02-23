import React from 'react';
import { Component , useState } from 'react';
import AppLoading from 'expo-app-loading';
import Navigator from './routes/homeStack';
import * as Font from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { homeStyles } from './styles/HomeStyles';
import { MenuItem } from './components/MenuItem';
const Stack = createNativeStackNavigator();

const loadFonts = () => Font.loadAsync({
  'Roboto' : require('./assets/fonts/Roboto-Black.ttf'),
  'Roboto-Italic' : require('./assets/fonts/Roboto-LightItalic.ttf'),
})

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  if (fontsLoaded) {
    return (
      <Navigator />
    );
  } else {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    )
  }
}

  /* return (
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

      </Stack.Navigator>
    </NavigationContainer> */

    // <ScrollView style={homeStyles.app} showsVerticalScrollIndicator={false} >
    //   <View style={homeStyles.menuView}>
    //     <MenuItem name='Chicken Sandwich' price={1.75} description="Not only is there a chicken, but as part of a limited time special offer, we're adding two additional flaps of bread."/>
    //     <MenuItem name='Milkshake' description="I'm cold." price={2.5}/>
    //     <MenuItem name='Floor Scraps' description="An economical choice" price={0.6}/>
    //     <MenuItem name='Face Slap' description="Not necessarily food, but refreshing nonetheless" price={0.06}/>
    //     <MenuItem name='Burger' description="No, this was NOT stolen from the dining hall" price={2.044}/>
    //     <MenuItem name='Chicken Stir Fry' description="Fried rice with eggs and chicken" price={2}/>
    //   </View>
    // </ScrollView>