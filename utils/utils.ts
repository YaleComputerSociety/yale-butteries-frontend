import Constants from 'expo-constants'

// eslint-disable-next-line import/no-unresolved
import { STRIPE_PK_DEV, STRIPE_PK_PROD } from '@env'

const { manifest } = Constants

const production = 'https://yale-butteries.herokuapp.com/'
const development = `http://${manifest.debuggerHost.split(':').shift()}:3000/`

export const baseUrl = __DEV__ ? development : production
export const stripePK = __DEV__ ? STRIPE_PK_DEV : STRIPE_PK_PROD
