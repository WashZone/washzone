import { RNS3 } from 'react-native-upload-aws-s3';


export async function uploadFile(inFile:any){
    const file = {
        uri: inFile?.uri,
        name: inFile?.fileName,
        type: inFile?.type
      }
      const options = {
    keyPrefix: "uploads/",
    bucket: "washzone-23",
    region: "us-west-2",
    accessKey: "AKIAY5ERXJV4ZHSJQWFL",
    secretKey: "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",
    successActionStatus: 201
  }
 
  try{
    const response = await RNS3.put(file, options)
    if (response.status === 201){
      console.log("Success: ", response.body)
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    } else {
      console.log("Failed to upload image to S3: ", response)
    }
  } catch(error){
    console.log(error)
  }
}