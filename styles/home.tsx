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

  menuView: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
})

export const cardStyles = StyleSheet.create({
  cardText1: {
    fontFamily: 'Nunito-Regular',
    textAlignVertical: 'bottom',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 22,
    marginBottom: 25,  
    marginTop: 15, 
  },

  cardText2: {
    fontStyle: 'italic'
  },

  card: {
    flex: 1,
    height: 100,
    elevation: 3,
    shadowOffset: { width: 0, height: 1},
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOpacity: 0.5,
    borderRadius: 6,
    shadowRadius: 2,
    marginVertical: 10,
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
    //backgroundColor: '#ccc',
    //opacity: 1,
  },
  
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    paddingLeft:10,
    opacity: 1,
  },
})