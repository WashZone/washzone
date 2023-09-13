import { Alert } from "react-native"
import { RNS3 } from "react-native-upload-aws-s3"
import { createThumbnail } from "react-native-create-thumbnail"

// TO be saved in secure storage
const options = {
  keyPrefix: "uploads/",
  bucket: "washzone-23",
  region: "us-west-2",
  accessKey: "AKIAY5ERXJV45W2GS2H2",
  secretKey: "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",
  successActionStatus: 201,
}

export const generateThumbnail = async (videoPath: string, time = 200) => {
  try {
    const { path } = await createThumbnail({
      url: videoPath,
      timeStamp: time,
    })

    return path
  } catch (e) {
    console.warn(e)
    return null
  }
}

export async function uploadFile(inFile: any) {
  const isVideo: boolean = inFile?.type.includes("video") || false
  const file = {
    uri: inFile?.uri,
    name: inFile?.name,
    type: inFile?.type,
  }

  const uploads: { type: string; url?: string; thumbnailUrl?: string } = { type: file.type }

  if (isVideo) {
    try {
      console.log("file.uri", file.uri)
      const thumbnail = await generateThumbnail(file.uri)

      const resThumb = await RNS3.put(
        {
          uri: thumbnail,
          name: thumbnail.split("/").pop() + Date.now(),
          type: "image",
        },
        options,
      )

      if (resThumb.status === 201) {
        uploads.thumbnailUrl = resThumb.body.postResponse.location
      } else {
        Alert.alert("Failed to upload video thumbnail")
      }
    } catch (err) {
      Alert.alert("Failed to process video.")
    }
  }

  try {
    const response = await RNS3.put(file, options)
    if (response.status === 201) {
      uploads.url = response.body.postResponse.location
    } else {
      Alert.alert("Failed to upload image")
    }
  } catch (error) {
    Alert.alert(error)
  }
  console.log("UPLOAD : ", uploads)

  return uploads
}
