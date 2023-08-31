import { StyleSheet } from 'react-native'

export const menu = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#121212',
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
    backgroundColor: '#1f1f1f',
    margin: 10,
    marginBottom: 0,
    borderRadius: 8,
    shadowRadius: 2,
  },

  leftSide: {
    //backgroundColor: 'red',
    flex: 6,
    marginRight: 8,
  },

  itemName: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 16,
    color: 'rgba(255,255,255, 0.87)',
    //backgroundColor: 'green',
  },

  itemDescription: {
    fontFamily: 'HindSiliguri',
    color: 'rgba(255,255,255, 0.68)',
    fontSize: 12,
    flex: 2,
    marginRight: 10,
  },

  itemPrice: {
    fontSize: 15,
    fontFamily: 'Roboto-Italic',
    color: 'rgba(255,255,255, 0.87)',
    //backgroundColor: 'blue'
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 30,
    height: 30,
  },

  addrem: {
    marginLeft: 1,
  },

  buttonText: {
    fontFamily: 'HindSiliguri-Bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
    textAlignVertical: 'center',
  },

  itemCountText: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontFamily: 'HindSiliguri-Bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
    textAlignVertical: 'center',
    color: 'rgba(255,255,255, 0.87)',
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
    color: '#fff',
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
