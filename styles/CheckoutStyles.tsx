import { StyleSheet } from 'react-native'

export const checkout = StyleSheet.create({
  outerContainer: { flex: 1 },
  wrapper: {
    flex: 2,
    backgroundColor: '#121212',
  },

  upperContainer: {
    flex: 7,
    margin: 20,
    marginBottom: 20,
    padding: 0,
    paddingHorizontal: 10,
    backgroundColor: '#1f1f1f',
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
    color: 'rgba(255,255,255,0.87)',
  },

  totalText: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 18,
    color: 'rgba(255,255,255,0.87)',
  },

  text: {
    fontFamily: 'HindSiliguri',
    fontSize: 16,
    color: 'rgba(255,255,255,0.68)',
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
    backgroundColor: '#1f1f1f',
    borderBottomColor: '#383838',
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
    backgroundColor: '#1f1f1f',
    borderBottomWidth: 1,
    borderColor: '#383838',
  },

  footer: {
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    backgroundColor: '#1f1f1f',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopWidth: 1,
    borderColor: '#383838',
  },

  foot: {
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#2c2c2c',
  },

  checkoutButton: {
    width: '65%',
    height: 55,
    borderRadius: 15,
    backgroundColor: '#2eb135',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    margin: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },

  checkoutText: {
    fontFamily: 'HindSiliguri-Bold',
    fontSize: 20,
    color: 'rgba(255,255,255,0.87)',
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
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    // backgroundColor: 'yellow',
  },

  COUNT: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  PRICE: {
    // backgroundColor: 'white',
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
    backgroundColor: '#ff4e4e',
    borderBottomColor: '#ccc',
    width: 85,
  },

  deleteContainerText: {
    fontFamily: 'HindSiliguri-Bold',
    color: 'rgba(255,255,255,0.87)',
    fontSize: 16,
  },
})
