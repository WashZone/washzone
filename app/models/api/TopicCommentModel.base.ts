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
 * TopicCommentBase
 * auto generated base class for the model TopicCommentModel.
 */
export const TopicCommentModelBase = ModelBase
  .named('TopicComment')
  .props({
    __typename: types.optional(types.literal("TopicComment"), "TopicComment"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.late((): any => UserModel)),
    topicId: types.union(types.undefined, types.null, types.string),
    comment: types.union(types.undefined, types.null, types.string),
    acttachmentUrl: types.union(types.undefined, types.null, types.string),
    acttachmentType: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class TopicCommentModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get topicId() { return this.__attr(`topicId`) }
  get comment() { return this.__attr(`comment`) }
  get acttachmentUrl() { return this.__attr(`acttachmentUrl`) }
  get acttachmentType() { return this.__attr(`acttachmentType`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
}
export function selectFromTopicComment() {
  return new TopicCommentModelSelector()
}

export const topicCommentModelPrimitives = selectFromTopicComment()._id.createdAt.updatedAt.topicId.comment.acttachmentUrl.acttachmentType
