// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid, Platform } from "react-native"
import { ImageLibraryOptions } from "react-native-image-picker"
const ImagePicker = require("react-native-image-picker")

export const Capture = async () => {
  console.log("CAPTURING")
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
      console.log("Camera permission given")
      let image: any
      await ImagePicker.launchCamera(options, (res) => {
        console.log("CATURED IMAGE", res?.assets?.[0])
        image = res?.assets?.[0]
      })
      return image
    } else {
      console.log("Camera permission denied")
      return undefined
    }
  } else {
    console.log("Camera permission given")
    let image: any
    await ImagePicker.launchCamera(options, (res) => {
      console.log("CATURED IMAGE", res?.assets?.[0])
      image = res?.assets?.[0]
    })
    return image
  }
}

export const MediaPicker = async (props?: { selectionLimit?: number }) => {
  const options: ImageLibraryOptions = {
    mediaType: "photo",
    selectionLimit: props?.selectionLimit || 1,
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 1,
  }

  let image: any
  await ImagePicker.launchImageLibrary(
    options,
    (response: { didCancel: any; errorMessage: any; assets: any[] }) => {
      console.log("Response = ", response)
      if (response.errorMessage) return undefined
      if (response.didCancel) {
        console.log("User cancelled image picker")
      } else if (response?.errorMessage) {
        console.log("ImagePicker Error: ", response?.errorMessage)
      } else if (response?.assets) {
        console.log("response", JSON.stringify(response?.assets?.[0]))
        image = props?.selectionLimit ? response?.assets : response?.assets?.[0]
      }
    },
  )
  console.log(image)
  return image
}
