import { StyleSheet } from 'react-native';

export const staffLogin = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    margin: 5,
    width: '50%',
    borderRadius: 5,
    paddingTop: 5,
    paddingLeft: 8,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  button: {
    backgroundColor: '#344a61',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 5,
    width: 180,
    alignItems: 'center',
  }


})