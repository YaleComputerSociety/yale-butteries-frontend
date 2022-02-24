import { StyleSheet } from 'react-native';


export const item = StyleSheet.create({
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
    margin: 4,
    marginVertical: 8,
  },

  leftSide: {
    flex: 6,
  },

  itemName: {
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: 'bold',
    color: '#222',
    fontSize: 20,
    marginBottom: 5,
  },

  itemDescription: {
    //backgroundColor:'red',
    fontFamily: 'Roboto-Italic',
    color: '#777',
    fontSize: 8,
    flex: 2,
    marginRight: 10,
  },

  itemPrice: {
    fontFamily: 'HindSiliguri',
    fontWeight: 'bold',
    color: '#222',
    fontSize: 18,
    //backgroundColor: 'blue'
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
   // flex:1,
    fontFamily: 'Roboto',
    fontSize: 30,
   // backgroundColor:'blue',
  },

  countText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
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
  },

  outerContainer: {
    flex: 2,
    backgroundColor: '#fff'
  },

  upperContainer: {
    flex: 0.75,
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  lowerContainer: {
    flexDirection: 'row',
    flex: 1.25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  priceText: {
    fontFamily: 'HindSiliguri',
    color: '#000',
    fontSize: 18,
    padding: 10,
  },

  checkoutText: {
    fontFamily: 'HindSiliguri-Bold',
    color: '#fff',
    fontSize: 25,
  },
})

export const checkout = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: 'column',
    height: 100,
    width: '100%',
    position: 'absolute',
  }
})