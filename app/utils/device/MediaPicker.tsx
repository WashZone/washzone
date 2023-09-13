// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid, Platform } from "react-native"
import { ImageLibraryOptions, MediaType, PhotoQuality } from "react-native-image-picker"
const ImagePicker = require("react-native-image-picker")

export const Capture = async () => {
  const options = {
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  }
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: "App Camera Permission",
      message: "App needs access to your camera ",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    })
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let image: any
      await ImagePicker.launchCamera(options, (res) => {
        image = res?.assets?.[0]
      })
      return image
    } else {
      return undefined
    }
  } else {
    let image: any
    await ImagePicker.launchCamera(options, (res) => {
      image = res?.assets?.[0]
    })
    return image
  }
}

export const MediaPicker = async ({
  selectionLimit = 1,
  mediaType = "photo",
  maxWidth = 1280,
  maxHeight = 720,
  quality = 0.8,
}: {
  selectionLimit?: number
  mediaType?: MediaType
  maxWidth?: number
  maxHeight?: number
  quality?: PhotoQuality
}) => {
  const options: ImageLibraryOptions = {
    mediaType,
    selectionLimit: selectionLimit || 1,
    maxWidth,
    maxHeight,
    quality,
  }

  let image: any

  await ImagePicker.launchImageLibrary(
    options,
    (response: { didCancel: any; errorMessage: any; assets: any[] }) => {
      if (response.errorMessage) return undefined
      if (!response.didCancel && !response?.errorMessage && response?.assets) {
        image = selectionLimit > 1 ? response?.assets : response?.assets?.[0]
      }
    },
  )

  return image
}
