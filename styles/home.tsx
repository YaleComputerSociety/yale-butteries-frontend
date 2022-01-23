import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  app: {
    flex:1,
    backgroundColor: '#FFF',
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
    width: 175,
    height: 150,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    backgroundColor: '#eee'
  },

  cardText1: {
    marginBottom: 0,
    margin: 10,
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
    elevation: 3,
    shadowOffset: { width: 0, height: 0},
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginHorizontal: 15,
    marginVertical: 15,
    opacity: 1,
  },

  //not in use
  darkCard: {
    borderRadius: 6,
    backgroundColor: 'black',
    opacity: 0.3,
    zIndex: 2,
    position: 'absolute',
  },

  cardContent: {
    marginHorizontal: 0,
    marginVertical: 0,
    opacity: 1,
  },

  menuView: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'},
  }

);