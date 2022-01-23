import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import {homeStyles} from '../styles/home';

export default function Card( props:any ) {
  return (
    <View style={homeStyles.card}>
      <View style={homeStyles.cardContent}>
        {/* <View style={homeStyles.darkCard}></View> */}
        <ImageBackground style={homeStyles.butteryIcon} source={props.image}/>
        <Text style={homeStyles.cardText1}>{props.college}</Text> 
        <Text style={homeStyles.cardText2}>{props.openTime} - {props.closeTime}</Text> 
      </View>
    </View>
  );
}

/* Card.defaultProps = {
  college: 'Placeholder',
  image: require('../assets/images/BerkeleyIcon.png'),
}  */