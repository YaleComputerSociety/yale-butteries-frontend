import { StyleSheet } from 'react-native'

export const home = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#000',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 8,
  },

  textContent: {
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginLeft: 10,
  },

  menuView: {
    margin: 8,
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
    fontSize: 22,
    marginBottom: 25,
    marginTop: 10,
  },

  cardText2: {
    fontFamily: 'Roboto-Italic',
    marginBottom: 10,
  },

  card: {
    flex: 1,
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowRadius: 2,
    marginVertical: 5,
  },

  cardContent: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    opacity: 1,
  },
})
