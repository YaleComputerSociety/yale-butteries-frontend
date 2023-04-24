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
    borderColor: '#ddd',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 10,
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
    marginTop: 9,
    marginBottom: 5,
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
    padding: 5,
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 0.25,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 1,
  },

  dayActive: {
    fontFamily: 'HindSiliguri',
    fontStyle: 'normal',
    color: 'white',
    marginTop: 5,
  },

  dayInactive: {
    fontFamily: 'HindSiliguri',
    fontStyle: 'normal',
    color: 'white',
    opacity: 0.2,
    marginTop: 5,
  },

  dayContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  underlined: {
    textDecorationLine: 'underline',
  },

  banner: {
    alignSelf: 'center',
    color: 'white',
    paddingHorizontal: 8,
    marginLeft: 10,
    fontFamily: 'HindSiliguri-Bold',
  },
})
