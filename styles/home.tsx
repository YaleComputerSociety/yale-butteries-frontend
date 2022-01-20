import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  app: {
    backgroundColor: '#fff',
  },

  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 25,
  },

  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  butteryIcon: {
    width: 175,
    height: 150,
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
    shadowOffset: { width: 1, height: 1 },
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10,
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
    marginHorizontal: 5,
    marginVertical: 5,
    opacity: 1,
  },

  menuView: { 
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },

});