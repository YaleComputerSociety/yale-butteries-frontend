import { StyleSheet } from 'react-native'

export const checkout = StyleSheet.create({
  wrapper: {
    flex: 2,
  },

  upperContainer: {
    flex: 7,
    margin: 20,
    padding: 0,
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  orderDetailsContainer: {
    paddingHorizontal: 20,
  },

  itemNameText: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 16,
  },

  totalText: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 18,
  },

  text: {
    fontFamily: 'HindSiliguri',
    fontSize: 18,
  },

  orderList: {
    padding: 10,
  },

  icon: {
    justifyContent: 'center',
  },

  item: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    height: 50,
    backgroundColor: '#ddd',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingRight: 10,
  },

  header: {
    height: '8%',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderBottomWidth: 1,
    borderColor: '#bbb',
  },

  footer: {
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    backgroundColor: '#ddd',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopWidth: 1,
    borderColor: '#bbb',
  },

  lowerContainer: {
    backgroundColor: '#fff',
    height: '12%',
  },

  checkoutButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkoutText: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 25,
    color: '#fff',
  },

  paymentInformation: {
    color: '#888',
    fontSize: 11,
    top: -5,
    fontFamily: 'Roboto-Italic',
  },

  NAME: {
    flex: 2,
    alignContent: 'flex-start',
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    //backgroundColor: 'yellow',
  },

  COUNT: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  PRICE: {
    //backgroundColor: 'white',
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: '10%',
  },

  deleteContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: 'red',
    borderBottomColor: '#ccc',
    width: 75,
  },
  
  deleteContainerText: {
    fontFamily: 'HindSiliguri-Bold',
    color: '#fff'
  },
})
