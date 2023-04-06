import AsyncStorage from "@react-native-async-storage/async-storage"

export const getUserInfo = async (info) => {
  try {
    const savedData = await AsyncStorage.multiGet(info)
    if(savedData !== null) {
      //get customer's username
      //vcconsole.log(savedData)
      return savedData
    }
  } catch(e) {
    console.log(e)
    return null
  }
}

export const storeUserInfo = async (values) => {
  try {
    // stores customer's username
    await AsyncStorage.multiSet(values)
    console.log("Succesfully stored")
  } catch (e) {
    console.log(e)
  }
}