import { StyleSheet } from 'react-native'

export const home = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#54ade4',
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
    paddingBottom: 80,
  },

  footer: {
    width: '100%',
    height: '18%',
    backgroundColor: '#fff',
  },

  partition: {
    height: 150,
    display: 'flex',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.75,
  },

  announcement: {
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 62,
    fontSize: 20,
    color: 'white',
  },
})

export const card = StyleSheet.create({
  cardText1: {
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginTop: 12,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'flex-start',
  },

  cardText2: {
    fontFamily: 'Roboto-Italic',
    color: '#fff',
    fontSize: 15,
  },

  dayText: {
    fontFamily: 'HindSiliguri',
    fontStyle: 'normal',
    fontWeight: '100',
    color: 'white',
    marginTop: 5,
  },

  card: {
    flex: 1,
    backgroundColor: '#343a40',
  },

  cardContent: {
    flex: 1,
    padding: 8,
    color: '#fff',
    borderColor: '#fff',
    borderBottomWidth: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: -12,
    opacity: 1,
  },
})
