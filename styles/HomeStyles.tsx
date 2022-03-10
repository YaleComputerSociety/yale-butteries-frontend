import { StyleSheet } from 'react-native';

export const home = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#eaeaea',
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

export const card = StyleSheet.create({
  cardText1: {
    textAlignVertical: 'bottom',
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 22,
    marginBottom: 25,
    marginTop: 15, 
  },

  textContainer:{
    flex:1,
    //backgroundColor:'green',
  },

  cardText2: {
    fontFamily: 'Roboto-Italic',
    marginBottom: 15,
    //backgroundColor:'red',
  },

  card: {
    flex: 1,
    height: '100%',
    elevation: 3, 
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowRadius: 2,
    marginVertical: 8,
  },
  
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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
