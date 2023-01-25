/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LikeVideosModel, LikeVideosModelType } from "./LikeVideosModel"
import { LikeVideosModelSelector } from "./LikeVideosModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { VideoPlaylistModel, VideoPlaylistModelType } from "./VideoPlaylistModel"
import { VideoPlaylistModelSelector } from "./VideoPlaylistModel.base"
import { RootStoreType } from "./index"


/**
 * VideoUploadBase
 * auto generated base class for the model VideoUploadModel.
 */
export const VideoUploadModelBase = ModelBase
  .named('VideoUpload')
  .props({
    __typename: types.optional(types.literal("VideoUpload"), "VideoUpload"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    vedioPlaylistId: types.union(types.undefined, types.null, types.late((): any => VideoPlaylistModel)),
    LikeVideoId: types.union(types.undefined, types.null, types.late((): any => LikeVideosModel)),
    videoHeading: types.union(types.undefined, types.null, types.string),
    description: types.union(types.undefined, types.null, types.string),
    attachmentVideoUrl: types.union(types.undefined, types.null, types.string),
    thumbnailUrl: types.union(types.undefined, types.null, types.string),
    view: types.union(types.undefined, types.null, types.number),
    status: types.union(types.undefined, types.null, types.string),
    likeviews: types.union(types.undefined, types.null, types.integer),
    dislikeviews: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VideoUploadModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get videoHeading() { return this.__attr(`videoHeading`) }
  get description() { return this.__attr(`description`) }
  get attachmentVideoUrl() { return this.__attr(`attachmentVideoUrl`) }
  get thumbnailUrl() { return this.__attr(`thumbnailUrl`) }
  get view() { return this.__attr(`view`) }
  get status() { return this.__attr(`status`) }
  get likeviews() { return this.__attr(`likeviews`) }
  get dislikeviews() { return this.__attr(`dislikeviews`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  vedioPlaylistId(builder: string | VideoPlaylistModelSelector | ((selector: VideoPlaylistModelSelector) => VideoPlaylistModelSelector) | undefined) { return this.__child(`vedioPlaylistId`, VideoPlaylistModelSelector, builder) }
  LikeVideoId(builder: string | LikeVideosModelSelector | ((selector: LikeVideosModelSelector) => LikeVideosModelSelector) | undefined) { return this.__child(`LikeVideoId`, LikeVideosModelSelector, builder) }
}
export function selectFromVideoUpload() {
  return new VideoUploadModelSelector()
}

export const videoUploadModelPrimitives = selectFromVideoUpload()._id.createdAt.updatedAt.videoHeading.description.attachmentVideoUrl.thumbnailUrl.view.status.likeviews.dislikeviews
