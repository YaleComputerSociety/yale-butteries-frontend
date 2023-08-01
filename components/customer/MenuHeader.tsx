import React, { FC } from 'react'
import { View, StyleSheet, Pressable, Text, Image } from 'react-native'

interface Props {
    toFood: () => void
    toDrink: () => void
    toDessert: () => void
  }

export const MenuHeader: FC<Props> = ({ toDessert, toDrink, toFood }: Props) => {
  return (
    <View style={styles.wrapper}>
        <Pressable           
            style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1 },
                styles.button,
            ]} 
            onPress={toFood}>
            <View style={styles.iconWrapper}>
                <Image source={require('../../assets/images/icons8-french-fries-48.png')} style={styles.image}/>
            </View>
            <Text style={styles.text}>Food</Text>
        </Pressable>
        <Pressable 
            style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1 },
                styles.button,
            ]}  
            onPress={toDrink}>
            <View style={styles.iconWrapper}>
                <Image source={require('../../assets/images/icons8-cola-48.png')} style={styles.image}/>
            </View>
            <Text style={styles.text}>Drink</Text>
        </Pressable>
        <Pressable 
            style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1 },
                styles.button,
            ]}  
            onPress={toDessert}>
            <View style={styles.iconWrapper}>
                <Image source={require('../../assets/images/icons8-cupcake-48.png')} style={styles.image}/>
            </View>
            <Text style={styles.text}>Dessert</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        flex: 2,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
        height: 115,
        shadowColor: '#000',
        shadowRadius: 3,
        shadowOpacity: 0.1,
    },
    text: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'HindSiliguri-Bold',
        marginTop: 10,
    },
    iconWrapper: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignContent: 'center',
    },
    image: {
        height:30,
        width: 30,
    }
})