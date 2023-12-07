import React, { FC } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TransactionItem } from '../../store/slices/TransactionItems'

interface Props {
    name: string
    cost: string
    hide: boolean
}

const AnalyticsItemCard: FC<Props> = ({ name, cost, hide }: Props) => {

    if (hide) {
        return null;
    }
    
    return (
        <View>
            <View style = {styles.entry}>
                <Text style = {styles.drop}></Text>
                <Text style = {styles.idText}>-</Text>
                <Text style = {styles.nameText}>{name}</Text>
                <Text style = {styles.countText}>1</Text>
                <Text style = {styles.costText}>${cost}</Text>
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

export default AnalyticsItemCard
