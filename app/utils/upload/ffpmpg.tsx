const MediaPicker = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      mediaType: "mixed",
      // mediaType: "video",
      maxWidth: 1080,
      maxHeight: 1350,
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const selected = response.assets[0];
        console.log("selected---->", selected);
        const type = selected.type;
        const value = type.split("/");
        setProfileTypeDB(value[0]);
        const uri = response.assets[0]?.uri;
        console.log("uri-->", uri);
        // toggleModal();
        setUploadState(true);
        // const { uri } = source;
        // const filename = uri.substring(uri.lastIndexOf("/") + 1);

        // const uploadUri = uri;
        const mySelectImage = selected.fileName;
        console.log("mysSelectImage-->", mySelectImage);
        //  videoUrlCopy(uri, fileName) {

        // return destPath;
        // }

        // setTransferred(0);
        // const reference = storage().ref(mySelectImage);

        const dirs = fs.CachesDirectoryPath;

        console.log("dirs--->", dirs);

        const compressfilename = generateRandomString(true);
        // const compress_path = dirs + "/" + compressfilename;
        console.log("compressfilename-->", compressfilename);

        ///for Android only
        let dirAndroid: any;
        if (Platform.OS == "android" && value[0] == "video") {
          const destPath = `${fs.TemporaryDirectoryPath}/${mySelectImage}`;
          dirAndroid = "file://" + destPath;
          await fs.copyFile(uri, destPath);
          await fs.stat(destPath);
        }
        console.log("dirAndroid-->", dirAndroid);
        // const path = await copyVideo(uri, mySelectImage);
        // console.log("path-->", path);
        const file_path = dirs + "/" + compressfilename;
        const reference = storage().ref(
          value[0] == "image" ? mySelectImage : compressfilename
        );
        const uploadUri =
          Platform.OS === "ios"
            ? uri.replace("file://", "")
            : value[0] == "video" && Platform.OS == "android"
            ? dirAndroid
            : uri;
        console.log("upload uri--->", uploadUri);
        // const uploadUri =
        //   Platform.OS === "ios" ? uri.replace("file://", "") : uri;
        const task = reference.putFile(
          value[0] === "image" ? uploadUri : file_path
        );
        // console.log("Task--->", task);
        // const trimming = `-i ${uploadUri} -ss 0 -t 05 -c copy ${file_path}`;
        const trimming = `-i ${uploadUri} -ss 00 -t 10 -y ${file_path}`;
        // const trimming = `-ss 00:00:00 -i ${uploadUri} -t 00:00:05 -c copy ${file_path}`;
        FFmpegKit.execute(trimming)
          .then(async (result) => {
            const returnCode = await result.getOutput();
            if (result) {
              task.on(
                "state_changed",
                (snapshot) => {
                  const progress = Math.round(
                    snapshot.bytesTransferred / snapshot.totalBytes
                  );
                  // setProgresspercent(progress);
                  uploadProgress = progress.toFixed(1);
                  // uploadProgress = progress;
                },
                (error) => {
                  console.log("error--->", error);
                  alert("Please upload a valid image/video");
                  // toggleModal();
                  setUploadState(false);
                },
                () => {
                  reference.getDownloadURL().then((downloadURL) => {
                    console.log("downloadURL=", downloadURL);
                    setprofileUrl(downloadURL);
                    setImgUrl(downloadURL);
                    // firebase()
                    //   .collection("Users")
                    usersRefCollection
                      .doc(myId)
                      .update({
                        // profileUrl: `data:image/png;base64,` + res,
                        // imageUrl: `data:image/png;base64,` + res,
                        profileType: value[0] == "image" ? "image" : "video",
                        profileUrl: downloadURL,
                        imageUrl: downloadURL,
                      })
                      .then(() => {
                        // Alert.alert("Photo ", "Your photo has been uploaded", [
                        //   {
                        //     text: "Confirm",
                        //     // onPress: () => toggleModal(),
                        //   },
                        // ]);
                        // setModalVisible(false);
                      });
                    if (value[0] == "video") {
                      createThumbnail({
                        url: uploadUri,
                        timeStamp: 2000,
                      })
                        .then((response) => {
                          const ref1 = storage().ref(mySelectImage);
                          const res = ref1.putFile(response.path);
                          res.on(
                            "state_changed",
                            (snapshot) => {
                              const progress = Math.round(
                                snapshot.bytesTransferred / snapshot.totalBytes
                              );
                              // setProgresspercent(progress);
                              uploadProgress = progress.toFixed(1);
                              // uploadProgress = progress;
                            },
                            (error) => {
                              alert(
                                "Please upload a valid image/video createThumbnail"
                              );
                              // toggleModal();
                              setUploadState(false);
                            },

                            () => {
                              ref1.getDownloadURL().then((downloadURL) => {
                                console.log(
                                  "Video thumbnail on eidtProfile-->",
                                  downloadURL
                                );
                                setVideoThumbnail(downloadURL);
                                // firebase()
                                //   .collection("Users")
                                usersRefCollection
                                  .doc(myId)
                                  .update({
                                    videoThumbnail: downloadURL,
                                  })
                                  .then(() => {
                                    // alert("thumbnail is uploaded successfully");
                                  });
                                setUploadState(false);
                                setModalVisible(false);
                                getUserDateonserver();
                              });
                            }
                          );
                        })
                        .catch((err) => console.log("err--->", err));
                    }

                    // setprofileUrl(downloadURL)
                    setUploadState(false);
                    setModalVisible(false);
                    getUserDateonserver();
                  });
                }
              );
            } else {
              console.log("FFmpeg trimmingERROR : ", result);
              // this.saveInS3Bucket(file_path, type);
            }
          })
          .catch((error) => {
            console.log("RNFFmpeg>>>>error", error);
          });

        return selected;
      }
    });
  };



  ///////import { Alert, Platform } from "react-native"
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
  console.log("uploadFile", inFile)
  const isVideo: boolean = inFile?.type.includes("video") || false
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

  // const dirs = fs.CachesDirectoryPath
  // const compressfilename = generateRandomString(true)
  // let dirAndroid: any
  // if (Platform.OS == "android") {
  //   const destPath = `${fs.TemporaryDirectoryPath}/${inFile?.name}`
  //   dirAndroid = "file://" + destPath
  //   await fs.copyFile(inFile?.uri, destPath)
  //   await fs.stat(destPath)
  // }
  // const file_path = dirs + "/" + compressfilename

  // const uploadUri =
  //   Platform.OS === "ios"
  //     ? inFile?.uri.replace("file://", "")
  //     : Platform.OS == "android"
  //     ? dirAndroid
  //     : inFile?.uri
  // const trimming = `-i ${uploadUri} -ss 00 -t 10 -y ${file_path}`

  // FFmpegKit.execute(trimming)
  //   .then(async (result) => {
  //     if (result) {
  //       // Continue with the upload process
  //       // ...

        
  //       console.log("RESSSSSSSSSSSSS", result)
  //       // Upload the trimmed video to Firebase Storage
  //     } else {
  //       console.log("FFmpeg trimming ERROR:", result)
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("FFmpeg error:", error)
  //   })

  // const uploads: { type: string; url?: string; thumbnailUrl?: string } = { type: file.type }

  // if (isVideo) {
  //   if (isRemoteUrl(file.uri) && inFile.thumbnailUrl) {
  //     return {
  //       type: file.type,
  //       url: file.uri,
  //       thumbnailUrl: inFile.thumbnailUrl,
  //     }
  //   }
  //   try {
  //     console.log("file.uri", file.uri)
  //     const thumbnail = await generateThumbnail(file.uri)

  //     const resThumb = await RNS3.put(
  //       {
  //         uri: thumbnail,
  //         name: thumbnail.split("/").pop() + Date.now(),
  //         type: "image/png",
  //       },
  //       options,
  //     )

  //     if (resThumb.status === 201) {
  //       uploads.thumbnailUrl = resThumb.body.postResponse.location
  //     } else {
  //       Alert.alert("Failed to upload video thumbnail")
  //     }
  //   } catch (err) {
  //     console.log("error", err)
  //     Alert.alert("Failed to process video.")
  //   }
  // } else {
  //   if (isRemoteUrl(file.uri)) {
  //     return {
  //       type: file.type,
  //       url: file.uri,
  //     }
  //   }
  // }

  // try {
  //   const response = await RNS3.put(file, options)
  //   console.log("Fileee", file) //the file object that has to be uploaded
  //   if (response.status === 201) {
  //     uploads.url = response.body.postResponse.location
  //   } else {
  //     Alert.alert("Failed to upload image")
  //   }
  // } catch (error) {
  //   Alert.alert(error)
  // }
  // console.log("UPLOAD ----------------->: ", uploads) //we get this in return when we upload any file

  // return uploads
  const trimVideo = async (inputUri, outputUri) => {
    const trimming = `-i ${inputUri} -ss 00 -t 10 -y ${outputUri}`;
    try {
      await FFmpegKit.execute(trimming);
      console.log("outputUri",outputUri)
      return outputUri;
    } catch (error) {
      console.log('FFmpeg trimming error:', error);
      return null;
    }
  };

  // Generate a thumbnail for the video
  const generateVideoThumbnail = async (videoUri) => {
    // Use the appropriate library for generating video thumbnails
    const thumbnail = await generateThumbnail(videoUri);
    return thumbnail;
  };

   const dirs = fs.CachesDirectoryPath
  const compressfilename = generateRandomString(true)
  let dirAndroid: any
  if (Platform.OS == "android") {
    const destPath = `${fs.TemporaryDirectoryPath}/${inFile?.name}`
    dirAndroid = "file://" + destPath
    await fs.copyFile(inFile?.uri, destPath)
    await fs.stat(destPath)
  }
  const file_path = dirs + "/" + compressfilename
  // Trim the video
  const trimmedVideoPath = await trimVideo(file.uri, file_path);

  if (!trimmedVideoPath) {
    // Handle the error if trimming failed
    return null;
  }

  const uploads: any = { type: file.type };

  if (isVideo) {
    if (isRemoteUrl(file.uri) && inFile.thumbnailUrl) {
      return {
        type: file.type,
        url: file.uri,
        thumbnailUrl: inFile.thumbnailUrl,
      };
    }

    try {
      const thumbnail = await generateVideoThumbnail(trimmedVideoPath);

      const resThumb = await RNS3.put(
        {
          uri: thumbnail,
          name: thumbnail.split('/').pop() + Date.now(),
          type: 'image/png',
        },
        options
      );

      if (resThumb.status === 201) {
        uploads.thumbnailUrl = resThumb.body.postResponse.location;
      } else {
        Alert.alert('Failed to upload video thumbnail');
      }
    } catch (err) {
      console.log('Error generating video thumbnail:', err);
      Alert.alert('Failed to generate video thumbnail.');
    }
  } else {
    if (isRemoteUrl(file.uri)) {
      return {
        type: file.type,
        url: file.uri,
      };
    }
  }

  try {
    const response = await RNS3.put(file, options);
    if (response.status === 201) {
      uploads.url = response.body.postResponse.location;
    } else {
      Alert.alert('Failed to upload image');
    }
  } catch (error) {
    console.log('Error uploading file:', error);
    Alert.alert('Failed to upload file.');
  }

  return uploads;
}
