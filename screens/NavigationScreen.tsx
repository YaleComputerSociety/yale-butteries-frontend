import * as React from 'react'
import { View, Text, Pressable } from 'react-native'
import { home } from '../styles/HomeStyles'

const NavigationScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: '#FFF' }}>
      <View style={home.outerContainer}>
        <View
          style={{
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '50%',
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
                width: 150,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff' }}>Customer</Text>
            </View>
          </Pressable>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
            <View
              style={{
                backgroundColor: '#344a61',
                paddingHorizontal: 24,
                paddingVertical: 8,
                borderRadius: 10,
                margin: 5,
                width: 150,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff' }}>Staff</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default NavigationScreen
