import React, { FC } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

interface Props {
  name: string
  status: string
}

const StatusItem: FC<Props> = ({ name, status }: Props) => {
  const getIconVisual = () => {
    switch (status) {
      case 'PENDING':
        return (
          <View style={styles.pendingView}>
            <Text style={styles.statusText}>Pending...</Text>
          </View>
        )
      case 'CANCELLED':
        return (
          <View style={styles.cancelledView}>
            <Ionicon name="close-circle" size={23} color="white" />
            <Text style={styles.statusText}>Cancelled</Text>
          </View>
        )
      case 'IN_PROGRESS':
        return (
          <View style={styles.progressView}>
            <ActivityIndicator color={'white'} size="small" />
            <Text style={styles.statusText}>In Progress</Text>
          </View>
        )
      case 'FINISHED':
        return (
          <View style={styles.successView}>
            <Ionicon name="checkmark-circle" size={23} color="white" />
            <Text style={styles.statusText}>Finished!</Text>
          </View>
        )
    }
  }

  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <Text style={styles.text}>{name}</Text>
      </View>
      {getIconVisual()}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 16,
    color: 'rgba(255,255,255,0.87)',
  },
  view2: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  view1: {
    flex: 4,
    padding: 10,
    paddingLeft: 20,
    flexDirection: 'row',
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  statusText: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 16,
    color: 'rgba(255,255,255,0.87)',
    marginHorizontal: 10,
  },
  successView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1eb71e',
    borderRadius: 6,
    opacity: 1,
    paddingVertical: 4,
    width: 150,
  },
  progressView: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fe8548',
    alignItems: 'center',
    borderRadius: 6,
    opacity: 1,
    paddingHorizontal: 8,
    width: 150,
    paddingVertical: 4,
  },
  cancelledView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff3a3a',
    borderRadius: 6,
    opacity: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 150,
  },
  pendingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2c2c2c',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    opacity: 1,
    width: 150,
  },
})

export default StatusItem
