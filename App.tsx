import React from 'react';
import { Component , useState } from 'react';
import AppLoading from 'expo-app-loading';
import Navigator from './routes/homeStack';
import * as Font from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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