import { StyleSheet } from 'react-native';


export const checkout = StyleSheet.create({
  wrapper: {
    flex: 2,
  },

  upperContainer: {
    flex: 7,
    margin: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },

  orderDetailsContainer: {
    paddingHorizontal: 20,
  },

  itemNameText: {
    fontFamily: 'Roboto',
    fontSize: 18,
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

  item: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
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
    backgroundColor: 'green',
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

  NAME: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor:'yellow'
  },

  COUNT: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  PRICE: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: '10%',
  },
})
