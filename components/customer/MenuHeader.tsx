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
})
