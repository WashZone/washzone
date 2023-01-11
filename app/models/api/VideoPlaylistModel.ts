import { Instance } from "mobx-state-tree"
import { VideoPlaylistModelBase } from "./VideoPlaylistModel.base"

/* The TypeScript type of an instance of VideoPlaylistModel */
export interface VideoPlaylistModelType extends Instance<typeof VideoPlaylistModel.Type> {}

/* A graphql query fragment builders for VideoPlaylistModel */
export { selectFromVideoPlaylist, videoPlaylistModelPrimitives, VideoPlaylistModelSelector } from "./VideoPlaylistModel.base"

/**
 * VideoPlaylistModel
 */
export const VideoPlaylistModel = VideoPlaylistModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
