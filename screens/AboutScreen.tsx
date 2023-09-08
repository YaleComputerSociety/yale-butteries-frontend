import React, { FC } from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'

const AboutScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.about}>
        <Text style={[styles.text2, { fontFamily: 'Roboto-Italic' }]}>
          Late-night study grind? Returning from a rowdy weekend gathering? Simply ravenous?{'\n'}
        </Text>
        <Text style={[styles.text2, { fontFamily: 'Roboto', color: '#0e7df0' }]}>
          Don't fret. We've got you covered. {'\n'}
        </Text>
        <Text style={[styles.text2, { fontFamily: 'Roboto-Light' }]}>
          Yale Butteries offers a quick and easy way for Yale Students to order ahead at any one of Yale’s 14
          residential college Butteries. Our mission is simple: get food and drinks to you safely and securely, without
          having to wait in line.
        </Text>
      </View>
      <View style={[styles.container2, { marginTop: 15 }]}>
        <Text style={styles.text}>Meet the Team</Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={{ alignItems: 'center', width: 180, height: 280 }}>
          <Image style={styles.image} source={require('../assets/images/aidan.jpeg')} />
          <Text style={[styles.text2, { fontFamily: 'Roboto', fontSize: 15 }]}>Aidan Palmer</Text>
          <Text style={[styles.text2, { fontSize: 14 }]}>Co-Founder,{'\n'}Lead Developer</Text>
        </View>
        <View style={{ alignItems: 'center', width: 180, height: 280 }}>
          <Image style={styles.image} source={require('../assets/images/addison.jpeg')} />
          <Text style={[styles.text2, { fontFamily: 'Roboto', fontSize: 15 }]}>Addison Goolsbee</Text>
          <Text style={[styles.text2, { fontSize: 14 }]}>Co-Founder,{'\n'}Developer</Text>
        </View>
      </View>
      <View style={[styles.container2]}>
        <Text style={styles.text}>FAQ</Text>
      </View>
      <View>
        <Text style={[styles.text2, { fontFamily: 'Roboto-Italic' }]}>Why should I use Yale Butteries?</Text>
        <Text style={[styles.text2, { fontFamily: 'Roboto-Italic' }]}>
          Is it safe to enter my credit card information?
        </Text>
        <Text style={[styles.text2, { fontFamily: 'Roboto-Italic' }]}>What if a buttery can’t complete my order?</Text>
        <Text style={[styles.text2, { fontFamily: 'Roboto-Italic' }]}>Who runs Yale Butteries?</Text>
        <Text style={[styles.text2, { fontFamily: 'Roboto-Italic' }]}>How can I get involved with Yale Butteries?</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    height: '100%',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // borderBottomWidth: 1,
    // borderColor: '#999',
  },
  text: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 18,
    fontFamily: 'HindSiliguri-Bold',
    marginBottom: 8,
  },
  text2: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    lineHeight: 18,
  },
  about: { paddingHorizontal: 25 },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    height: 180,
    width: 180,
    marginBottom: 10,
  },
})

AboutScreen['navigationOptions'] = (navData) => {
  return {
    headerTitleStyle: {
      color: 'rgba(255,255,255,0.82)',
      fontFamily: 'HindSiliguri-Bold',
      fontSize: 18,
    },
  }
}

export default AboutScreen
