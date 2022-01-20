import React from 'react';
import { Text, Image, View, ScrollView } from 'react-native';
import { homeStyles } from './styles/home';
import Card from './components/Card';

export default function App() {
  return (
    <ScrollView style={homeStyles.app}>
      <View style={homeStyles.outerContainer}>  
        <View style={homeStyles.innerContainer}>
          <Card college='Berkeley' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='Branford' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='Davenport' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='Franklin' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='Hopper' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='JE' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='Morse' openTime='10:00pm' closeTime='1:00am'/>
        </View>
        <View style={homeStyles.innerContainer}>
          <Card college='Murray' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='Pierson' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='Saybrook' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='Silliman' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='Stiles' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='TD' openTime='10:00pm' closeTime='1:00am'/>
          <Card college='Trumbull' openTime='10:00pm' closeTime='1:00am'/>
        </View>
      </View>
    </ScrollView>
  );
}