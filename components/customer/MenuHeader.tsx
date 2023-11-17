import { LinearGradient } from 'expo-linear-gradient'
import React, { FC } from 'react'
import { View, StyleSheet, Pressable, Text, Image } from 'react-native'

interface Props {
  toFood: () => void
  toDrink: () => void
  toDessert: () => void
  name: string
}

export const MenuHeader: FC<Props> = ({ toDessert, toDrink, toFood, name }: Props) => {
  function getImage(collegeName: string) {
    if (collegeName == 'morse') {
      return <Image source={require('../../assets/images/TheMorsel.png')} style={styles.imageHeader} />
    } else if (collegeName == 'trumbull') {
      return <Image source={require('../../assets/images/TheTrumbutt.png')} style={styles.imageHeader} />
    }
  }
  return (
    <View>
      <LinearGradient
        colors={['rgba(18,18,18,0.3)', 'rgba(80, 80, 80, 0.3)', 'rgba(18,18,18,0.3)']}
        locations={[0, 0.5, 1]}
      >
        {getImage(name)}
      </LinearGradient>
      <View style={styles.wrapper}>
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? '#2c2c2c' : '#1f1f1f' }, styles.button]}
          onPress={toFood}
        >
          <View style={styles.iconWrapper}>
            <Image source={require('../../assets/images/icons8-french-fries-48.png')} style={styles.image} />
          </View>
          <Text style={styles.text}>Food</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? '#2c2c2c' : '#1f1f1f' }, styles.button]}
          onPress={toDrink}
        >
          <View style={styles.iconWrapper}>
            <Image source={require('../../assets/images/icons8-drink-48.png')} style={styles.image} />
          </View>
          <Text style={styles.text}>Drink</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? '#2c2c2c' : '#1f1f1f' }, styles.button]}
          onPress={toDessert}
        >
          <View style={styles.iconWrapper}>
            <Image source={require('../../assets/images/icons8-cupcake-48.png')} style={styles.image} />
          </View>
          <Text style={styles.text}>Dessert</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 0,
    justifyContent: 'space-evenly',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowOpacity: 0.1,
    marginTop: 10,
    width: '30%',
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    color: 'rgba(255,255,255, 0.87)',
    fontFamily: 'HindSiliguri-Bold',
    marginTop: 10,
  },
  iconWrapper: {
    backgroundColor: '#383838',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    height: 30,
    width: 30,
  },
  imageHeader: {
    height: 220,
    width: '100%',
    marginTop: 10,
  },
})
