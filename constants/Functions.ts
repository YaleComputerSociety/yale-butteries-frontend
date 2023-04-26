import * as FileSystem from 'expo-file-system'

export const FUNCTIONS = {
  //turn price int data into formatted data
  priceFormat: (price: number): string => {
    return '$' + String((price / 100).toFixed(2))
  },

  clearCache: async (): Promise<void> => {
    await FileSystem.deleteAsync(FileSystem.cacheDirectory + 'productImages/')
    const dir = FileSystem.cacheDirectory + 'productImages/'
    const dirInfo = await FileSystem.getInfoAsync(dir)
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true })
    }
  },

  timeFormat: (time: number): string => {
    if (time < 1200) {
      if (time < 100) {
        if (time % 100 < 10) {
          return '12:0' + String(time % 100) + ' AM'
        } else {
          return '12:' + String(time % 100) + ' AM'
        }
      } else {
        if (time % 100 < 10) {
          return String(Math.floor(time / 100)) + ':0' + String(time % 100) + ' AM'
        } else {
          return String(Math.floor(time / 100)) + ':' + String(time % 100) + ' AM'
        }
      }
    } else {
      if (time == 2400) {
        return '12:00 AM'
      }
      if (time < 1300) {
        if (time % 100 < 10) {
          return String(Math.floor(time / 100)) + ':0' + String(time % 100) + ' PM'
        } else {
          return String(Math.floor(time / 100)) + ':' + String(time % 100) + ' PM'
        }
      }
      if (time % 100 < 10) {
        return String(Math.floor(time / 100) - 12) + ':0' + String(time % 100) + ' PM'
      } else {
        return String(Math.floor(time / 100) - 12) + ':' + String(time % 100) + ' PM'
      }
    }
  },
}
