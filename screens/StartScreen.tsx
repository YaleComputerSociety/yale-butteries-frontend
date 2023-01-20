import * as React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useAppSelector } from '../store/TypedHooks'
import { home } from '../styles/HomeStyles'
import { LinearGradient } from 'expo-linear-gradient'

const StartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { currentUser } = useAppSelector((state) => state.currentUser)
  const managerNetIds = ['app43']
  return (
    <LinearGradient colors={['#4E65FF', '#0CBABA']} locations={[0, 1]}>
      <View style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}>
        <View style={home.outerContainer}>
          <View
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              width: '60%',
              backgroundColor: 'transparent',
              height: '100%',
            }}
          >
            <View>
              <Text style={{ fontSize: 30, color: '#fff', marginBottom: 15, fontFamily: 'HindSiliguri-Bolder' }}>
                Yale<Text style={{ color: '#344a61' }}>Butteries</Text>
              </Text>
            </View>
            <Pressable
              onPress={() => {
                const netIdCheck = currentUser.netid
                if (managerNetIds.includes(netIdCheck)) {
                  navigation.navigate('NavigationScreen')
                } else {
                  navigation.navigate('Home')
                }
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
                  width: 180,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'HindSiliguri-Bolder' }}>Login with CAS</Text>
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
                  width: 180,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'HindSiliguri-Bolder' }}>About</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default StartScreen
