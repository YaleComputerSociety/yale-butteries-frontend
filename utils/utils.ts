// eslint-disable-next-line import/no-unresolved
import { IOS_DEV_URL, ANDROID_DEV_URL } from '@env'
import { Platform } from 'react-native'

export const baseUrl = Platform.OS == 'ios' ? IOS_DEV_URL : ANDROID_DEV_URL
