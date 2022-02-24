import { StyleSheet } from 'react-native';

export const home = StyleSheet.create({
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

export const card = StyleSheet.create({
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
<<<<<<< HEAD

=======
>>>>>>> 17cf409c8b97fd2ba65b6fe9971dd2a473395ae4
  },
})
