import { StyleSheet } from 'react-native'

export const home = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#4E65FF',
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
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginVertical: 18,
    alignContent: 'center',
    //backgroundColor: 'black',
  },

  cardText2: {
    fontFamily: 'Roboto-Italic',
    //backgroundColor: 'black',
    color: '#fff',
    fontSize: 15,
  },

  card: {
    flex: 1,
    backgroundColor: '#343a40',
  },

  cardContent: {
    flex: 1,
    borderColor: '#fff',
    borderBottomWidth: 0.25,
    flexDirection: 'row',
    paddingLeft: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 1,
  },
})
