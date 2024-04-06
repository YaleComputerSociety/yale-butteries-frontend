import type { FC } from 'react'
import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'

import type { MainStackScreenProps } from '../utils/types'

const AboutScreen: FC<MainStackScreenProps<'AboutScreen'>> = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.about}>
        <Text style={[styles.text3, styles.italic]}>
          Late-night study grind? Returning from a rowdy weekend gathering? Simply ravenous?{'\n'}
        </Text>
        <Text style={[styles.text2, styles.blueText]}>
          Don&apos;t fret. We&apos;ve got you covered. &#x1F924; {'\n'}
        </Text>
        <Text style={[styles.text2, styles.topMargin]}>
          <Text style={[styles.text2, styles.topMargin]}>Yale Butteries offers a quick and easy way for Yale</Text>{' '}
          Students to order ahead at any one of Yale&apos;s 14 residential college Butteries. Our mission is simple: get
          food and drinks to you safely and securely, without having to wait in line.
        </Text>
      </View>
      <View style={[styles.container2]}>
        <Text style={styles.text}>FAQ</Text>
      </View>
      <View style={styles.faq}>
        <Text style={styles.text3}>Why should I use Yale Butteries?</Text>
        <Text style={styles.text2}>Because, you should. {'\n'}</Text>
        <Text style={styles.text3}>Is it safe to enter my credit card information?</Text>
        <Text style={styles.text2}>
          Yes. All user credit card information is handeled by a secure third-party payment processor,{' '}
          <Text style={styles.stripeText}>Stripe</Text>. Stripe is a PCI-certified provider, the most stringent level of
          security certification available in the payments industry. {'\n\n'} Yale Butteries does not handle any
          payments directly, and does not attempt to store any valuable information, such as credit cards on our
          backend. {'\n'}
        </Text>
        <Text style={styles.text3}>What if a buttery can’t complete my order?</Text>
        <Text style={styles.text2}>
          We understand that Butteries may sometimes not be able to fulfill your order completely {'('}e.g. one of the
          items you ordered is actually out of stock{')'}. For this reason, we have implemented a unique refund system
          that ensures <Text style={styles.underlineBold}>you only pay for what you get</Text>. {'\n\n'} If a Buttery
          cannot complete your entire order for any reason, the payment will be cancelled, and you will be issued a full
          refund. {'\n'}
        </Text>

        <Text style={styles.text3}>Who runs Yale Butteries?</Text>
        <Text style={styles.text2}>
          Yale Butteries is maintained by a small group of developers within the
          <Text style={styles.blueText}> Yale Computer Society</Text>.{'\n'}
        </Text>
        <Text style={styles.text3}>How can I get involved?</Text>
        <Text style={styles.text2}>
          We are always looking for more help! If you are interested in joining the team you can email{' '}
          <Text style={styles.underlineBold}>yalecomputersociety@gmail.com</Text>
          {'\n'}
        </Text>
      </View>
      <View style={[styles.container2, styles.bigTopMargin]}>
        <Text style={[styles.text2, styles.bottomText]}>
          This app was developed by Aidan Palmer and Addison Goolsbee with help from Burton Lyng-Olsen, Deja Dunlap, and
          Tucker Moses.
        </Text>
      </View>
      <View style={styles.footerSpacing} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  footerSpacing: { height: 40, width: '100%' },
  bottomText: { fontSize: 12, width: '80%', fontFamily: 'Roboto-Italic' },
  bigTopMargin: { marginTop: 15 },
  underlineBold: { textDecorationLine: 'underline', fontFamily: 'Roboto' },
  stripeText: { color: '#635bff', fontFamily: 'Roboto' },
  topMargin: { marginTop: 5 },
  blueText: { fontFamily: 'Roboto', color: '#0e7df0' },
  italic: { fontFamily: 'Roboto-Italic' },
  container: {
    backgroundColor: '#1f1f1f',
    height: '100%',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
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

export default AboutScreen
