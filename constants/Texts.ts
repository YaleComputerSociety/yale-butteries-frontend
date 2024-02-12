import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
export const TEXTS = {
  // every fontsize goes through this function
  // due to differing sizes this'll make life a billion times easier if we switch fonts
  adjust: (inputSize: number): number => {
    return inputSize * (width / 375)
  },
}
