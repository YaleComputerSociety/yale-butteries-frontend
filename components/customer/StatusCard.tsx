import React, { FC } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import * as Haptics from 'expo-haptics'

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
            <Ionicon name="information-circle" size={23} color="white" />
            <Text style={styles.statusText}>Pending... </Text>
          </View>
        )
      case 'CANCELLED':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        return (
          <View style={styles.cancelledView}>
            <Ionicon name="close-circle" size={23} color="white" />
            <Text style={styles.statusText}>Cancelled</Text>
          </View>
        )
      case 'IN_PROGRESS':
        return (
          <View style={styles.progressView}>
            <ActivityIndicator color={'orange'} size="small" />
            <Text style={styles.statusText}>Cooking...</Text>
          </View>
        )
      case 'FINISHED':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        return (
          <View style={styles.successView}>
            <Ionicon name="checkmark-circle" size={23} color="white" />
            <Text style={styles.statusText}>Finished!{'  '}</Text>
          </View>
        )
    }
  }

  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <Text style={styles.text}>{name}</Text>
        {getIconVisual()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 16,
    color: 'white',
    width: '65%',
  },
  view2: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 18,
    justifyContent: 'space-between',
  },
  view1: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  statusText: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
  successView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1eb71e',
    borderRadius: 6,
    opacity: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  progressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    opacity: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cancelledView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff3a3a',
    borderRadius: 6,
    opacity: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pendingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    opacity: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
})

export default StatusItem
