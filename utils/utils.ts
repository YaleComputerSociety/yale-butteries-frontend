const production = 'https://yale-butteries.herokuapp.com/'
// The manifest.debuggerHost part crashes the app if you build the app. PLEASE do not delete this comment there aren't any error logs when the build crashes and it took me more than 15 hours to find this
// const development = `http://${manifest.debuggerHost.split(':').shift()}:3000/`

// for testing on anything other than your computer, you'll need to change this value to be your computer's IP address
// Mac: type { ipconfig getifaddr en0 || ipconfig getifaddr en1 } into the command line
// Windows: type { ipconfig | findstr /i "IPv4 Address" } into the command line
// please change this value back to localhost when you push your code, as everyone's IP addresses are different
const ipAddress = '10.74.218.131'

const development = `http://${ipAddress}:3000/`

const STRIPE_PK_DEV =
  'pk_test_51KktoIEL7XDhq084xLTTSGjXxq0QvtgZjrO2KEsvCljPzyxLQBHtglGAztvY58WNDOeSxNconUi9svfk6Eyqdnig00pEpQCANG'
const STRIPE_PK_PROD =
  'pk_live_51KktoIEL7XDhq084Ov4Wek0XNXMwXWcLWkmt29SB6f7eR2FajUImexxPOXcbEBXlZ2su0lUE4hl3XXRzDlU05w0300nWSuEMoy'

export const baseUrl = __DEV__ ? development : production
export const stripePK = __DEV__ ? STRIPE_PK_DEV : STRIPE_PK_PROD
