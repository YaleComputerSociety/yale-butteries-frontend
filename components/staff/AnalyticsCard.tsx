import React, { FC } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

interface Props {
    id: Number
    name: string
    items: Number
    cost: string
}

const AnalyticsCard: FC<Props> = ({ id, name, items, cost }: Props) => {
  return (
    <View style = {styles.entry}>
        <Text style = {styles.drop}>-</Text>
        <Text style = {styles.idText}>{id.toString()}</Text>
        <Text style = {styles.nameText}>{name}</Text>
        <Text style = {styles.countText}>{items.toString()}</Text>
        <Text style = {styles.costText}>${cost}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#555',
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
    },

    header: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#555',
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
    },

    entry: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#555',
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
    },

    drop: {
        flex: 2,
    },
    idText: {
        flex: 2,
    },
    nameText: {
        flex: 2,
    },
    countText: {
        flex: 2,
    },
    costText: {
        flex: 2,
    },
})

export default AnalyticsCard
