import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  app: {
    flex:1,
    backgroundColor: '#eaeaea',//'#343a40',
  },

  container:{
    width: 100,
    height: 100,
  },

  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 12,
  },

  textContent: {
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginLeft: 10,
  },

  menuView: { 
    display: 'flex',
    alignItems: 'stretch', 
    justifyContent: 'center',
  },
})

export const cardStyles = StyleSheet.create({
  cardText1: {
    textAlignVertical: 'bottom',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 22,
    marginBottom: 25,  
    marginTop: 15, 
  },

  cardText2: {
    fontFamily: 'Roboto-Italic',
    fontStyle: 'italic'
  },

  card: {
    flex: 1,
    height: 95,
    elevation: 3, 
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowRadius: 2,
    marginVertical: 8,
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
    marginLeft: 10,
    justifyContent: 'space-between',
    paddingLeft:10,
    opacity: 1,
  },

  butteryIcon: {
    width: 75,
    height: 75,
    marginVertical: 12,
    marginRight: 10,

  },
})

export const itemStyles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 120,
    elevation: 3, 
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowRadius: 2,
    margin: 12,
    marginBottom: 0,
  },

  leftSide: {
    flex: 6,
  },

  itemName: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#222',
    fontSize: 20,
    marginBottom: 5,
  },

  itemDescription: {
    fontFamily: 'Roboto-Italic',
    color: '#777',
    fontSize: 12,
    flex: 2,
    lineHeight: 12,
    paddingRight: 10,
  },

  itemPrice: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#222',
    fontSize: 20,
  },

  button: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    height: '38%',
    width: '10%',
  },

  buttonText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
  },

  countText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },

  spacer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonSpacer: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  }

})
