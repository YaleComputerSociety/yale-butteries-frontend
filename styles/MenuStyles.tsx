import { StyleSheet } from 'react-native'

export const menu = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },

  upperContainer: {
    flex: 13,
  },

  lowerContainer: {
    width: '100%',
    height: '18%',
    backgroundColor: '#fff',
  },
})

export const item = StyleSheet.create({
  card: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 0.5,
    shadowRadius: 2,
  },

  leftSide: {
    //backgroundColor: 'red',
    flex: 6,
    marginRight: 8,
  },

  itemName: {
    fontFamily: 'HindSiliguri-Bold',
    color: '#222',
    fontSize: 18,
    //backgroundColor: 'green',
  },

  itemDescription: {
    fontFamily: 'Roboto-Italic',
    color: '#777',
    fontSize: 11,
    flex: 2,
    marginRight: 10,
  },

  itemPrice: {
    color: '#222',
    fontSize: 15,
    //backgroundColor: 'blue'
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 0,
    height: 30,
    alignItems: 'center',
    width: 30,
  },

  buttonText: {
    justifyContent: 'center',
    fontFamily: 'Roboto',
    alignItems: 'center',
    fontSize: 25,
    textAlignVertical: 'center',
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
    backgroundColor: '#fff',
  },

  upperContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  lowerContainer: {
    flexDirection: 'row',
    flex: 2,
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
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    height: 100,
    width: '100%',
    position: 'absolute',
  },
})
