import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { StyleSheet } from 'react-native';


export const checkout = StyleSheet.create({
  wrapper: {
    flex: 2,
  },

  upperContainer: {
    flex: 1.5,
    margin: 20,
    backgroundColor: '#ddd',
    borderRadius: 6
  },

  orderDetailsContainer: {
    paddingHorizontal: 20,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  lowerContainer: {
    flex: 0.5,
    margin: 20,
    backgroundColor: '#eee'
  }
})