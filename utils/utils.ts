import Constants from 'expo-constants'

const { manifest } = Constants

export const baseUrl = `http://${manifest.debuggerHost.split(':').shift()}:3000/`
// there needs to be a comment here for some peoples' baseUrls to work. Don't ask why
