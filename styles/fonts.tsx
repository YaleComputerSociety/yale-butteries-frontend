import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'Nunito' : require('../assets/fonts/Nunito-Regular.ttf'),
});

