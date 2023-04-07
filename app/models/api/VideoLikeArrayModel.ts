import { Instance } from "mobx-state-tree"
import { VideoLikeArrayModelBase } from "./VideoLikeArrayModel.base"

/* The TypeScript type of an instance of VideoLikeArrayModel */
export interface VideoLikeArrayModelType extends Instance<typeof VideoLikeArrayModel.Type> {}

/* A graphql query fragment builders for VideoLikeArrayModel */
export { selectFromVideoLikeArray, videoLikeArrayModelPrimitives, VideoLikeArrayModelSelector } from "./VideoLikeArrayModel.base"

/**
 * VideoLikeArrayModel
 */
export const VideoLikeArrayModel = VideoLikeArrayModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
