import Constants from 'expo-constants'

// eslint-disable-next-line import/no-unresolved
import { STRIPE_PK_DEV, STRIPE_PK_PROD } from '@env'

const { manifest } = Constants

const production = 'https://yale-butteries.herokuapp.com/'
// The manifest.debuggerHost part crashes the app if you build the app. PLEASE do not delete this comment there aren't any error logs when the build crashes and it took me more than 15 hours to find this
// const development = `http://${manifest.debuggerHost.split(':').shift()}:3000/`
const development = 'http://localhost:3000/'

export const baseUrl = __DEV__ ? development : production
export const stripePK = __DEV__ ? STRIPE_PK_DEV : STRIPE_PK_PROD
