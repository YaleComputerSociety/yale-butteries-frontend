import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface Props {
  size: number
  top: number
  right: number
  left?: number
  bottom?: number
  action: (...args: any[]) => void
}

const EditButton: FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.bubbleStyle,
        height: 1.6 * props.size,
        width: 1.6 * props.size,
        left: props.left,
        top: props.top,
        right: props.right,
        bottom: props.bottom,
      }}
      onPress={props.action}
    >
      <Feather name="edit" style={{ ...styles.iconStyle }} size={props.size} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bubbleStyle: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2000,
    flex: 1,
    position: 'absolute',
  },
  iconStyle: {
    color: 'white',
  },
})

export default EditButton
