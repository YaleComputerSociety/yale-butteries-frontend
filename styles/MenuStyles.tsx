import { StyleSheet } from 'react-native';

export const item = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 120,
    elevation: 3, 
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowRadius: 2,
    margin: 12,
    marginBottom: 0,
  },

  leftSide: {
    flex: 6,
  },

  itemName: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#222',
    fontSize: 20,
  },

  itemDescription: {
    fontFamily: 'Roboto',
    color: '#777',
    fontSize: 12,
    flex: 2,
    lineHeight: 12,
  },

  itemPrice: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#222',
    fontSize: 20,
  },

  button: {
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    flex: 1.58,
    borderRadius: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',

    fontSize: 30,
    height: 40,
  },

  countText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },

  spacer: {
    flex: 1.1,
    justifyContent: 'center',
  },

})

export const menu = StyleSheet.create({

})