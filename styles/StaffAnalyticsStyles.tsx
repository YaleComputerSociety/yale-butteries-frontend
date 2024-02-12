import { StyleSheet } from 'react-native'

export const staffAnalytics = StyleSheet.create({
  title: {
    flex: 1,
    backgroundColor: '#383838',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },

  header: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },

  entry: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#555',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },

  text: {
    flex: 3,
    fontFamily: 'HindSiliguri-Bold',
    color: 'rgba(255,255,255, 0.87)',
  },

  subheader: {
    fontFamily: 'HindSiliguri-Bold',
    color: 'rgba(255,255,255, 0.87)',
  },
})
