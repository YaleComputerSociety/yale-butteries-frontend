import * as React from 'react'
import { View, Text, Pressable } from 'react-native'
import { home } from '../styles/HomeStyles'
import { LinearGradient } from 'expo-linear-gradient'

const NavigationScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <LinearGradient colors={['#7C98B3', '#637081']} locations={[0, 1]}>
      <View style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}>
        <View style={home.outerContainer}>
          <View
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              width: '50%',
              backgroundColor: 'transparent',
              height: '100%',
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate('Home')
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View
                style={{
                  backgroundColor: '#1084ff',
                  paddingHorizontal: 24,
                  paddingVertical: 8,
                  borderRadius: 10,
                  margin: 5,
                  width: 160,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontFamily: 'HindSiliguri-Bolder' }}>Customer</Text>
              </View>
            </Pressable>
            <Pressable  onPress={() =>
            {
              navigation.navigate("StaffLogin")
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
              <View
                style={{
                  backgroundColor: '#344a61',
                  paddingHorizontal: 24,
                  paddingVertical: 8,
                  borderRadius: 10,
                  margin: 10,
                  width: 160,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontFamily: 'HindSiliguri-Bolder' }}>Staff</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

NavigationScreen.navigationOptions = (navData) => {
  return {
    gestureEnabled: false,
  }
}

export default NavigationScreen
