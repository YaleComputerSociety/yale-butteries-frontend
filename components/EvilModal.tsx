import React, { useState, useEffect } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'

import { LAYOUTS } from '../constants/Layouts'
import { TEXTS } from '../constants/Texts'

// How to use: By burton
// 1 import evil modal
// 2 create a state, eg backendError defaulted to false
// 3 Put EvilModal inside your highest level component
// 4 Set the display prop to backenderror
// 5 When error is thrown set backenderror to true

interface Props {
  display: boolean
  toggle: (params: boolean) => void
}

const EvilModal: React.FC<Props> = ({ display }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setModalVisible(display)
  }, [display])

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.box}>
            <Text style={styles.header}>Oopsie!</Text>
            <Text style={styles.text}>
              There was a network error. Please connect to internet and restart the app to continue.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: LAYOUTS.getWidth(260),
    height: LAYOUTS.getWidth(200),
    borderRadius: 15,
    backgroundColor: 'white',

    alignItems: 'center',
    padding: LAYOUTS.getWidth(10),
  },
  modal: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: TEXTS.adjust(15),
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: LAYOUTS.getWidth(10),
  },
  header: {
    fontSize: TEXTS.adjust(20),
    flexWrap: 'wrap',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: LAYOUTS.getWidth(15),
    marginBottom: LAYOUTS.getWidth(10),
  },
})
export default EvilModal
