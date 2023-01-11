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
 * VedioPlaylistBase
 * auto generated base class for the model VedioPlaylistModel.
 */
export const VedioPlaylistModelBase = ModelBase
  .named('VedioPlaylist')
  .props({
    __typename: types.optional(types.literal("VedioPlaylist"), "VedioPlaylist"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    vedioUpload: types.union(types.undefined, types.null, types.array(types.late((): any => VideoUploadPlaylistModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VedioPlaylistModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  vedioUpload(builder: string | VideoUploadPlaylistModelSelector | ((selector: VideoUploadPlaylistModelSelector) => VideoUploadPlaylistModelSelector) | undefined) { return this.__child(`vedioUpload`, VideoUploadPlaylistModelSelector, builder) }
}
export function selectFromVedioPlaylist() {
  return new VedioPlaylistModelSelector()
}

export const vedioPlaylistModelPrimitives = selectFromVedioPlaylist()._id.createdAt.updatedAt
