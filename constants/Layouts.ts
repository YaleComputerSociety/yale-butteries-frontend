import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

// input the figma width/height to get your screens width/height

export const LAYOUTS = {
  window: {
    width,
    height,
  },
  // get width scales the size of elements based on screen dimensions
  // we choose width / 375 as 375 is the width of the iphone8 which we'll use as default
  getWidth: (input: number): number => {
    return (input * width) / 375
  },
}
