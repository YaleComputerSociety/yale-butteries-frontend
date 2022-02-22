import React from 'react';
import { View, ImageBackground, Image, Text } from 'react-native';
import {homeStyles} from '../styles/home';

export default function Card( props:any ) {
  return (

  <ImageBackground source={props.backgroundImage} resizeMode="cover" style={homeStyles.card} imageStyle={{borderRadius: 6}}>
      <View style={homeStyles.cardContent}>
        <View style={homeStyles.textContent}>
          <Text style={homeStyles.cardText1}>{props.college}</Text>
          <Text style={homeStyles.cardText2}>{props.openTime} - {props.closeTime}</Text>
        </View>
        <Image style={homeStyles.butteryIcon} source={props.image}/>
      </View>
  </ImageBackground>

  );
}

Card.defaultProps = {
  college: 'Placeholder',
  image: require('../assets/images/butteryIconPlaceholder.jpg'),
}
