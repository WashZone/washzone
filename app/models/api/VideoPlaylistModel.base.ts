/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { VideoUploadPlaylistModel, VideoUploadPlaylistModelType } from "./VideoUploadPlaylistModel"
import { VideoUploadPlaylistModelSelector } from "./VideoUploadPlaylistModel.base"
import { RootStoreType } from "./index"


/**
 * VideoPlaylistBase
 * auto generated base class for the model VideoPlaylistModel.
 */
export const VideoPlaylistModelBase = ModelBase
  .named('VideoPlaylist')
  .props({
    __typename: types.optional(types.literal("VideoPlaylist"), "VideoPlaylist"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    VideoUpload: types.union(types.undefined, types.null, types.array(types.late((): any => VideoUploadPlaylistModel))),
    playListName: types.union(types.undefined, types.null, types.string),
    playListthumbnail: types.union(types.undefined, types.null, types.string),
    playListbanner: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VideoPlaylistModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get playListName() { return this.__attr(`playListName`) }
  get playListthumbnail() { return this.__attr(`playListthumbnail`) }
  get playListbanner() { return this.__attr(`playListbanner`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  VideoUpload(builder: string | VideoUploadPlaylistModelSelector | ((selector: VideoUploadPlaylistModelSelector) => VideoUploadPlaylistModelSelector) | undefined) { return this.__child(`VideoUpload`, VideoUploadPlaylistModelSelector, builder) }
}
export function selectFromVideoPlaylist() {
  return new VideoPlaylistModelSelector()
}

export const videoPlaylistModelPrimitives = selectFromVideoPlaylist()._id.createdAt.updatedAt.playListName.playListthumbnail.playListbanner
