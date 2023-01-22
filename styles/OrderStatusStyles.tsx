import { StyleSheet } from 'react-native';

export const orderStatusBarSty = StyleSheet.create({

  orderStatusBarWrapper: {
    alignItems: "center", // ignore this - we'll come back to it
    justifyContent: "center", // ignore this - we'll come back to it
    flexDirection: "row",
		marginHorizontal: 15,
  },

	orderStatusBarStripe: {
		flex: 1,
    paddingTop: 7,
		paddingBottom: 7,
    borderRadius: 4,
		marginHorizontal: 2
	},

	orderStatusBarStripeActive: {
		backgroundColor: '#006400',
	},

	orderStatusBarStripePassive: {
		backgroundColor: '#D3D3D3',
	},

})

export const orderStatusScreenSty = StyleSheet.create({
	pageWrapper: {
		textAlign: 'center',
		flex: 1,
	},

	headerWrapper: {
		flex: 1
	},

	footerWrapper: {
		flex: 1.7
	},
	
	headerTextWrapper: {
		marginTop: 50,
		marginBottom: 40
	},

  headerText: {
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontSize: 26,
		textAlign: 'center',
  },

	stepsWrapper: {
		textAlign: 'left',
		marginTop: 20,
		marginBottom: 50
	},

	stepsText: {
    fontFamily: 'Roboto',
    fontSize: 20,
		paddingLeft: 40,
		textAlign: 'left',
		color: '#3f404d',
  },

	header: {
		justifyContent: 'center',
		alignItems: 'center',
	}

})