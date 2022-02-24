import { StyleSheet } from 'react-native';


export const checkout = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#eee',
  },

  upperContainer: {
    flex: 8,
  },

  itemList: {
    flex: 1.75,
    margin: 20,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },

  scrollStyle: {
    padding: 15,
  },

  orderDetailsContainer: {
    paddingHorizontal: 10,
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
    marginRight: -20,
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
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
    flex: 0.25,
    margin: 20,
    backgroundColor: 'blue',
  },

  checkoutButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  checkoutText: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 25,
    color: '#fff'
  },

  NAME: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //backgroundColor:'yellow'
  },

  COUNT: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'red'
  },

  PRICE: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor:'green',
    paddingLeft: '10%',
  }
})
