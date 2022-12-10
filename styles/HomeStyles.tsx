import { StyleSheet } from 'react-native'

export const home = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f3f6f4',
  },

  name: {
    fontSize: 30,
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: 'bold',
    height: '3%',
    paddingLeft: 10,
    backgroundColor: '#eee',
    shadowColor: '#ddd',
    shadowOpacity: 2,
    shadowRadius: 10,
    shadowOffset: {
      width: 10,
      height: 20,
    },
    position: 'relative',
  },

  nameText: {
    fontSize: 25,
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: 'bold',
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
    marginTop: 2,
    marginBottom: 10,
    marginHorizontal: 6,
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
    fontSize: 20,
    marginBottom: 25,
    marginTop: 10,
  },

  cardText2: {
    fontFamily: 'Roboto-Italic',
    marginBottom: 0,
  },

  card: {
    flex: 1,
    elevation: 10,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 0.75,
    borderRadius: 8,
    shadowRadius: 5,
    shadowOpacity: 1,
    marginVertical: 3.5,
  },

  cardContent: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    opacity: 1,
  },
})
