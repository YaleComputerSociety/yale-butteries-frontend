import React, { FC } from 'react'
import { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TransactionItem } from '../../store/slices/TransactionItems'
import AnalyticsItemCard from './AnalyticsItemCard'

interface Props {
    time: string
    name: string
    num_items: Number
    cost: string
    items: TransactionItem[]
}

const AnalyticsCard: FC<Props> = ({ time, name, num_items, cost, items }: Props) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const [iconName, setIconName] = useState('chevron-forward-outline');

    function toggleExpand() {
        setIsExpanded(!isExpanded);
        const newIconName = iconName === 'chevron-down-outline' ? 'chevron-forward-outline' : 'chevron-down-outline';
        setIconName(newIconName);
    }


    return (
        <View>
            <View 
                style = {styles.entry}
                onStartShouldSetResponder={() => true} // Set to capture touches
                onResponderRelease={toggleExpand} // Handle touch release
            >
                <Ionicon style = {styles.drop} name={iconName} size={25} color="#000" />
                <Text style = {styles.timeText}>{time}</Text>
                <Text style = {styles.nameText}>{name}</Text>
                <Text style = {styles.countText}>{num_items.toString()}</Text>
                <Text style = {styles.costText}>${cost}</Text>
            </View>

            {items?.map((item) => (
                <AnalyticsItemCard
                hide={!isExpanded}
                name={item.name}
                cost={(item.itemCost/100).toFixed(2)}
                />
            ))}
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
    timeText: {
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
