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
 * VideoLikeArrayBase
 * auto generated base class for the model VideoLikeArrayModel.
 */
export const VideoLikeArrayModelBase = ModelBase
  .named('VideoLikeArray')
  .props({
    __typename: types.optional(types.literal("VideoLikeArray"), "VideoLikeArray"),
    VideoId: types.union(types.undefined, types.null, types.late((): any => VideoUploadModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VideoLikeArrayModelSelector extends QueryBuilder {
  VideoId(builder: string | VideoUploadModelSelector | ((selector: VideoUploadModelSelector) => VideoUploadModelSelector) | undefined) { return this.__child(`VideoId`, VideoUploadModelSelector, builder) }
}
export function selectFromVideoLikeArray() {
  return new VideoLikeArrayModelSelector()
}

export const videoLikeArrayModelPrimitives = selectFromVideoLikeArray()
