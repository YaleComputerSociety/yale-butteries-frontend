import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';


import { COLORS } from '../constants/Colors';
import { TEXTS } from '../constants/Texts';
import { LAYOUTS } from '../constants/Layouts';

const ItemTag = () => {

  return (
    <TouchableOpacity style={{...styles.container, backgroundColor: "white"}}>
      <View style={{...styles.nameContainer}}>
        <Text style={{color: "black"}}>
          Quesadilla - Lim.Time</Text>
      </View>
      <View style={{...styles.limitedContainer}}>
        <Text style={{color: "black"}}>
          $1.53</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginBottom: LAYOUTS.getWidth(10),
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingVertical: LAYOUTS.getWidth(5),
    height: LAYOUTS.getWidth(30)
  },
  nameContainer: {
    marginLeft: LAYOUTS.getWidth(3),
    justifyContent: 'center'
  },
  limitedContainer: {
    justifyContent: 'center'
  }
});

export default ItemTag;