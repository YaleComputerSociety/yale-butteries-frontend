import React, {useEffect, FC} from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
//import { useAppSelector } from '../store/TypedHooks'
import { home } from '../styles/HomeStyles'
import { LinearGradient } from 'expo-linear-gradient'
import * as LocalStorage from '../LocalStorage'
import { baseUrl } from '../utils/utils'

const LoadScreen: FC<{ navigation: any }> = ({ navigation }) => {

  async function verifyUser (username) {
      try {
        const response = await fetch(baseUrl + 'api/users') 
        var match = false
        const data = await response.json()
        data.forEach((item) => {
          if (item.name == username) {
            match = true 
          }
        })
      } catch (error) {
        console.error(error)
      }
      return match
    }


  useEffect(() => {
    const chooseScreen = async () => {
      var check = await LocalStorage.getUserInfo(['username', 'permissions', 'id'])
      if (check != null) {
        var verify = await verifyUser(check[0][1])
        if (verify) {
          if (check[1][1] == "staff") {
            navigation.navigate("NavigationScreen") 
          } else {
            navigation.navigate("ButteriesScreen")
          }
        } else {
          navigation.navigate('StartScreen')
          LocalStorage.removeUserInfo(['username', 'permissions', 'id'])
        }
      } else {
        navigation.nagivate('StartScreen')
      }
    }
    chooseScreen()
  }, [])

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
            </View>
            </View>
            </View>
    </LinearGradient>
  )
}
export default LoadScreen