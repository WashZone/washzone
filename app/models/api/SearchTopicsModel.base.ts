/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CommentsDetailModel, CommentsDetailModelType } from "./CommentsDetailModel"
import { CommentsDetailModelSelector } from "./CommentsDetailModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * SearchTopicsBase
 * auto generated base class for the model SearchTopicsModel.
 */
export const SearchTopicsModelBase = ModelBase
  .named('SearchTopics')
  .props({
    __typename: types.optional(types.literal("searchTopics"), "searchTopics"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.late((): any => UserModel)),
    commentId: types.union(types.undefined, types.late((): any => CommentsDetailModel)),
    thumbnailUrl: types.union(types.undefined, types.null, types.string),
    attachmentType: types.union(types.undefined, types.null, types.string),
    attachmentUrl: types.union(types.undefined, types.null, types.string),
    topicContent: types.union(types.undefined, types.null, types.string),
    topicHeading: types.union(types.undefined, types.null, types.string),
    date: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SearchTopicsModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get thumbnailUrl() { return this.__attr(`thumbnailUrl`) }
  get attachmentType() { return this.__attr(`attachmentType`) }
  get attachmentUrl() { return this.__attr(`attachmentUrl`) }
  get topicContent() { return this.__attr(`topicContent`) }
  get topicHeading() { return this.__attr(`topicHeading`) }
  get date() { return this.__attr(`date`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  commentId(builder: string | CommentsDetailModelSelector | ((selector: CommentsDetailModelSelector) => CommentsDetailModelSelector) | undefined) { return this.__child(`commentId`, CommentsDetailModelSelector, builder) }
}
export function selectFromSearchTopics() {
  return new SearchTopicsModelSelector()
}

export const searchTopicsModelPrimitives = selectFromSearchTopics()._id.createdAt.updatedAt.thumbnailUrl.attachmentType.attachmentUrl.topicContent.topicHeading.date
