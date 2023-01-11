import { Instance } from "mobx-state-tree"
import { VideoUploadModelBase } from "./VideoUploadModel.base"

/* The TypeScript type of an instance of VideoUploadModel */
export interface VideoUploadModelType extends Instance<typeof VideoUploadModel.Type> {}

/* A graphql query fragment builders for VideoUploadModel */
export { selectFromVideoUpload, videoUploadModelPrimitives, VideoUploadModelSelector } from "./VideoUploadModel.base"

/**
 * VideoUploadModel
 */
export const VideoUploadModel = VideoUploadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
