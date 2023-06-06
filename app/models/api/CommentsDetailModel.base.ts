/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TopicCommentTagModel, TopicCommentTagModelType } from "./TopicCommentTagModel"
import { TopicCommentTagModelSelector } from "./TopicCommentTagModel.base"
import { TopicDetailModel, TopicDetailModelType } from "./TopicDetailModel"
import { TopicDetailModelSelector } from "./TopicDetailModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * CommentsDetailBase
 * auto generated base class for the model CommentsDetailModel.
 */
export const CommentsDetailModelBase = ModelBase
  .named('CommentsDetail')
  .props({
    __typename: types.optional(types.literal("CommentsDetail"), "CommentsDetail"),
    _id: types.identifier,
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.frozen()),
    userId: types.union(types.undefined, types.null, types.late((): any => UserModel)),
    TopicId: types.union(types.undefined, types.null, types.late((): any => TopicDetailModel)),
    comment: types.union(types.undefined, types.null, types.string),
    acttachmentUrl: types.union(types.undefined, types.null, types.string),
    acttachmentType: types.union(types.undefined, types.null, types.string),
    topictagComment: types.union(types.undefined, types.null, types.array(types.late((): any => TopicCommentTagModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class CommentsDetailModelSelector extends QueryBuilder {
  get _id() { return this.__attr(`_id`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get comment() { return this.__attr(`comment`) }
  get acttachmentUrl() { return this.__attr(`acttachmentUrl`) }
  get acttachmentType() { return this.__attr(`acttachmentType`) }
  userId(builder: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector) | undefined) { return this.__child(`userId`, UserModelSelector, builder) }
  TopicId(builder: string | TopicDetailModelSelector | ((selector: TopicDetailModelSelector) => TopicDetailModelSelector) | undefined) { return this.__child(`TopicId`, TopicDetailModelSelector, builder) }
  topictagComment(builder: string | TopicCommentTagModelSelector | ((selector: TopicCommentTagModelSelector) => TopicCommentTagModelSelector) | undefined) { return this.__child(`topictagComment`, TopicCommentTagModelSelector, builder) }
}
export function selectFromCommentsDetail() {
  return new CommentsDetailModelSelector()
}

export const commentsDetailModelPrimitives = selectFromCommentsDetail()._id.createdAt.updatedAt.comment.acttachmentUrl.acttachmentType
