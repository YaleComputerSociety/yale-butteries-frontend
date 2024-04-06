import * as React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { home } from '../styles/ButteriesStyles'
import type { MainStackScreenProps } from '../utils/types'

const NavigationScreen: React.FC<MainStackScreenProps<'NavigationScreen'>> = ({ navigation }) => {
  return (
    <LinearGradient colors={['#4E65FF', '#0CBABA']} locations={[0, 1]}>
      <View style={styles.view1}>
        <View style={home.outerContainer}>
          <View style={styles.view2}>
            <Pressable
              onPress={() => {
                navigation.navigate('StaffRenderScreen')
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View style={styles.view4}>
                <Text style={styles.text}>Staff</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('ButteriesScreen')
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View style={styles.view3}>
                <Text style={styles.text}>Customer</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default NavigationScreen

const styles = StyleSheet.create({
  view1: { height: '100%', width: '100%', backgroundColor: 'transparent' },
  text: { color: '#fff', fontFamily: 'HindSiliguri-Bold', fontSize: 17, letterSpacing: 0.7 },
  view2: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '50%',
    backgroundColor: 'transparent',
    height: '100%',
  },
  view3: {
    backgroundColor: '#1084ff',
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 5,
    width: 200,
    alignItems: 'center',
  },
  view4: {
    backgroundColor: '#344a61',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 10,
    width: 200,
    alignItems: 'center',
  },
})
