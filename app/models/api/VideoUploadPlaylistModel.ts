import { Instance } from "mobx-state-tree"
import { VideoUploadPlaylistModelBase } from "./VideoUploadPlaylistModel.base"

/* The TypeScript type of an instance of VideoUploadPlaylistModel */
export interface VideoUploadPlaylistModelType extends Instance<typeof VideoUploadPlaylistModel.Type> {}

/* A graphql query fragment builders for VideoUploadPlaylistModel */
export { selectFromVideoUploadPlaylist, videoUploadPlaylistModelPrimitives, VideoUploadPlaylistModelSelector } from "./VideoUploadPlaylistModel.base"

/**
 * VideoUploadPlaylistModel
 */
export const VideoUploadPlaylistModel = VideoUploadPlaylistModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
