import { ImageLibraryOptions } from "react-native-image-picker"
const ImagePicker = require("react-native-image-picker")

export const Capture = async () => {
  const options = {
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  }
  let image: any
  await ImagePicker.launchCamera(options, (res) => {
    console.log("CATURED IMAGE", res?.assets?.[0])
    image = res?.assets?.[0]
  })
  return image

}

export const MediaPicker = async () => {
  const options: ImageLibraryOptions = {
    mediaType: "photo",
    selectionLimit: 1,
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
        image = response?.assets?.[0]
      }
    },
  )
  console.log(image)
  return image
}
