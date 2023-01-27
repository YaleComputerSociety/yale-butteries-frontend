import React, { FC } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

interface Props {
  name: string
  status: string
}

const StatusItem: FC<Props> = ({ name, status }: Props) => {
  function StatusIcon(props) {
    const iconStatus = props.iconStatus
    //'PENDING' | 'CANCELLED' | 'IN_PROGRESS' | 'FINISHED'
    if (iconStatus == 'PENDING') {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            //backgroundColor: 'red',
            borderRadius: 6,
            opacity: 1,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <Ionicon name="information-circle" size={23} color="white" />
          <Text style={{ fontFamily: 'HindSiliguri-Bold', fontSize: 16, color: 'white', marginLeft: 10 }}>
            Pending...{' '}
          </Text>
        </View>
      )
    } else if (iconStatus == 'CANCELLED') {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'red',
            borderRadius: 6,
            opacity: 1,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <Ionicon name="close-circle" size={23} color="white" />
          <Text style={{ fontFamily: 'HindSiliguri-Bold', fontSize: 16, color: 'white', marginLeft: 10 }}>
            Cancelled
          </Text>
        </View>
      )
    } else if (iconStatus == 'IN_PROGRESS') {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            //backgroundColor: 'red',
            borderRadius: 6,
            opacity: 1,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <ActivityIndicator color={'orange'} size="small" />
          <Text style={{ fontFamily: 'HindSiliguri-Bold', fontSize: 16, color: 'white', marginLeft: 10 }}>
            Cooking...
          </Text>
        </View>
      )
    } else if (iconStatus == 'FINISHED') {
      //FINISHED
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'green',
            borderRadius: 6,
            opacity: 1,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <Ionicon name="checkmark-circle" size={23} color="white" />
          <Text style={{ fontFamily: 'HindSiliguri-Bold', fontSize: 16, color: 'white', marginLeft: 10 }}>
            Finished!{'  '}
          </Text>
        </View>
      )
    }
  }

  return (
    <View
      style={{
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 18,
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontFamily: 'HindSiliguri-Bold', fontSize: 16, color: 'white', width: '65%' }}>{name}</Text>
        <StatusIcon iconStatus={status} />
      </View>
    </View>
  )
}

export default StatusItem
