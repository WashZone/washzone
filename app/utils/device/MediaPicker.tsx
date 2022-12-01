import { ImageLibraryOptions } from "react-native-image-picker"
const ImagePicker = require("react-native-image-picker")

export const Capture = async() => {
  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  await ImagePicker.launchCamera(options, (res) => {
    console.log('Response = ', res);
    if (res.didCancel) {
      console.log('User cancelled image picker');
    } else if (res.error) {
      console.log('ImagePicker Error: ', res.error);
    } else if (res.customButton) {
      console.log('User tapped custom button: ', res.customButton);
      alert(res.customButton);
    } else {
      // const source = { uri: res.uri };
      console.log('response', JSON.stringify(res));
      // this.setState({
      //   filePath: res,
      //   fileData: res.data,
      //   fileUri: res.uri
      // });
    }
  });
}


export const MediaPicker = async () => {
  const options: ImageLibraryOptions = {
    mediaType: "mixed",
    selectionLimit: 1,
  }

  let image: any
  await ImagePicker.launchImageLibrary(
    options,
    (response: { didCancel: any; errorMessage: any; assets: any[] }) => {
      console.log("Response = ", response)
      if (response.didCancel) {
        console.log("User cancelled image picker")
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage)
      } else {
         image = response.assets[0]
        console.log("response", JSON.stringify(response.assets[0]))
      }
    },
  )
  console.log(image)
  return image
}
