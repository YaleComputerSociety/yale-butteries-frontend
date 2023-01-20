import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'

export const home = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },

  nameText: {
    fontSize: 25,
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    //alignItems: 'stretch',
    justifyContent: 'center',
  },

  outerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignContent: 'center',
    marginBottom: 10,
  },

  textContent: {
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginLeft: 10,
  },

  menuView: {
    margin: 0,
  },

  footer: {
    width: '100%',
    height: '18%',
    backgroundColor: '#fff',
  },
})

export const card = StyleSheet.create({
  cardText1: {
    textAlignVertical: 'bottom',
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginBottom: 25,
    marginTop: 10,
  },

  cardText2: {
    fontFamily: 'Roboto-Italic',
    marginBottom: 0,
    color: '#fff',
  },

  card: {
    flex: 1,
    elevation: 10,
    backgroundColor: '#343a40',
    marginVertical: 3.5,
  },

  cardContent: {
    flex: 1,
    borderColor: '#6c757a',
    borderBottomWidth: 0.25,
    borderRadius: 0,
    flexDirection: 'row',
    marginLeft: 0,
    paddingLeft: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 1,
  },
})
