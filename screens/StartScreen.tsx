import * as React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useAppSelector } from '../store/TypedHooks'
import { home } from '../styles/HomeStyles'

const StartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { currentUser } = useAppSelector((state) => state.currentUser)
  const managerNetIds = ['testmctester123', 'app43']
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
          <View>
            <Text style={{ fontSize: 25, marginBottom: 15, fontFamily: 'HindSiliguri-Bolder' }}>
              Yale<Text style={{ color: '#1084ff' }}>Butteries</Text>
            </Text>
          </View>
          <Pressable
            onPress={() => {
              const netIdCheck = currentUser.netid
              if (managerNetIds.includes(netIdCheck)) {
                navigation.navigate('NavigationScreen')
                console.log('Manager Found!')
              } else {
                navigation.navigate('Home')
                console.log('Bad')
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
                width: 150,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff' }}>Login with CAS</Text>
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
              <Text style={{ color: '#fff' }}>About</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default StartScreen
