import { Alert, Platform } from "react-native"
import { RNS3 } from "react-native-upload-aws-s3"
import { createThumbnail } from "react-native-create-thumbnail"
import { isRemoteUrl } from "../helpers"
import { FFmpegKit } from "ffmpeg-kit-react-native"
import fs from "react-native-fs"

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
    Alert.alert("Failed to generate thumbnail.")
    console.warn(e)
    return null
  }
}

export async function uploadFile(inFile: any) {
  console.log("the file that i picked", inFile)
 

  const file = {
    uri: inFile?.uri,
    name: inFile?.name,
    type: inFile?.type,
  }

  const generateRandomString = (isExtension?: boolean) => {
    const d = new Date()
    if (isExtension) {
      return (
        d.getFullYear() +
        "-" +
        d.getMonth() +
        "-" +
        d.getDate() +
        "-" +
        Math.floor(Math.random() * 1000000) +
        ".mp4"
      )
    }
    return (
      d.getFullYear() +
      "-" +
      d.getMonth() +
      "-" +
      d.getDate() +
      "-" +
      Math.floor(Math.random() * 1000000)
    )
  }

  const dirs = fs.CachesDirectoryPath
  const compressfilename = generateRandomString(true)
  let dirAndroid: any
  if (Platform.OS == "android") {
    const destPath = `${fs.TemporaryDirectoryPath}/${inFile?.name}`

    console.log("ANDROID PICKED CACHE LOCATION", destPath)

     dirAndroid = "file://" + destPath
    await fs.copyFile(inFile?.uri, destPath)
    await fs.stat(destPath)
  }
  const file_path = dirs + "/" + compressfilename

  const uploadUri =
    Platform.OS === "ios"
      ? inFile?.uri.replace("file://", "")
      : Platform.OS == "android"
      ? dirAndroid
      : inFile?.uri
  const trimming = `-i ${uploadUri} -ss 00 -t 10 -y ${file_path}`

  // Create an object with trimmed video details
  const trimmedVideo = {
    uri: file_path, // The trimmed video's URI
    name: compressfilename, // The trimmed video's name
    type: "video/mp4", // Assuming it's a video
  }
  const isVideo: boolean = trimmedVideo?.type.includes("video") || false
  // Log the trimmed video object
  console.log("Trimmed Video:", trimmedVideo)

  FFmpegKit.execute(trimming)
    .then(async (result) => {
      if (result) {
        // Continue with the upload process
        // ...

        console.log("RESSSSSSSSSSSSS", result)
        // Upload the trimmed video to Firebase Storage
      } else {
        console.log("FFmpeg trimming ERROR:", result)
      }
    })
    .catch((error) => {
      console.log("FFmpeg error:", error)
    })

  const uploads: { type: string; url?: string; thumbnailUrl?: string } = { type: file.type }

  if (isVideo) {
    if (isRemoteUrl(file.uri)) {
      return {
        type: file.type,
        url: file.uri,
        thumbnailUrl: inFile.thumbnailUrl,
      }
    }
    try {
      console.log("file.uri", file.uri)
      const thumbnail = await generateThumbnail(file.uri)
      console.log("thumbnail ", thumbnail)
      const resThumb = await RNS3.put(
        {
          uri: thumbnail,
          name: thumbnail.split("/").pop() + Date.now(),
          type: "image/png"
        },
        options,
      )

      if (resThumb.status === 201) {
        uploads.thumbnailUrl = resThumb.body.postResponse.location
      } else {
        Alert.alert("Failed to upload video thumbnail")
      }
    } catch (err) {
      console.log("error", err)
      Alert.alert("Failed to process video.")
    }
  } else {
    if (isRemoteUrl(file.uri)) {
      return {
        type: file.type,
        url: file.uri,
      }
    }
  }

  try {
    const response = await RNS3.put(trimmedVideo, options)
    console.log("Fileee", file) //the file object that has to be uploaded
    if (response.status === 201) {
      uploads.url = response.body.postResponse.location
    } else {
      Alert.alert("Failed to upload image")
    }
  } catch (error) {
    Alert.alert(error)
  }
  console.log("UPLOAD ----------------->: ", uploads) //we get this in return when we upload any file

  return uploads
}
