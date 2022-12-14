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
    usersavedId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    ClassifiedFeedId: types.union(types.undefined, types.null, types.late((): any => ClassifiedFeedModel)),
    description: types.union(types.undefined, types.null, types.string),
    attachmentVedioUrl: types.union(types.undefined, types.null, types.string),
    view: types.union(types.undefined, types.null, types.number),
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
  get description() { return this.__attr(`description`) }
  get attachmentVedioUrl() { return this.__attr(`attachmentVedioUrl`) }
  get view() { return this.__attr(`view`) }
  get status() { return this.__attr(`status`) }
  usersavedId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`usersavedId`, UserModelSelector, builder) }
  ClassifiedFeedId(builder: string | ClassifiedFeedModelSelector | ((selector: ClassifiedFeedModelSelector) => ClassifiedFeedModelSelector) | undefined) { return this.__child(`ClassifiedFeedId`, ClassifiedFeedModelSelector, builder) }
}
export function selectFromSaveClassified() {
  return new SaveClassifiedModelSelector()
}

export const saveClassifiedModelPrimitives = selectFromSaveClassified()._id.createdAt.updatedAt.description.attachmentVedioUrl.view.status
