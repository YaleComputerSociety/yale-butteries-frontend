import AsyncStorage from "@react-native-async-storage/async-storage"

export const getUserInfo = async (info) => {
  try {
    const savedData = await AsyncStorage.multiGet(info)
    if(savedData !== null) {
      return savedData
    }
  } catch(e) {
    console.log(e)
    return null
  }
}

export const storeUserInfo = async (values) => {
  try {
    await AsyncStorage.multiSet(values)
    console.log(values)
    console.log("Succesfully stored")
  } catch (e) {
    console.log(e)
  }
}

export const removeUserInfo = async (values) => {
  try {
    await AsyncStorage.multiRemove(values)
    console.log("Successfully removed")
  } catch (e) {
    console.log(e)
  }

}