import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, Image, Pressable} from 'react-native';
import {card} from '../styles/HomeStyles';

export const Card = (props:any) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openTimeHours, setOpenTimeHours] = useState(0);
  const [closeTimeHours, setCloseTimeHours] = useState(0);
  const [openTimeMinutes, setOpenTimeMinutes] = useState(0);
  const [closeTimeMinutes, setCloseTimeMinutes] = useState(0);

  // determines whether the buttery is currently open
  function currentlyOpen(){
    const a = openTimeHours;
    const b = closeTimeHours;
    const am = openTimeMinutes;
    const bm = closeTimeMinutes;
    const h = new Date().getHours();
    const m = new Date().getMinutes();
    if (a<b){ // standard case
      return ((h>a && h<b) || (h==a && m>=am) || (h==b && m<bm));
    } else if (a>b){ // time wraps around midnight
      return ((h>a || h<b) || (h==a && m>=am) || (h==b && m<bm));
      
    } else { // within the same hour
      return (m>=am && m<bm);
    }
  }

  // immediately check if the buttery is open
  useEffect(() => {
    setIsOpen(currentlyOpen());
  }, [isOpen]);

  //check every minute whether the buttery is open
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(currentlyOpen());
    }, 60000);
    return () => clearInterval(interval);
  }, [isOpen]);

 

  // translate opentime/close time into openTimeHours etc
  useEffect(() => {
    setOpenTimeHours(parseInt(props.openTime.substring(0, props.openTime.indexOf(':'))) + (props.openTime.toString().includes("pm") ? 12 : 0));
    setOpenTimeMinutes(parseInt(props.openTime.substring(props.openTime.indexOf(':')+1)));

    setCloseTimeHours(parseInt(props.closeTime.substring(0, props.closeTime.indexOf(':'))) + (props.closeTime.toString().includes("pm") ? 12 : 0));
    setCloseTimeMinutes(parseInt(props.closeTime.substring(props.closeTime.indexOf(':')+1)));

  }, [props.openTime, props.closeTime]);

  // takes openTime and closeTime and puts them into clean text form. Assumes (h)h:(m)m form with optional pm/am
  function cleanTime(){
    // get open time
    const cleanOpen =  (openTimeHours%12) + ':' + (openTimeMinutes<10 ? '0': '') + openTimeMinutes + (openTimeHours>12 ? 'pm' : 'am');
    const cleanClose =  (closeTimeHours%12) + ':' + (closeTimeMinutes<10 ? '0': '') + closeTimeMinutes + (closeTimeHours>12 ? 'pm' : 'am');
    
    return cleanOpen + ' - ' + cleanClose;
  }

  return (

    <Pressable onPress={props.onPress} disabled={!isOpen}>
      <ImageBackground source={props.backgroundImage} resizeMode="cover" style={isOpen ? card.card : [card.card, {opacity: 0.5}]} imageStyle={{borderRadius: 6}}>
      <View style={card.cardContent}>
        <View>
          <Text style={card.cardText1}>{props.college}</Text>
          <Text style={card.cardText2}>{cleanTime()}</Text>
        </View>
        <Image style={card.butteryIcon} source={props.image}/>
      </View>
    </ImageBackground>
  </Pressable>
  );
}

Card.defaultProps = {
  college: 'Placeholder',
  image: require('../assets/images/butteryIconPlaceholder.jpg'),
}
