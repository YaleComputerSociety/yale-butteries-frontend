import { StyleSheet } from 'react-native'

export const home = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#121212',
  },

  nameText: {
    fontSize: 25,
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },

  outerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignContent: 'center',
    marginBottom: 10,
  },

  textContent: {
    marginLeft: 10,
    margin: 5,
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
    borderColor: '#1f1f1f',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 10,
    alignContent: 'center',
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
    color: 'rgba(255,255,255, 0.87)',
    fontSize: 20,
    alignContent: 'center',
    justifyContent: 'flex-start',
  },

  cardText2: {
    fontFamily: 'Roboto-Italic',
    color: 'rgba(255,255,255, 0.68)',
    fontSize: 15,
  },

  dayText: {
    fontFamily: 'HindSiliguri',
    fontStyle: 'normal',
    fontWeight: '100',
    color: 'rgba(255,255,255, 0.87)',
    marginTop: 5,
  },

  card: {
    flex: 1,
    backgroundColor: '#343a40',
  },

  cardContent: {
    flex: 1,
    paddingRight: 0,
    padding: 5,
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 1,
  },

  dayActive: {
    fontFamily: 'HindSiliguri',
    color: 'rgba(255,255,255, 0.87)',
    marginTop: 5,
  },

  dayInactive: {
    fontFamily: 'HindSiliguri',
    fontStyle: 'normal',
    color: 'rgba(255,255,255, 0.2)',
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
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginLeft: 8,
    borderRadius: 6,
  },
})
