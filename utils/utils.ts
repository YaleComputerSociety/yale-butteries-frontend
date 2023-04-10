import Constants from 'expo-constants'

const { manifest } = Constants

const production = 'https://radiant-beach-77007.herokuapp.com/'
const development = `http://${manifest.debuggerHost.split(':').shift()}:3000/`

export const baseUrl = __DEV__ ? development : production
