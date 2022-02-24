import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  app: {
    flex:1,
    backgroundColor: '#eaeaea',//'#343a40',
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
    margin: 8
  },

  footer: {
    width: '100%',
    height: '18%',
    backgroundColor: '#fff',
  }
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
