/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ClassifiedFeedModel, ClassifiedFeedModelType } from "./ClassifiedFeedModel"
import { ClassifiedFeedModelSelector } from "./ClassifiedFeedModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { VideoUploadModel, VideoUploadModelType } from "./VideoUploadModel"
import { VideoUploadModelSelector } from "./VideoUploadModel.base"
import { RootStoreType } from "./index"


/**
 * SaveClassifiedBase
 * auto generated base class for the model SaveClassifiedModel.
 */
export const SaveClassifiedModelBase = ModelBase
  .named('SaveClassified')
  .props({
    __typename: types.optional(types.literal("saveClassified"), "saveClassified"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    ClassifiedFeedId: types.union(types.undefined, types.null, types.late((): any => ClassifiedFeedModel)),
    videoId: types.union(types.undefined, types.null, types.late((): any => VideoUploadModel)),
    savedType: types.union(types.undefined, types.null, types.string),
    status: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SaveClassifiedModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get savedType() { return this.__attr(`savedType`) }
  get status() { return this.__attr(`status`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  ClassifiedFeedId(builder: string | ClassifiedFeedModelSelector | ((selector: ClassifiedFeedModelSelector) => ClassifiedFeedModelSelector) | undefined) { return this.__child(`ClassifiedFeedId`, ClassifiedFeedModelSelector, builder) }
  videoId(builder: string | VideoUploadModelSelector | ((selector: VideoUploadModelSelector) => VideoUploadModelSelector) | undefined) { return this.__child(`videoId`, VideoUploadModelSelector, builder) }
}
export function selectFromSaveClassified() {
  return new SaveClassifiedModelSelector()
}

export const saveClassifiedModelPrimitives = selectFromSaveClassified()._id.createdAt.updatedAt.savedType.status
