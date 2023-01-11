/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { VideoUploadModel, VideoUploadModelType } from "./VideoUploadModel"
import { VideoUploadModelSelector } from "./VideoUploadModel.base"
import { RootStoreType } from "./index"


/**
 * SaveVideoBase
 * auto generated base class for the model SaveVideoModel.
 */
export const SaveVideoModelBase = ModelBase
  .named('SaveVideo')
  .props({
    __typename: types.optional(types.literal("saveVideo"), "saveVideo"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    videoId: types.union(types.undefined, types.null, types.late((): any => VideoUploadModel)),
    savedType: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SaveVideoModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get savedType() { return this.__attr(`savedType`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  videoId(builder: string | VideoUploadModelSelector | ((selector: VideoUploadModelSelector) => VideoUploadModelSelector) | undefined) { return this.__child(`videoId`, VideoUploadModelSelector, builder) }
}
export function selectFromSaveVideo() {
  return new SaveVideoModelSelector()
}

export const saveVideoModelPrimitives = selectFromSaveVideo()._id.createdAt.updatedAt.savedType.status
