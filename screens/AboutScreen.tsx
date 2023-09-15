import React, { FC } from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'

const AboutScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.about}>
        <Text style={[styles.text3, { fontFamily: 'Roboto-Italic' }]}>
          Late-night study grind? Returning from a rowdy weekend gathering? Simply ravenous?{'\n'}
        </Text>
        <Text style={[styles.text2, { fontFamily: 'Roboto', color: '#0e7df0' }]}>
          Don't fret. We've got you covered. &#x1F924; {'\n'}
        </Text>
        <Text style={[styles.text2, { marginTop: 5 }]}>
          <Text style={[styles.text2, { marginTop: 5 }]}>YaleButteries offers a quick and easy way for Yale</Text>{' '}
          Students to order ahead at any one of Yale’s 14 residential college Butteries. Our mission is simple: get food
          and drinks to you safely and securely, without having to wait in line.
        </Text>
      </View>
      <View style={[styles.container2]}>
        <Text style={styles.text}>FAQ</Text>
      </View>
      <View style={styles.faq}>
        <Text style={styles.text3}>Why should I use YaleButteries?</Text>
        <Text style={styles.text2}>Because, you should. {'\n'}</Text>
        <Text style={styles.text3}>Is it safe to enter my credit card information?</Text>
        <Text style={styles.text2}>
          Yes. All user credit card information is handeled by a secure third-party payment processor,{' '}
          <Text style={{ color: '#635bff', fontFamily: 'Roboto' }}>Stripe</Text>. Stripe is a PCI-certified provider,
          the most stringent level of security certification available in the payments industry. {'\n\n'} YaleButteries
          does not handle any payments directly, and does not attempt to store any valuable information, such as credit
          cards on our backend. {'\n'}
        </Text>
        <Text style={styles.text3}>What if a buttery can’t complete my order?</Text>
        <Text style={styles.text2}>
          We understand that Butteries may sometimes not be able to fulfill your order completely {'('}e.g. one of the
          items you ordered is actually out of stock{')'}. For this reason, we have implemented a unique refund system
          that ensures{' '}
          <Text style={{ textDecorationLine: 'underline', fontFamily: 'Roboto' }}>you only pay for what you get</Text>.{' '}
          {'\n\n'} If a Buttery cannot complete your entire order for any reason, the payment will be cancelled, and you
          will be issued a full refund. {'\n'}
        </Text>

        <Text style={styles.text3}>Who runs YaleButteries?</Text>
        <Text style={styles.text2}>
          Yale Butteries is maintained by a small group of developers within the
          <Text style={{ color: '#0e7df0', fontFamily: 'Roboto' }}> Yale Computer Society</Text>.{'\n'}
        </Text>
        <Text style={styles.text3}>How can I get involved?</Text>
        <Text style={styles.text2}>
          We are always looking for more help! If you are interested in joining the team you can email{' '}
          <Text style={{ fontFamily: 'Roboto', textDecorationLine: 'underline' }}>yalecomputersociety@gmail.com</Text>
          {'\n'}
          <Text style={{ color: 'rgba(255,255,255,0.82)', fontFamily: 'Roboto' }}>
            {'\n'}
            Applications for this semester are currently closed.
          </Text>
        </Text>
      </View>
      <View style={[styles.container2, { marginTop: 15 }]}>
        <Text style={[styles.text2, { fontSize: 12, width: '80%', fontFamily: 'Roboto-Italic' }]}>
          This app was developed by Aidan Palmer and Addison Goolsbee with help from Burton Lyng-Olsen, Deja Dunlap, and
          Tucker Moses.
        </Text>
      </View>

      <View style={{ height: 40, width: '100%' }}></View>
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
    marginTop: 15,
    // borderBottomWidth: 1,
    // borderColor: '#999',
  },
  text: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 20,
    fontFamily: 'HindSiliguri-Bold',
    marginBottom: 8,
  },
  text2: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
  },
  text3: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.82)',
    fontSize: 17,
    lineHeight: 18,
    fontFamily: 'Roboto',
    marginBottom: 5,
  },
  name: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: 'rgba(255,255,255,0.82)',
    textAlign: 'center',
    marginBottom: 10,
  },
  about: { paddingHorizontal: 25, marginTop: 15 },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 70,
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  faq: {
    paddingHorizontal: 20,
  },
  size: {
    alignItems: 'center',
    width: 165,
    height: 100,
    marginBottom: 20,
  },
})

AboutScreen['navigationOptions'] = (navData) => {
  return {
    headerTitleStyle: {
      color: 'rgba(255,255,255,0.82)',
      fontFamily: 'HindSiliguri-Bold',
      fontSize: 20,
    },
  }
}

export default AboutScreen
