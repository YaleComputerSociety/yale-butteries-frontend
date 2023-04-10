import Constants from 'expo-constants'

const { manifest } = Constants

// this defines if we're in development (for now)
const dev = true

const production = 'https://radiant-beach-77007.herokuapp.com/'
const development = `http://${manifest.debuggerHost.split(':').shift()}:3000/`

export const baseUrl = dev ? development : production
console.log(baseUrl)
