import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  app: {
    flex:1,
    backgroundColor: '#F0F0F0',
  },

  container:{
    width:100,
    height: 100
  },

  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 12,
  },

  butteryIcon: {
    width: 75,
    height: 75,
    margin: 15,
    marginRight: 0,
  },

  textContent: {
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginLeft: 10,
  },

  cardText1: {
    fontFamily: 'Nunito-Regular',
    textAlignVertical: 'bottom',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 22, 
    marginBottom: 25,   
  },

  cardText2: {
    fontStyle: 'italic'
  },

  card: {
    flex: 1,
    height: 100,
    elevation: 3,
    shadowOffset: { width: 1, height: 1},
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOpacity: 0.2,
    borderRadius: 6,
    shadowRadius: 1,
    marginVertical: 10,
    opacity: 1,
    alignContent: 'space-between',
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
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    marginVertical: 0,
    opacity: 1,
  },

  menuView: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'},
  },
);