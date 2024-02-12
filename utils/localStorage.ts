import AsyncStorage from '@react-native-async-storage/async-storage'

export const getUserInfo = async (param: string): Promise<string | null | undefined> => {
  try {
    const savedData = await AsyncStorage.getItem(param)
    return savedData
  } catch (e) {
    console.log(e)
  }
}

export const storeUserInfo = async (values: Array<[string, string]>): Promise<void> => {
  try {
    await AsyncStorage.multiSet(values)
  } catch (e) {
    console.log(e)
  }
}

export const removeUserInfo = async (values: string[]): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(values)
  } catch (e) {
    console.log(e)
  }
}

export const clearAsyncStorage = async (): Promise<void> => {
  AsyncStorage.clear().catch(console.error)
}
