import Ionicon from 'react-native-vector-icons/Ionicons'
import * as React from 'react'
import { StyleSheet, View, Text, Pressable, Modal, TextInput } from 'react-native'
import { useAppDispatch, useAppSelector } from '../store/TypedHooks'
import { home } from '../styles/HomeStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { asyncCreateUser } from '../store/slices/Users'
import * as Random from 'expo-random'

const StartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { currentUser } = useAppSelector((state) => state.currentUser)

  const dispatch = useAppDispatch()

  const [modalVisible, setModalVisible] = React.useState(false)
  const [newText, setText] = React.useState('')

  if (currentUser) {
    console.log('current user found!')
    console.log(currentUser)
  } else {
    console.log('need to create a user..')
  }

  const onSubmit = () => {
    let token = ''
    token += Random.getRandomBytes(8).toString()

    const newUser = {
      email: 'random@blah.edu',
      netid: token,
      name: newText,
      college_id: 1,
      token: token,
      permissions: 'customer',
    }

    dispatch(asyncCreateUser(newUser))
    navigation.navigate('NavigationScreen')
  }
  return (
    <LinearGradient colors={['#4E65FF', '#0CBABA']} locations={[0, 1]}>
      <View style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}>
        <View style={home.outerContainer}>
          <View style={styles.style1}>
            <View>
              <Text style={{ fontSize: 38, color: '#fff', marginBottom: 15, fontFamily: 'HindSiliguri-Bolder' }}>
                Yale<Text style={{ color: '#344a61' }}>Butteries</Text>
              </Text>
            </View>
            <TextInput
              style={styles.input}
              // onChangeText={onChangeNumber}
              // value={number}
              placeholder="Name"
              clearTextOnFocus={true}
              placeholderTextColor="black"
              onSubmitEditing={onSubmit}
              onChangeText={(newText) => setText(newText)}
            />
            {/* <Pressable
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
              <View style={styles.style2}>
                <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'HindSiliguri-Bolder' }}>Login</Text>
              </View>
            </Pressable>
            <Pressable onPress={fetchTest} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
              <View style={styles.style3}>
                <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'HindSiliguri-Bolder' }}>About</Text>
              </View>
            </Pressable> */}
          </View>
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible)
            }}
            transparent={true}
          >
            <View style={styles.style4}>
              {/* <WebView
                injectedJavaScript={injectedJs}
                style={{ borderRadius: 8 }}
                source={{ uri: 'https://secure.its.yale.edu/cas' }}
                onMessage={(event) => {
                  console.log('MESSAGE >>>>' + event.nativeEvent.data)
                }}
              /> */}
            </View>
            <Pressable
              style={styles.style5}
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

const styles = StyleSheet.create({
  style1: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '60%',
    backgroundColor: 'transparent',
    height: '100%',
  },
  style2: {
    backgroundColor: '#1084ff',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 5,
    width: 200,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  style3: {
    backgroundColor: '#344a61',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 5,
    width: 200,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  style4: {
    flex: 1,
    width: '90%',
    height: '60%',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: '40%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  style5: {
    alignSelf: 'flex-end',
    marginTop: '39%',
    backgroundColor: '#033569',
    height: 25,
    width: 25,
    marginRight: '4%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#222',
    padding: 10,
  },
})

export default StartScreen
