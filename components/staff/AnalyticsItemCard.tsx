import React, { FC } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TransactionItem } from '../../store/slices/TransactionItems'

interface Props {
    name: string
    cost: string
    hide: boolean
    time: string
}

const AnalyticsItemCard: FC<Props> = ({ name, cost, hide, time }: Props) => {

    if (hide) {
        return null;
    }

    return (
        <View>
            <View style = {styles.entry}>
                <Text style = {styles.text}></Text>
                <Text style = {styles.text}>{time}</Text>
                <Text style = {styles.text}>{name}</Text>
                <Text style = {styles.text}>1</Text>
                <Text style = {styles.text}>${cost}</Text>
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
        backgroundColor: '#F1F1F1',
        // borderWidth: 2,
        // borderColor: '#555',
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },

    text: {
        flex: 2,
        fontFamily: 'HindSiliguri-Bold',
    }
})

export default AnalyticsItemCard
