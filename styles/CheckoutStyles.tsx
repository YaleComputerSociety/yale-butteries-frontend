import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { StyleSheet } from 'react-native';


export const checkout = StyleSheet.create({
  wrapper: {
    flex: 2,
  },

  upperContainer: {
    flex: 1.75,
    margin: 20,
    backgroundColor: '#eee',
    borderRadius: 6
  },

  orderDetailsContainer: {
    paddingHorizontal: 20,
  },

  itemNameText: {
    fontFamily: 'Roboto',
  },

  totalText: {
    fontFamily: 'Roboto',
    fontSize: 20,
  },

  text: {
    fontFamily: 'Roboto-Light',
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  footer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    backgroundColor: '#ddd',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },

  lowerContainer: {
    flex: 0.25,
    margin: 20,
  },

  checkoutButton: {
    flex: 1,
    height: '100%',
    margin: '8%',
    borderRadius: 10,
    backgroundColor: '#61ad24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  checkoutText: {
    fontFamily: 'Roboto',
    fontSize: 25,
    color: '#fff'
  },
})
