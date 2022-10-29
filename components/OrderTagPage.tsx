import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, ImageBackgroundBase, ImageStore} from 'react-native';

import { COLORS } from '../constants/Colors';
import { TEXTS } from '../constants/Texts';
import { LAYOUTS } from '../constants/Layouts';

const OrderTagPage = (props) => {
  switch(props.status) {
    case 3:
      return (
        <View 
          style={{...styles.container, backgroundColor: "#D4EFDF"}}>
          <View style={{...styles.timeContainer}}>
              <Text style={{...styles.boldText, lineHeight: 30}}>
                10:57 PM</Text>
              <Text style={{...styles.nameText, lineHeight: 14}}>
                Pickup ready
              </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{...styles.regularText}}>
              {props.orderItem}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={{...styles.nameText}}>
              Aidan</Text>
            <Text style={{...styles.nameText}}>
              Palmer</Text>
          </View>
        </View>
      );
    break;
    case 2:
      return (
        <View 
          style={{...styles.container, backgroundColor: "#FCF3CF"}}>
          <View style={{...styles.timeContainer}}>
              <Text style={{...styles.boldText, lineHeight: 30}}>
              10:57 PM</Text>
              <Text style={{...styles.nameText, lineHeight: 14}}>
                In progress
              </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{...styles.regularText}}>
              {props.orderItem}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={{...styles.nameText}}>
              Aidan</Text>
            <Text style={{...styles.nameText}}>
              Palmer</Text>
          </View>
        </View>
      );
    break;
    case 1:
      return (
        <View 
          style={{...styles.container, backgroundColor: "#FAE5D3"}}>
          <View style={{...styles.timeContainer}}>
              <Text style={{...styles.boldText, lineHeight: 30}}>
                10:57 PM</Text>
              <Text style={{...styles.nameText, lineHeight: 14}}>
                In queue
              </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{...styles.regularText}}>
              {props.orderItem}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={{...styles.nameText}}>
              Aidan</Text>
            <Text style={{...styles.nameText}}>
              Palmer</Text>
          </View>
        </View>
      );
    break;
    case 0:
      if(props.started) {
        return (
          <View 
            style={{...styles.container, backgroundColor: "#F5B7B1"}}>
            <View style={{...styles.timeContainer}}>
               <Text style={{...styles.boldText, lineHeight: 30}}>
                10:57 PM</Text>
              <Text style={{...styles.nameText, lineHeight: 14}}>
                Cancelled
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={{...styles.regularText}}>
                {props.orderItem}
              </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={{...styles.nameText}}>
                Aidan</Text>
              <Text style={{...styles.nameText}}>
                Palmer</Text>
            </View>
          </View>
        );
      } else {
        return (
          <View 
            style={{...styles.container, borderWidth: 2, borderColor: "red"}}>
            <View style={{...styles.timeContainer}}>
              <Text style={{...styles.boldText, lineHeight: 30}}>
                10:57 PM</Text>
              <Text style={{...styles.nameText, lineHeight: 14}}>
                NEW
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={{...styles.regularText}}>
                {props.orderItem}
              </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={{...styles.nameText}}>
                Aidan</Text>
              <Text style={{...styles.nameText}}>
                Palmer</Text>
            </View>
          </View>
        );
      }
    break;
    default:
      return (
        <Text>Something went wrong...</Text>
      );
  };
};

const styles = StyleSheet.create({
  container: {
    height: LAYOUTS.getWidth(50),
    width: LAYOUTS.getWidth(355),
    flex: 1,
    borderRadius: 5,
    //marginBottom: LAYOUTS.getWidth(10),
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: COLORS.white,
    // borderColor: 'black',
    //borderWidth: 2
  },
  timeContainer: {
    width: LAYOUTS.getWidth(80),
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: LAYOUTS.getWidth(10),
    paddingTop: LAYOUTS.getWidth(4)
    //borderWidth: 2
  },
  itemContainer: {
    flex: 1,
    paddingLeft: LAYOUTS.getWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  nameContainer: {
    width: LAYOUTS.getWidth(75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: TEXTS.adjust(15),
    color: COLORS.black,
    //fontFamily: 'ri-Bold'
  },
  regularText: {
    fontSize: TEXTS.adjust(17),
    color: COLORS.black,
    //fontFamily: 'HindSiliguri'
  },
  nameText: {
    fontSize: TEXTS.adjust(12),
    color: COLORS.black,
    //fontFamily: 'HindSiliguri'
  },
});

export default OrderTagPage;