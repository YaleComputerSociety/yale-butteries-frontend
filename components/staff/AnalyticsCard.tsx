import React, { FC } from 'react'
import { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TransactionItem } from '../../store/slices/TransactionItems'
import AnalyticsItemCard from './AnalyticsItemCard'

import { COLORS } from '../../constants/Colors'
import { TEXTS } from '../../constants/Texts'
import { LAYOUTS } from '../../constants/Layouts'

interface Props {
    time: string
    name: string
    num_items: Number
    cost: string
    items: TransactionItem[]
}

function filterItems(history: TransactionItem[]) {
    // Create an object to store counts of each name
    const item_counts = {};
    const item_costs = {}
    
    // Count occurrences of each name
    history.forEach(entry => {
      if (item_counts[entry.name]) {
        item_counts[entry.name]++;
      } else {
        item_counts[entry.name] = 1;
        item_costs[entry.name] = entry.itemCost;
      }
    });
    
    // Create a new list with unique names and their counts
    const uniqueList = Object.keys(item_counts).map(name => ({
      name: name,
      count: item_counts[name]
    }));
    
    return uniqueList;
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
        <View style = {styles.backgroundCard}>
            <View 
                style = {styles.entry}
                onStartShouldSetResponder={() => true} // Set to capture touches
                onResponderRelease={toggleExpand} // Handle touch release
            >
                <Ionicon style = {styles.drop} name={iconName} size={25} color="#000" />
                <Text style = {styles.text}>{time}</Text>
                <Text style = {styles.text}>{name}</Text>
                <Text style = {styles.text}>{num_items.toString()}</Text>
                <Text style = {styles.text}>${cost}</Text>
            </View>

            {items?.map((item, j) => (
                <AnalyticsItemCard
                    key={j}
                    hide={!isExpanded}
                    name={item.name}
                    cost={(item.itemCost/100).toFixed(2)}
                />
            ))}
        </View>
        
    )
}

const styles = StyleSheet.create({

    backgroundCard: {
        flex: 1,
        backgroundColor: '#1f1f1f',
        marginTop: 10,
        borderRadius: 8,
        padding: 5,
        marginHorizontal: 10,
      },

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
        backgroundColor: '#383838',
        // borderWidth: 2,
        // borderColor: '#555',
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
        marginBottom: 5
    },

    drop: {
        flex: 2,
        color: 'rgba(255,255,255, 0.87)'
    },

    text: {
        flex: 2,
        color: 'rgba(255,255,255, 0.87)',
        fontFamily: 'HindSiliguri-Bold',
    },
})

export default AnalyticsCard
