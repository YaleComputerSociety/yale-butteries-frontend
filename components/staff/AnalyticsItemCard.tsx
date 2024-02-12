import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
  name: string
  cost: string
  hide: boolean
}

const AnalyticsItemCard: React.FC<Props> = ({ name, cost, hide }: Props) => {
  if (hide) {
    return null
  }

  return (
    <View>
      <View style={styles.entry}>
        <Text style={styles.text} />
        <Text style={styles.itemText}>{name}</Text>
        <Text style={styles.text}>1</Text>
        <Text style={styles.text}>${cost}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#555',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  header: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#555',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  entry: {
    flex: 1,
    backgroundColor: '#5a5a5a',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  text: {
    flex: 2,
    padding: 2,
    color: 'rgba(255,255,255, 0.87)',
    fontFamily: 'HindSiliguri-Bold',
  },
  itemText: {
    flex: 4,
    padding: 2,
    color: 'rgba(255,255,255, 0.87)',
    fontFamily: 'HindSiliguri-Bold',
  },
})

export default AnalyticsItemCard
