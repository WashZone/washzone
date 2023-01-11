/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { VideoUploadModel, VideoUploadModelType } from "./VideoUploadModel"
import { VideoUploadModelSelector } from "./VideoUploadModel.base"
import { RootStoreType } from "./index"


/**
 * VideoUploadPlaylistBase
 * auto generated base class for the model VideoUploadPlaylistModel.
 */
export const VideoUploadPlaylistModelBase = ModelBase
  .named('VideoUploadPlaylist')
  .props({
    __typename: types.optional(types.literal("VideoUploadPlaylist"), "VideoUploadPlaylist"),
    VideoId: types.union(types.undefined, types.null, types.late((): any => VideoUploadModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VideoUploadPlaylistModelSelector extends QueryBuilder {
  VideoId(builder: string | VideoUploadModelSelector | ((selector: VideoUploadModelSelector) => VideoUploadModelSelector) | undefined) { return this.__child(`VideoId`, VideoUploadModelSelector, builder) }
}
export function selectFromVideoUploadPlaylist() {
  return new VideoUploadPlaylistModelSelector()
}

export const videoUploadPlaylistModelPrimitives = selectFromVideoUploadPlaylist()
