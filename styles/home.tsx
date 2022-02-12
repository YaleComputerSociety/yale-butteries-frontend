import { StyleSheet } from 'react-native';

export const cardStyles = StyleSheet.create({
  cardText1: {
    marginBottom: 0,
    margin: 10,
    fontFamily: 'Nunito',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },

  cardText2: {
    margin: 10,
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 14,
  },

  card: {
    borderRadius: 6,
    marginHorizontal: 15,
    marginVertical: 15,
    opacity: 1,
  },

  cardOpen: {
    backgroundColor: '#fff',
    elevation: 3,
    shadowOffset: { width: 0, height: 0},
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  cardClosed: {
    backgroundColor: '#ccc',
    opacity: 0.5,
  },

  cardContent: {
    marginHorizontal: 0,
    marginVertical: 0,
    opacity: 1,
  },
})

export const homeStyles = StyleSheet.create({
  app: {
    flex:1,
    backgroundColor: '#EEF2FF',
  },

  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },

  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  butteryIcon: {
    width: 150,
    height: 150,
    margin: 10,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },



  menuView: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'},
  }

);