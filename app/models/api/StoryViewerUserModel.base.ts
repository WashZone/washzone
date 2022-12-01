/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * StoryViewerUserBase
 * auto generated base class for the model StoryViewerUserModel.
 */
export const StoryViewerUserModelBase = ModelBase
  .named('StoryViewerUser')
  .props({
    __typename: types.optional(types.literal("storyViewerUser"), "storyViewerUser"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.late((): any => UserModel)),
    thumbnailUrl: types.union(types.undefined, types.null, types.string),
    attachmentType: types.union(types.undefined, types.null, types.string),
    attachmentUrl: types.union(types.undefined, types.null, types.string),
    date: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class StoryViewerUserModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get thumbnailUrl() { return this.__attr(`thumbnailUrl`) }
  get attachmentType() { return this.__attr(`attachmentType`) }
  get attachmentUrl() { return this.__attr(`attachmentUrl`) }
  get date() { return this.__attr(`date`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
}
export function selectFromStoryViewerUser() {
  return new StoryViewerUserModelSelector()
}

export const storyViewerUserModelPrimitives = selectFromStoryViewerUser()._id.createdAt.updatedAt.thumbnailUrl.attachmentType.attachmentUrl.date
