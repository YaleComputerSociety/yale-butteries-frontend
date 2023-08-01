import { StyleSheet } from 'react-native'

export const menu = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAF9F6',
  },

  upperContainer: {
    flex: 13,
  },

  lowerContainer: {
    width: '100%',
    height: '30%',
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
  },

  iconContainer: {
    width: '100%',
    height: 120,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  icon: {
    marginVertical: 20,
    marginHorizontal: 25,
    width: 80,
    height: 80,
    ///backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },

  text: {
    fontSize: 14,
    fontFamily: 'HindSiliguri-Bold',
    color: '#fff',
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
    backgroundColor: '#FAF9F6',
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
    fontSize: 16,
    //backgroundColor: 'green',
  },

  itemDescription: {
    fontFamily: 'Roboto-Italic',
    color: '#777',
    fontSize: 12,
    flex: 2,
    marginRight: 10,
  },

  itemPrice: {
    color: '#222',
    fontSize: 14,
    //backgroundColor: 'blue'
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    alignItems: 'center',
    width: 150,
  },

  buttonText: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontFamily: 'HindSiliguri-Bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    textAlignVertical: 'center',
  },

  itemCountText: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    fontFamily: 'HindSiliguri-Bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    textAlignVertical: 'center',
  },

  countText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
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
    backgroundColor: '#333',
    borderRadius: 10,
  },

  upperContainer: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#444',
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
    fontSize: 16,
    padding: 10,
  },

  checkoutText: {
    fontFamily: 'HindSiliguri-Bold',
    color: '#fff',
    fontSize: 16,
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
