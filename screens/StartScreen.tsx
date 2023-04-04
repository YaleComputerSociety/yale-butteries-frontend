import Ionicon from 'react-native-vector-icons/Ionicons'
import * as React from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import { useAppSelector } from '../store/TypedHooks'
import { home } from '../styles/HomeStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { WebView } from 'react-native-webview'
import { baseUrl } from '../utils/utils'

const StartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { currentUser } = useAppSelector((state) => state.currentUser)
  const [modalVisible, setModalVisible] = React.useState(false)
  const injectedJs = `
    document.querySelector('h1').style.backgroundColor = 'red'
  `
  const managerNetIds = ['awg32']

  const fetchTest = async () => {
    console.log(baseUrl)
    const result = await fetch(baseUrl + 'api/users')
    const res = await result.json()
    console.log(res)
  }

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
                  navigation.navigate('ButteriesScreen')
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
                <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'HindSiliguri-Bolder' }}>Login</Text>
              </View>
            </Pressable>
            <Pressable onPress={fetchTest} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
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
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible)
            }}
            transparent={true}
          >
            <View
              style={{
                flex: 1,
                width: '90%',
                height: '60%',
                alignSelf: 'center',
                position: 'absolute',
                marginTop: '40%',
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
            >
              <WebView
                injectedJavaScript={injectedJs}
                style={{ borderRadius: 8 }}
                source={{ uri: 'https://secure.its.yale.edu/cas' }}
                onMessage={(event) => {
                  console.log('MESSAGE >>>>' + event.nativeEvent.data)
                }}
              />
            </View>
            <Pressable
              style={{
                alignSelf: 'flex-end',
                marginTop: '39%',
                backgroundColor: '#033569',
                height: 25,
                width: 25,
                marginRight: '4%',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Ionicon name="close" size={20} color="#fff" />
            </Pressable>
          </Modal>
        </View>
      </View>
    </LinearGradient>
  )
}

export default StartScreen
