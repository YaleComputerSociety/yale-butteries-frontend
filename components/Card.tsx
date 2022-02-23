import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, Image} from 'react-native';
import {homeStyles, cardStyles} from '../styles/HomeStyles';

export const Card = (props:any) => {
  const [isOpen, setIsOpen] = useState(false);

  // determines whether the buttery is currently open
  function currentlyOpen(){
    const a = props.openTimeHours;
    const b = props.closeTimeHours;
    const am = props.openTimeMinutes;
    const bm = props.closeTimeMinutes;
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

  // check every 0.5 seconds whether the buttery is open :( 
  useEffect(() => {
    const interval = setInterval(() => {
      //console.log(currentlyOpen());
      setIsOpen(currentlyOpen());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // takes openTime and closeTime and puts them into clean text form. Assumes (h)h:(m)m form with optional pm/am
  // also stores the props openTimeHours, openTimeMinutes, closeTimeHours, and closeTimeMinutes
  // DOESN'T WORK ON FIRST RENDER - HOW DO I FIX THIS
  function cleanTime(){
    // get open time
    const openTimeHours = parseInt(props.openTime.substring(0, props.openTime.indexOf(':'))) + (props.openTime.toString().includes("pm") ? 12 : 0);
    const openTimeMinutes = parseInt(props.openTime.substring(props.openTime.indexOf(':')+1));
    const cleanOpen =  (openTimeHours%12) + ':' + (openTimeMinutes<10 ? '0': '') + openTimeMinutes + (openTimeHours>12 ? 'pm' : 'am');
    
    // get close time
    const closeTimeHours = parseInt(props.closeTime.substring(0, props.closeTime.indexOf(':'))) + (props.closeTime.toString().includes("pm") ? 12 : 0);
    const closeTimeMinutes = parseInt(props.closeTime.substring(props.closeTime.indexOf(':')+1));
    const cleanClose =  (closeTimeHours%12) + ':' + (closeTimeMinutes<10 ? '0': '') + closeTimeMinutes + (closeTimeHours>12 ? 'pm' : 'am');
    
    return cleanOpen + ' - ' + cleanClose;
  }

  var cleanedTime = cleanTime();
  //console.log(props.openTimeHours);

  return (

  <ImageBackground source={props.backgroundImage} resizeMode="cover" style={[cardStyles.card, isOpen ? cardStyles.cardOpen : cardStyles.cardClosed]} imageStyle={{borderRadius: 6}}>
      <View style={cardStyles.cardContent}>
        <View>
          <Text style={cardStyles.cardText1}>{props.college}</Text>
          <Text style={cardStyles.cardText2}>{cleanTime()}</Text>
        </View>
        <Image style={cardStyles.butteryIcon} source={props.image}/>
      </View>
  </ImageBackground>
  );
}

Card.defaultProps = {
  college: 'Placeholder',
  image: require('../assets/images/butteryIconPlaceholder.jpg'),
}
